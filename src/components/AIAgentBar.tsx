import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Bot, RefreshCw, Lightbulb, Cog, Sparkles, TestTube } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const agents = [
  { label: 'Ask Yoda', icon: Bot, description: 'Ask Yoda your questions, you shall' },
  { label: 'Sync Documents', icon: RefreshCw, description: 'Sync documents from all sources' },
  { label: 'Solution Advisor', icon: Lightbulb, description: 'Get AI-powered solution recommendations' },
  { label: 'Spec Agent', icon: Cog, description: 'Auto-generate specifications' },
  { label: 'Prompt Generator', icon: Sparkles, description: 'Generate prompts for your workflows' },
  { label: 'Generate Test Case', icon: TestTube, description: 'Generate test cases from documents' },
];

const AIAgentBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {agents.map((agent, i) => (
        <Tooltip key={agent.label}>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info(`${agent.label} activated`, { description: agent.description })}
                className="bg-secondary border-border text-secondary-foreground hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-200 gap-2"
              >
                <agent.icon className="h-4 w-4" />
                {agent.label}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-popover border-border text-foreground">
            {agent.description}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default AIAgentBar;
