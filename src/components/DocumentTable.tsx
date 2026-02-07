import { Document } from '@/data/documents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentTableProps {
  documents: Document[];
}

const sourceColors: Record<string, string> = {
  CALM: 'bg-primary/20 text-primary border-primary/30',
  SharePoint: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Jira: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Solman: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const DocumentTable = ({ documents }: DocumentTableProps) => {
  return (
    <div className="glass-surface rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Source</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Type</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Document Name</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Updated By</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Updated On</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs uppercase tracking-wider">Project</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, i) => (
            <motion.tr
              key={doc.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-border hover:bg-secondary/50 cursor-pointer group transition-colors"
            >
              <TableCell>
                <Badge variant="outline" className={`${sourceColors[doc.source]} border text-xs font-medium`}>
                  {doc.source}
                </Badge>
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm">{doc.documentType}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary/60" />
                  <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                    {doc.documentName}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm">{doc.updatedBy}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{doc.updatedOn}</TableCell>
              <TableCell>
                <span className="text-secondary-foreground text-sm">{doc.project}</span>
              </TableCell>
            </motion.tr>
          ))}
          {documents.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                No documents found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentTable;
