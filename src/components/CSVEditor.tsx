
import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { toast } from "sonner";
import CSVTable from './CSVTable';
import FilterBar from './FilterBar';

const CSVEditor = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [originalData, setOriginalData] = useState<string[][]>([]);
  const [filteredData, setFilteredData] = useState<string[][]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const parseCSV = (csvText: string) => {
    // Basic CSV parsing (would need more robust handling for complex CSVs)
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const data = lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => line.split(','));
    
    setHeaders(headers);
    setData(data);
    setOriginalData(data);
    setFilteredData(data);
    setIsFiltered(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is a CSV
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }
    
    setUploadedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvText = e.target?.result as string;
      parseCSV(csvText);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    
    reader.readAsText(file);
  };

  const handleFilter = (column: string, value: string) => {
    const columnIndex = headers.indexOf(column);
    
    if (columnIndex === -1) {
      return;
    }
    
    const filtered = data.filter(row => {
      if (columnIndex >= row.length) {
        return false;
      }
      return row[columnIndex].toLowerCase().includes(value.toLowerCase());
    });
    
    setFilteredData(filtered);
    setIsFiltered(true);
    toast.success(`Filtered by ${column} containing "${value}"`);
  };

  const handleClearFilters = () => {
    setFilteredData(data);
    setIsFiltered(false);
    toast.info('Filters cleared');
  };

  const handleDataChange = (newData: string[][]) => {
    setData(newData);
    if (isFiltered) {
      // If we're filtered, we need to update the filtered data too
      setFilteredData(newData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!uploadedFile ? (
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
          <div className="glass-card p-8 md:p-12 rounded-xl w-full max-w-2xl text-center">
            <FileText size={48} className="mb-6 mx-auto text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Upload CSV File</h2>
            <p className="text-muted-foreground mb-8">
              Upload a CSV file to analyze and edit your data. The file will remain unchanged until you download the modified version.
            </p>
            
            <label className="stellar-btn inline-flex items-center space-x-2 cursor-pointer">
              <Upload size={18} />
              <span>Select CSV File</span>
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Editing: {uploadedFile.name}
              </h2>
              <p className="text-muted-foreground">
                Click on any cell to edit its value. Changes won't affect the original file.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <label className="stellar-btn inline-flex items-center space-x-2 cursor-pointer">
                <Upload size={18} />
                <span>Upload New File</span>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          {headers.length > 0 && (
            <>
              <FilterBar
                headers={headers}
                onFilter={handleFilter}
                onClearFilters={handleClearFilters}
              />
              
              <CSVTable
                data={filteredData}
                headers={headers}
                setData={handleDataChange}
                fileName={uploadedFile.name}
                originalData={originalData}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CSVEditor;
