import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';

const ManageAICredits = () => {
  const used = 7500;
  const total = 10000;
  const percent = (used / total) * 100;

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground">Manage AI Credits</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Monitor and manage your AI usage credits</p>

      <div className="p-6 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
          <h3 className="font-display font-semibold text-foreground">Credit Usage</h3>
        </div>

        <Progress value={percent} className="h-3 mb-3" />

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{used.toLocaleString()} used</span>
          <span className="font-medium text-foreground">{total.toLocaleString()} total</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Ask Yoda', credits: 3200 },
            { label: 'Spec Agent', credits: 2100 },
            { label: 'Other Agents', credits: 2200 },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-lg bg-accent/30 text-center">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-display font-bold text-foreground mt-1">{item.credits.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <Button onClick={() => toast.info('Contact admin to purchase additional credits')} className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
          Request More Credits
        </Button>
      </div>
    </div>
  );
};

export default ManageAICredits;
