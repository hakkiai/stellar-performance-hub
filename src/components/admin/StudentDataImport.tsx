
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, Database } from 'lucide-react';
import { toast } from "sonner";
import { CSVStudentData } from '../training/trainingTypes';
import CSVEditor from '../CSVEditor';

const StudentDataImport = () => {
  const [csvData, setCsvData] = useState<CSVStudentData[]>([]);
  const [sqlContent, setSqlContent] = useState("");

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const rows = text.split('\n');
          const headers = rows[0].split(',').map(h => h.trim());
          
          const data: CSVStudentData[] = [];
          for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            
            const values = rows[i].split(',').map(v => v.trim());
            const student: Record<string, string> = {};
            
            headers.forEach((header, index) => {
              student[header] = values[index];
            });
            
            data.push(student as unknown as CSVStudentData);
          }
          
          setCsvData(data);
          toast.success(`CSV file loaded with ${data.length} student records`);
        } catch (error) {
          toast.error("Error parsing CSV file");
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSQLUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          setSqlContent(text);
          toast.success("SQL file loaded successfully");
        } catch (error) {
          toast.error("Error loading SQL file");
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateSQLFromCSV = () => {
    if (csvData.length === 0) {
      toast.error("No CSV data available to generate SQL");
      return;
    }
    
    let sql = "-- Generated SQL queries for student data\n\n";
    
    csvData.forEach(student => {
      // Generate a random password (in a real app, this would be hashed)
      const randomPassword = Math.random().toString(36).substring(2, 10);
      
      sql += `INSERT INTO students (hallticket_no, regulation, batch, branch, student_name, password) 
      VALUES ('${student.hallticket_no}', '${student.regulation}', '${student.batch}', '${student.branch}', '${student.student_name}', '${randomPassword}');\n`;
    });
    
    setSqlContent(sql);
    toast.success("SQL queries generated from CSV data");
  };

  const downloadSQL = () => {
    if (!sqlContent) {
      toast.error("No SQL content to download");
      return;
    }
    
    const blob = new Blob([sqlContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("SQL file downloaded");
  };

  const importSQL = () => {
    // In a real application, this would send the SQL to the backend for execution
    toast.success("SQL data imported successfully");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="csv" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="csv">CSV Import</TabsTrigger>
          <TabsTrigger value="sql">SQL Import/Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle>Import Student Data from CSV</CardTitle>
              <CardDescription>Upload a CSV file with student records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Label htmlFor="csv-file">Upload CSV File</Label>
                <Input 
                  id="csv-file" 
                  type="file" 
                  accept=".csv" 
                  onChange={handleCSVUpload}
                />
              </div>
              
              <Button 
                onClick={generateSQLFromCSV} 
                disabled={csvData.length === 0}
                className="flex items-center gap-2"
              >
                <Database size={16} />
                Generate SQL from CSV
              </Button>
              
              {csvData.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-md font-medium mb-2">CSV Preview</h3>
                  <div className="max-h-80 overflow-auto border rounded-md">
                    <CSVEditor 
                      headers={["hallticket_no", "regulation", "batch", "branch", "student_name"]}
                      rows={csvData as any[]} 
                      onChange={(newData) => setCsvData(newData as CSVStudentData[])}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sql">
          <Card>
            <CardHeader>
              <CardTitle>SQL Import & Export</CardTitle>
              <CardDescription>Manage student data with SQL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Label htmlFor="sql-file">Upload SQL File</Label>
                <Input 
                  id="sql-file" 
                  type="file" 
                  accept=".sql,.txt" 
                  onChange={handleSQLUpload}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={downloadSQL} 
                  disabled={!sqlContent}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <Download size={16} />
                  Download SQL
                </Button>
                
                <Button 
                  onClick={importSQL} 
                  disabled={!sqlContent}
                  className="flex items-center gap-2"
                >
                  <Upload size={16} />
                  Import SQL to Database
                </Button>
              </div>
              
              {sqlContent && (
                <div className="pt-4 border-t">
                  <h3 className="text-md font-medium mb-2">SQL Preview</h3>
                  <div className="max-h-80 overflow-auto bg-secondary/20 p-4 rounded-md">
                    <pre className="text-xs">{sqlContent}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDataImport;
