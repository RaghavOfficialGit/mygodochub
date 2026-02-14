import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Plug, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ManagePrompts from '@/components/settings/ManagePrompts';
import ManageSources from '@/components/settings/ManageSources';
import ManageRoles from '@/components/settings/ManageRoles';
import ManageAICredits from '@/components/settings/ManageAICredits';

const tabs = [
  { id: 'prompts', label: 'Manage Prompts', icon: MessageSquare },
  { id: 'sources', label: 'Manage Sources', icon: Plug },
  { id: 'roles', label: 'Manage Roles', icon: Shield },
  { id: 'credits', label: 'Manage AI Credits', icon: Zap },
] as const;

type TabId = typeof tabs[number]['id'];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<TabId>('prompts');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'prompts': return <ManagePrompts />;
      case 'sources': return <ManageSources />;
      case 'roles': return <ManageRoles />;
      case 'credits': return <ManageAICredits />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        </div>

        <div className="flex gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Sidebar */}
          <nav className="w-56 shrink-0 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 p-6 rounded-xl border border-border bg-card/50">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
