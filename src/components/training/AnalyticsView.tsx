
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SessionRecord, Student } from './trainingTypes';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AnalyticsViewProps {
  facultyUsername: string;
  sessionRecords: SessionRecord[];
  students: Student[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsView = ({ facultyUsername, sessionRecords, students }: AnalyticsViewProps) => {
  const [selectedMetric, setSelectedMetric] = useState<string>("performance");

  // Generate performance distribution data
  const performanceData = [
    { name: 'Excellent', count: students.filter(s => s.performanceLevel === 'excellent').length },
    { name: 'Good', count: students.filter(s => s.performanceLevel === 'good').length },
    { name: 'Average', count: students.filter(s => s.performanceLevel === 'average').length },
    { name: 'Decent', count: students.filter(s => s.performanceLevel === 'decent').length },
    { name: 'Bad', count: students.filter(s => s.performanceLevel === 'bad').length }
  ].filter(item => item.count > 0);

  // Sessions per branch data
  const sessionsByBranch = sessionRecords.reduce((acc, session) => {
    const key = `${session.year}-${session.branch}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const branchSessionData = Object.entries(sessionsByBranch).map(([key, count]) => ({
    name: key,
    count
  }));

  const renderMetricSelection = () => (
    <div className="mb-6">
      <Label htmlFor="metric-select">Metric</Label>
      <Select 
        value={selectedMetric} 
        onValueChange={setSelectedMetric}
      >
        <SelectTrigger id="metric-select" className="w-[250px]">
          <SelectValue placeholder="Select metric" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="performance">Student Performance Distribution</SelectItem>
          <SelectItem value="sessions">Sessions by Year & Branch</SelectItem>
          <SelectItem value="attendance">Student Attendance</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
          <p className="text-muted-foreground">
            Performance metrics and session statistics
          </p>
        </div>
        {renderMetricSelection()}
      </div>

      {selectedMetric === "performance" && performanceData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Student Performance Distribution</CardTitle>
            <CardDescription>Current performance levels of students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMetric === "sessions" && branchSessionData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Year & Branch</CardTitle>
            <CardDescription>Number of sessions conducted per year and branch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={branchSessionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Sessions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMetric === "attendance" && (
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance</CardTitle>
            <CardDescription>Attendance percentage by session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              {sessionRecords.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sessionRecords.map(record => ({
                      date: record.date,
                      attendance: ((record.studentsAppeared.length / students.length) * 100) || 0
                    }))}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: 'Attendance %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendance" name="Attendance %" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground">No session data available for attendance analysis.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {sessionRecords.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground text-center">
              No data available for analytics yet. Start by recording sessions and evaluating students.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsView;
