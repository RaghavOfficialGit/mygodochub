import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const INITIAL_ROLES: Role[] = [
  { id: '1', name: 'Admin', permissions: ['Read', 'Write', 'Delete', 'Manage Users'] },
  { id: '2', name: 'Editor', permissions: ['Read', 'Write'] },
  { id: '3', name: 'Viewer', permissions: ['Read'] },
];

const ManageRoles = () => {
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);
  const [newRole, setNewRole] = useState('');

  const handleAdd = () => {
    if (!newRole.trim()) return;
    setRoles(prev => [...prev, { id: crypto.randomUUID(), name: newRole.trim(), permissions: ['Read'] }]);
    setNewRole('');
    toast.success('Role added');
  };

  const handleDelete = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    toast.success('Role removed');
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground">Manage Roles</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Define user roles and permissions</p>

      <div className="flex gap-3 mb-6">
        <Input value={newRole} onChange={e => setNewRole(e.target.value)} placeholder="New role name" className="max-w-xs" onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"><Plus className="h-4 w-4" /> Add Role</Button>
      </div>

      <div className="space-y-3">
        {roles.map(role => (
          <div key={role.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Shield className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="font-medium text-sm text-foreground">{role.name}</p>
                <div className="flex gap-1.5 mt-1">
                  {role.permissions.map(p => (
                    <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRoles;
