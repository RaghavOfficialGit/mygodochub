import { useState, useMemo } from 'react';
import { MOCK_DOCUMENTS } from '@/data/documents';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import AIAgentBar from '@/components/AIAgentBar';
import { FileText } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

const Index = () => {
  const [filters, setFilters] = useState({
    source: 'all',
    documentType: 'all',
    project: 'all',
    dateRange: undefined as DateRange | undefined,
  });

  const filteredDocs = useMemo(() => {
    return MOCK_DOCUMENTS.filter(doc => {
      if (filters.source !== 'all' && doc.source !== filters.source) return false;
      if (filters.documentType !== 'all' && doc.documentType !== filters.documentType) return false;
      if (filters.project !== 'all' && doc.project !== filters.project) return false;
      if (filters.dateRange?.from) {
        const docDate = new Date(doc.updatedOn);
        if (docDate < filters.dateRange.from) return false;
        if (filters.dateRange.to && docDate > filters.dateRange.to) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Document Hub
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Manage and explore your project documents across all sources
              </p>
            </div>
          </div>
          <AIAgentBar />
        </div>

        {/* Filters */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <DocumentFilters onFilterChange={setFilters} />
        </div>

        {/* Results count */}
        <div className="mb-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{filteredDocs.length}</span> documents found
          </p>
        </div>

        {/* Table */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <DocumentTable documents={filteredDocs} />
        </div>
      </div>
    </div>
  );
};

export default Index;
