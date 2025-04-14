
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Eye } from 'lucide-react';
import { SessionRecord } from './trainingTypes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SessionRecordTableProps {
  records: SessionRecord[];
  onDelete: (id: string) => void;
}

const SessionRecordTable = ({ records, onDelete }: SessionRecordTableProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Session Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Year & Branch</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Test Conducted</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  Year {record.year}, {record.branch}
                </TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell>
                  {record.testConducted || <span className="text-muted-foreground italic">None</span>}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {record.studentsAppeared.length > 0 ? (
                      <>
                        <Badge variant="outline">{record.studentsAppeared.length} students</Badge>
                      </>
                    ) : (
                      <span className="text-muted-foreground italic">None</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(record.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SessionRecordTable;
