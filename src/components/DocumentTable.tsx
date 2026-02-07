import { Document } from '@/data/documents';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, ExternalLink } from 'lucide-react';

interface DocumentTableProps {
  documents: Document[];
}

const sourceColors: Record<string, string> = {
  CALM: 'bg-primary/10 text-primary border-primary/20',
  SharePoint: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Jira: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  Solman: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

const DocumentTable = ({ documents }: DocumentTableProps) => {
  return (
    <div className="card-elevated overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-secondary/60 hover:bg-secondary/60">
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Source</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Type</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Document Name</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Updated By</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Updated On</TableHead>
            <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Project</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, i) => (
            <TableRow
              key={doc.id}
              className={`border-border cursor-pointer group transition-all duration-200 hover:shadow-sm ${
                i % 2 === 0 ? 'bg-row-even' : 'bg-row-odd'
              } hover:bg-primary/5`}
            >
              <TableCell>
                <Badge variant="outline" className={`${sourceColors[doc.source]} border text-xs font-medium`}>
                  {doc.source}
                </Badge>
              </TableCell>
              <TableCell className="text-foreground/80 text-sm">{doc.documentType}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary/50" />
                  <span className="text-foreground font-medium text-sm group-hover:text-primary transition-colors duration-200">
                    {doc.documentName}
                  </span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </TableCell>
              <TableCell className="text-foreground/70 text-sm">{doc.updatedBy}</TableCell>
              <TableCell className="text-muted-foreground text-sm">{doc.updatedOn}</TableCell>
              <TableCell>
                <span className="text-foreground/70 text-sm">{doc.project}</span>
              </TableCell>
            </TableRow>
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
