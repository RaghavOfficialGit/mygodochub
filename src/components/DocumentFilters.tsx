import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { SOURCES, DOCUMENT_TYPES, PROJECTS } from '@/data/documents';
import type { DateRange } from 'react-day-picker';

interface DocumentFiltersProps {
  onFilterChange: (filters: {
    source: string;
    documentType: string;
    project: string;
    dateRange: DateRange | undefined;
  }) => void;
}

const DocumentFilters = ({ onFilterChange }: DocumentFiltersProps) => {
  const [source, setSource] = useState('all');
  const [documentType, setDocumentType] = useState('all');
  const [project, setProject] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleChange = (field: string, value: string) => {
    const newFilters = { source, documentType, project, dateRange };
    if (field === 'source') { setSource(value); newFilters.source = value; }
    if (field === 'documentType') { setDocumentType(value); newFilters.documentType = value; }
    if (field === 'project') { setProject(value); newFilters.project = value; }
    onFilterChange(newFilters);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFilterChange({ source, documentType, project, dateRange: range });
  };

  const clearFilters = () => {
    setSource('all');
    setDocumentType('all');
    setProject('all');
    setDateRange(undefined);
    onFilterChange({ source: 'all', documentType: 'all', project: 'all', dateRange: undefined });
  };

  const hasFilters = source !== 'all' || documentType !== 'all' || project !== 'all' || dateRange;

  return (
    <div className="card-elevated p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground mr-1">
          <Filter className="h-4 w-4" />
          <span className="text-xs font-display font-semibold uppercase tracking-wider">Filters</span>
        </div>

        <Select value={source} onValueChange={(v) => handleChange('source', v)}>
          <SelectTrigger className="w-[150px] bg-background border-border text-foreground rounded-lg transition-all duration-200 hover:border-primary/40">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border shadow-lg z-50">
            <SelectItem value="all">All Sources</SelectItem>
            {SOURCES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={documentType} onValueChange={(v) => handleChange('documentType', v)}>
          <SelectTrigger className="w-[170px] bg-background border-border text-foreground rounded-lg transition-all duration-200 hover:border-primary/40">
            <SelectValue placeholder="Document Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border shadow-lg z-50">
            <SelectItem value="all">All Types</SelectItem>
            {DOCUMENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={project} onValueChange={(v) => handleChange('project', v)}>
          <SelectTrigger className="w-[170px] bg-background border-border text-foreground rounded-lg transition-all duration-200 hover:border-primary/40">
            <SelectValue placeholder="Project" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border shadow-lg z-50">
            <SelectItem value="all">All Projects</SelectItem>
            {PROJECTS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[220px] justify-start text-left bg-background border-border text-foreground rounded-lg transition-all duration-200 hover:border-primary/40">
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {dateRange?.from ? (
                dateRange.to ? (
                  `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                ) : format(dateRange.from, 'MMM dd, yyyy')
              ) : 'Date Range'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border-border shadow-lg z-50" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground transition-colors duration-200">
            <X className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentFilters;
