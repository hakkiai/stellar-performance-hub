
import { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';

interface FilterBarProps {
  headers: string[];
  onFilter: (column: string, value: string) => void;
  onClearFilters: () => void;
}

const FilterBar = ({ headers, onFilter, onClearFilters }: FilterBarProps) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(headers[0] || '');
  const [filterValue, setFilterValue] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedColumn && filterValue.trim()) {
      onFilter(selectedColumn, filterValue.trim());
    }
  };

  const handleClear = () => {
    setFilterValue('');
    onClearFilters();
  };

  return (
    <div className="mb-6 animate-fade-in">
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="flex items-center space-x-2 mb-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        <Filter size={18} />
        <span>{isExpanded ? 'Hide Filters' : 'Show Filters'}</span>
      </button>

      {isExpanded && (
        <div className="glass-card p-4 rounded-xl">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto flex-1">
              <label className="block text-sm font-medium mb-1">Filter Column</label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full rounded-lg bg-secondary/50 border border-border/50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-auto flex-1">
              <label className="block text-sm font-medium mb-1">Filter Value</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter filter value..."
                  className="w-full rounded-lg bg-secondary/50 border border-border/50 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="stellar-btn py-2"
                disabled={!filterValue.trim()}
              >
                Apply Filter
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center space-x-1 bg-secondary text-foreground font-medium rounded-lg py-2 px-4 transition-all duration-300 hover:bg-secondary/80"
              >
                <X size={16} />
                <span>Clear</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
