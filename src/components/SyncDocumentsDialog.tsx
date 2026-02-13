import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Search, RefreshCw, FileText, ArrowLeft, Check } from 'lucide-react';
import { format } from 'date-fns';
import { DOCUMENT_TYPES, PROJECTS } from '@/data/documents';
import { EXTERNAL_DOCUMENTS } from '@/data/syncDocuments';
import { toast } from 'sonner';
import type { Document } from '@/data/documents';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

interface SyncDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSync: (documents: Document[]) => void;
}

const sourceColors: Record<string, string> = {
  CALM: 'bg-primary/10 text-primary border-primary/20',
  SharePoint: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Jira: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
  Solman: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
};

const SyncDocumentsDialog = ({ open, onOpenChange, onSync }: SyncDocumentsDialogProps) => {
  const [step, setStep] = useState<'filters' | 'documents'>('filters');
  const [project, setProject] = useState('all');
  const [documentType, setDocumentType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredDocs = useMemo(() => {
    return EXTERNAL_DOCUMENTS.filter(doc => {
      if (project !== 'all' && doc.project !== project) return false;
      if (documentType !== 'all' && doc.documentType !== documentType) return false;
      if (dateRange?.from) {
        const docDate = new Date(doc.updatedOn);
        if (docDate < dateRange.from) return false;
        if (dateRange.to && docDate > dateRange.to) return false;
      }
      return true;
    });
  }, [project, documentType, dateRange]);

  const handleShowDocuments = () => {
    setSelectedIds(new Set());
    setStep('documents');
  };

  const handleToggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleToggleAll = () => {
    if (selectedIds.size === filteredDocs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDocs.map(d => d.id)));
    }
  };

  const handleSync = () => {
    const docs = filteredDocs.filter(d => selectedIds.has(d.id));
    onSync(docs);
    toast.success(`${docs.length} document(s) synced to Document Hub`);
    handleClose();
  };

  const handleClose = () => {
    setStep('filters');
    setProject('all');
    setDocumentType('all');
    setDateRange(undefined);
    setSelectedIds(new Set());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-display text-lg flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Sync Documents
          </DialogTitle>
          <DialogDescription>
            {step === 'filters'
              ? 'Select filters to find documents from external sources.'
              : `${filteredDocs.length} document(s) found. Select the ones you want to sync.`}
          </DialogDescription>
        </DialogHeader>

        {step === 'filters' ? (
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project</label>
              <Select value={project} onValueChange={setProject}>
                <SelectTrigger className="w-full bg-background border-border rounded-lg">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border shadow-lg z-50">
                  <SelectItem value="all">All Projects</SelectItem>
                  {PROJECTS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Document Type</label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className="w-full bg-background border-border rounded-lg">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border shadow-lg z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  {DOCUMENT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Updated Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left bg-background border-border rounded-lg">
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {dateRange?.from ? (
                      dateRange.to
                        ? `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                        : format(dateRange.from, 'MMM dd, yyyy')
                    ) : 'Select date range'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover border-border shadow-lg z-50" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleShowDocuments} className="w-full gap-2 mt-2">
              <Search className="h-4 w-4" />
              Show Documents
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-hidden flex-1">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('filters')} className="gap-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">{selectedIds.size}</span> selected
              </span>
            </div>

            <div className="overflow-auto flex-1 rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/60 hover:bg-secondary/60 border-border">
                    <TableHead className="w-10">
                      <Checkbox
                        checked={filteredDocs.length > 0 && selectedIds.size === filteredDocs.length}
                        onCheckedChange={handleToggleAll}
                      />
                    </TableHead>
                    <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Source</TableHead>
                    <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Type</TableHead>
                    <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Document Name</TableHead>
                    <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Updated By</TableHead>
                    <TableHead className="text-muted-foreground font-display text-xs font-semibold uppercase tracking-wider">Updated On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.map((doc, i) => (
                    <TableRow
                      key={doc.id}
                      className={`border-border cursor-pointer transition-all duration-200 ${
                        i % 2 === 0 ? 'bg-row-even' : 'bg-row-odd'
                      } hover:bg-primary/5`}
                      onClick={() => handleToggle(doc.id)}
                    >
                      <TableCell>
                        <Checkbox checked={selectedIds.has(doc.id)} onCheckedChange={() => handleToggle(doc.id)} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${sourceColors[doc.source]} border text-xs font-medium`}>
                          {doc.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground/80 text-sm">{doc.documentType}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary/50" />
                          <span className="text-foreground font-medium text-sm">{doc.documentName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground/70 text-sm">{doc.updatedBy}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{doc.updatedOn}</TableCell>
                    </TableRow>
                  ))}
                  {filteredDocs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        No documents found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <Button
              onClick={handleSync}
              disabled={selectedIds.size === 0}
              className="w-full gap-2"
            >
              <Check className="h-4 w-4" />
              Sync {selectedIds.size > 0 ? `${selectedIds.size} Document(s)` : 'Selected Documents'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SyncDocumentsDialog;
