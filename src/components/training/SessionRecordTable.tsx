
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionRecord } from "./trainingTypes";
import { Trash } from "lucide-react";
import { Badge } from "../ui/badge";

interface SessionRecordTableProps {
  records: SessionRecord[];
  onDelete: (id: string) => void;
}

const SessionRecordTable = ({ records, onDelete }: SessionRecordTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Regulation</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Test Conducted</TableHead>
              <TableHead>Students</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>
                    {record.year === '1' ? '1st Year' : 
                     record.year === '2' ? '2nd Year' : 
                     record.year === '3' ? '3rd Year' : '4th Year'}
                  </TableCell>
                  <TableCell>{record.branch}</TableCell>
                  <TableCell>{record.regulation}</TableCell>
                  <TableCell>{record.subject}</TableCell>
                  <TableCell>
                    {record.testConducted ? record.testConducted : <span className="text-muted-foreground text-sm">None</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{record.studentsAppeared.length} students</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(record.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No session records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SessionRecordTable;
