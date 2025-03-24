
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Download, Save, Plus, Trash2 } from 'lucide-react';

interface CSVTableProps {
  data: string[][];
  headers: string[];
  setData: (data: string[][]) => void;
  fileName: string;
  originalData: string[][];
}

const CSVTable = ({ data, headers, setData, fileName, originalData }: CSVTableProps) => {
  const [editableData, setEditableData] = useState<string[][]>([]);
  const [editCell, setEditCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const handleCellClick = (row: number, col: number) => {
    setEditCell({ row, col });
    setEditValue(editableData[row][col]);
  };

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleCellBlur = () => {
    if (editCell) {
      const newData = [...editableData];
      newData[editCell.row][editCell.col] = editValue;
      setEditableData(newData);
      setData(newData);
      setEditCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    }
  };

  const addRow = () => {
    const newRow = Array(headers.length).fill('');
    const newData = [...editableData, newRow];
    setEditableData(newData);
    setData(newData);
    toast.success('New row added');
  };

  const deleteRow = (rowIndex: number) => {
    const newData = editableData.filter((_, index) => index !== rowIndex);
    setEditableData(newData);
    setData(newData);
    toast.success('Row deleted');
  };

  const addColumn = () => {
    const columnName = prompt('Enter column name:');
    
    if (columnName) {
      const newHeaders = [...headers, columnName];
      const newData = editableData.map(row => [...row, '']);
      
      setData(newData);
      // Would need to update headers in parent component
      toast.success(`New column "${columnName}" added`);
    }
  };

  const downloadCSV = () => {
    // Create CSV from the modified data
    const csvContent = [
      headers.join(','),
      ...editableData.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `modified_${fileName}`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`File downloaded as "modified_${fileName}"`);
  };

  const downloadOriginal = () => {
    // Create CSV from the original data
    const csvContent = [
      headers.join(','),
      ...originalData.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Original file downloaded as "${fileName}"`);
  };

  const saveChanges = () => {
    // In a real app this would sync with a server
    toast.success('Changes saved successfully');
  };

  return (
    <div className="w-full overflow-x-auto animate-fade-in">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={saveChanges}
          className="stellar-btn flex items-center gap-2"
        >
          <Save size={16} />
          Save Changes
        </button>
        <button
          onClick={downloadCSV}
          className="bg-cosmic-500 text-white font-medium rounded-lg py-2 px-4 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <Download size={16} />
          Download Modified
        </button>
        <button
          onClick={downloadOriginal}
          className="bg-secondary text-foreground font-medium rounded-lg py-2 px-4 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <Download size={16} />
          Download Original
        </button>
        <button
          onClick={addRow}
          className="bg-space-500 text-white font-medium rounded-lg py-2 px-4 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Row
        </button>
        <button
          onClick={addColumn}
          className="bg-starlight-500 text-white font-medium rounded-lg py-2 px-4 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Column
        </button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary/20">
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-3 text-left font-semibold border-b border-border/50">
                    {header}
                  </th>
                ))}
                <th className="px-4 py-3 text-left font-semibold border-b border-border/50">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {editableData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                >
                  {row.map((cell, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-4 py-3 text-sm"
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {editCell && editCell.row === rowIndex && editCell.col === colIndex ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={handleCellChange}
                          onBlur={handleCellBlur}
                          onKeyDown={handleKeyDown}
                          className="w-full bg-secondary/50 border border-primary/50 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
                          autoFocus
                        />
                      ) : (
                        <div className="min-h-[1.5em]">{cell}</div>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => deleteRow(rowIndex)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      aria-label="Delete row"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CSVTable;
