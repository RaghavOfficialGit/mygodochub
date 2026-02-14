import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, Plug, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SourceConnection {
  id: string;
  sourceName: string;
  tenantId: string;
  authType: string;
  clientId: string;
  clientSecret: string;
  identityZone: string;
  region: string;
}

const INITIAL_SOURCES: SourceConnection[] = [
  { id: '1', sourceName: 'SharePoint Production', tenantId: 'tenant-001', authType: 'OAuth 2.0', clientId: 'sp-client-001', clientSecret: '••••••••', identityZone: 'us-east', region: 'US East' },
  { id: '2', sourceName: 'Jira Cloud', tenantId: 'tenant-002', authType: 'API Key', clientId: 'jira-client-001', clientSecret: '••••••••', identityZone: 'eu-west', region: 'EU West' },
];

const ManageSources = () => {
  const [sources, setSources] = useState<SourceConnection[]>(INITIAL_SOURCES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ sourceName: '', tenantId: '', authType: '', clientId: '', clientSecret: '', identityZone: '', region: '' });

  const openNew = () => {
    setEditingId(null);
    setForm({ sourceName: '', tenantId: '', authType: '', clientId: '', clientSecret: '', identityZone: '', region: '' });
    setDialogOpen(true);
  };

  const openEdit = (s: SourceConnection) => {
    setEditingId(s.id);
    setForm({ sourceName: s.sourceName, tenantId: s.tenantId, authType: s.authType, clientId: s.clientId, clientSecret: '', identityZone: s.identityZone, region: s.region });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.sourceName || !form.tenantId || !form.authType || !form.clientId) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (editingId) {
      setSources(prev => prev.map(s => s.id === editingId ? { ...s, ...form, clientSecret: form.clientSecret || s.clientSecret } : s));
      toast.success('Connection updated');
    } else {
      setSources(prev => [...prev, { ...form, id: crypto.randomUUID(), clientSecret: form.clientSecret || '••••••••' }]);
      toast.success('Connection added');
    }
    setDialogOpen(false);
  };

  const handleTest = () => {
    toast.info('Testing connection...', { description: 'This may take a few seconds' });
    setTimeout(() => toast.success('Connection successful!'), 1500);
  };

  const handleDelete = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
    toast.success('Connection removed');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Manage Sources</h2>
          <p className="text-sm text-muted-foreground mt-1">Configure connections to external document sources</p>
        </div>
        <Button onClick={openNew} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> Add Connection
        </Button>
      </div>

      <div className="space-y-3">
        {sources.map(s => (
          <div key={s.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plug className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{s.sourceName}</p>
                <p className="text-xs text-muted-foreground">Tenant: {s.tenantId} · Auth: {s.authType}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit' : 'Add'} Connection</DialogTitle>
            <DialogDescription>Configure the source connection details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div><Label>Source Name *</Label><Input value={form.sourceName} onChange={e => setForm(f => ({ ...f, sourceName: e.target.value }))} placeholder="e.g. SharePoint Production" /></div>
            <div><Label>Tenant ID *</Label><Input value={form.tenantId} onChange={e => setForm(f => ({ ...f, tenantId: e.target.value }))} placeholder="e.g. tenant-001" /></div>
            <div>
              <Label>Authentication Type *</Label>
              <Select value={form.authType} onValueChange={v => setForm(f => ({ ...f, authType: v }))}>
                <SelectTrigger><SelectValue placeholder="Select auth type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="OAuth 2.0">OAuth 2.0</SelectItem>
                  <SelectItem value="API Key">API Key</SelectItem>
                  <SelectItem value="Basic Auth">Basic Auth</SelectItem>
                  <SelectItem value="SAML">SAML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Client ID *</Label><Input value={form.clientId} onChange={e => setForm(f => ({ ...f, clientId: e.target.value }))} placeholder="Client ID" /></div>
            <div><Label>Client Secret</Label><Input type="password" value={form.clientSecret} onChange={e => setForm(f => ({ ...f, clientSecret: e.target.value }))} placeholder="••••••••" /></div>
            <div><Label>Identity Zone</Label><Input value={form.identityZone} onChange={e => setForm(f => ({ ...f, identityZone: e.target.value }))} placeholder="e.g. us-east" /></div>
            <div><Label>Region</Label><Input value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))} placeholder="e.g. US East" /></div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
            <Button variant="outline" onClick={handleTest}>Test Connection</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageSources;
