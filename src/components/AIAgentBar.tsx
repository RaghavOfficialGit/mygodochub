import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bot, RefreshCw, Lightbulb, Cog, Sparkles, TestTube, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import SyncDocumentsDialog from './SyncDocumentsDialog';
import type { Document } from '@/data/documents';

interface AIAgentBarProps {
  onSyncDocuments?: (documents: Document[]) => void;
}

const agents = [
  { label: 'Ask Yoda', icon: Bot, description: 'Ask Yoda your questions, you shall' },
  { label: 'Sync Documents', icon: RefreshCw, description: 'Sync documents from all sources' },
  { label: 'Solution Advisor', icon: Lightbulb, description: 'Get AI-powered solution recommendations' },
  { label: 'Spec Agent', icon: Cog, description: 'Auto-generate specifications' },
  { label: 'Prompt Generator', icon: Sparkles, description: 'Generate prompts for your workflows' },
  { label: 'Generate Test Case', icon: TestTube, description: 'Generate test cases from documents' },
];

const AIAgentBar = ({ onSyncDocuments }: AIAgentBarProps) => {
  const [syncOpen, setSyncOpen] = useState(false);

  const handleAgentClick = (label: string, description: string) => {
    if (label === 'Sync Documents') {
      setSyncOpen(true);
    } else {
      toast.info(`${label} activated`, { description });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-display font-semibold shadow-md transition-all duration-200 hover:shadow-lg">
            <Sparkles className="h-4 w-4" />
            AI Agents
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-popover border-border shadow-lg z-50 animate-scale-in">
          {agents.map((agent) => (
            <DropdownMenuItem
              key={agent.label}
              onClick={() => handleAgentClick(agent.label, agent.description)}
              className="gap-3 py-2.5 px-3 cursor-pointer text-foreground hover:bg-accent focus:bg-accent transition-colors"
            >
              <agent.icon className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-sm">{agent.label}</p>
                <p className="text-xs text-muted-foreground">{agent.description}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <SyncDocumentsDialog
        open={syncOpen}
        onOpenChange={setSyncOpen}
        onSync={onSyncDocuments || (() => {})}
      />
    </>
  );
};

export default AIAgentBar;
