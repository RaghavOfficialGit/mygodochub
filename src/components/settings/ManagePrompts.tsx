import { useState } from 'react';
import { DEFAULT_PROMPTS, type AIPrompt } from '@/data/prompts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ManagePrompts = () => {
  const [prompts, setPrompts] = useState<AIPrompt[]>(DEFAULT_PROMPTS);
  const [selectedId, setSelectedId] = useState(DEFAULT_PROMPTS[0].id);
  const [editedPrompt, setEditedPrompt] = useState(DEFAULT_PROMPTS[0].systemPrompt);

  const selected = prompts.find(p => p.id === selectedId)!;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const prompt = prompts.find(p => p.id === id)!;
    setEditedPrompt(prompt.systemPrompt);
  };

  const handleSave = () => {
    setPrompts(prev => prev.map(p => p.id === selectedId ? { ...p, systemPrompt: editedPrompt } : p));
    toast.success('Prompt saved successfully');
  };

  const handleReset = () => {
    const original = DEFAULT_PROMPTS.find(p => p.id === selectedId)!;
    setEditedPrompt(original.systemPrompt);
    toast.info('Prompt reset to default');
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar list */}
      <div className="w-72 shrink-0">
        <h3 className="font-display font-semibold text-sm text-muted-foreground mb-3">AI Scenarios</h3>
        <div className="space-y-1">
          {prompts.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-lg transition-all duration-200',
                p.id === selectedId
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-accent/50 text-foreground'
              )}
            >
              <p className="font-medium text-sm">{p.name}</p>
              <p className={cn(
                'text-xs mt-0.5',
                p.id === selectedId ? 'text-primary-foreground/80' : 'text-muted-foreground'
              )}>{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-display font-bold text-foreground">{selected.name}</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-6">{selected.description}</p>

        <div className="mb-2">
          <h4 className="font-display font-semibold text-sm text-foreground">System Prompt</h4>
          <p className="text-xs text-muted-foreground">This defines the AI's role and behavior for this scenario.</p>
        </div>

        <Textarea
          value={editedPrompt}
          onChange={e => setEditedPrompt(e.target.value)}
          className="min-h-[200px] font-mono text-sm bg-card border-border"
          rows={10}
        />

        <div className="flex gap-3 mt-4">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset to Saved
          </Button>
        </div>

        <div className="mt-6 bg-accent/30 border border-border rounded-lg p-4 flex gap-2">
          <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-foreground">Note</p>
            <p className="text-sm text-muted-foreground">
              Changes to prompts are stored in memory and will be reset when the backend restarts. For persistent changes, modify the prompts in the backend configuration file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePrompts;
