import { useState, useMemo } from 'react';
import { MOCK_DOCUMENTS } from '@/data/documents';
import DocumentFilters from '@/components/DocumentFilters';
import DocumentTable from '@/components/DocumentTable';
import AIAgentBar from '@/components/AIAgentBar';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen gradient-mesh">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground glow-green-text">
              Document Hub
            </h1>
          </div>
          <p className="text-muted-foreground text-sm ml-[52px]">
            Manage and explore your project documents across all sources
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-3">AI Agents</p>
          <AIAgentBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <DocumentFilters onFilterChange={setFilters} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-3"
        >
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">{filteredDocs.length}</span> documents found
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <DocumentTable documents={filteredDocs} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
