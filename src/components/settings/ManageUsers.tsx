import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Ankit Sharma', email: 'ankit.sharma@company.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Priya Patel', email: 'priya.patel@company.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'David Chen', email: 'david.chen@company.com', role: 'Viewer', status: 'Active' },
  { id: '4', name: 'Sarah Kim', email: 'sarah.kim@company.com', role: 'Editor', status: 'Inactive' },
];

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Viewer');

  const handleAdd = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    setUsers(prev => [...prev, { id: crypto.randomUUID(), name: newName.trim(), email: newEmail.trim(), role: newRole, status: 'Active' }]);
    setNewName('');
    setNewEmail('');
    setNewRole('Viewer');
    toast.success('User added');
  };

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User removed');
  };

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  return (
    <div>
      <h2 className="text-xl font-display font-bold text-foreground">User Management</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-6">Add, remove, and manage user accounts</p>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Full name" className="max-w-[180px]" />
        <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Email address" className="max-w-[220px]" />
        <Select value={newRole} onValueChange={setNewRole}>
          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Users className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="font-medium text-sm text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">{user.role}</Badge>
              <Badge
                variant={user.status === 'Active' ? 'default' : 'outline'}
                className="text-xs cursor-pointer"
                onClick={() => toggleStatus(user.id)}
              >
                {user.status}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
