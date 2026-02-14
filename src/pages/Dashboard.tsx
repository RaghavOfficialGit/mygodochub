import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_DOCUMENTS, SOURCES, DOCUMENT_TYPES } from '@/data/documents';
import { Database, FileText, Clock, Code } from 'lucide-react';

const ABAP_OBJECTS = [
  { type: 'Classes', count: 142 },
  { type: 'Function Modules', count: 87 },
  { type: 'Reports', count: 56 },
  { type: 'Interfaces', count: 34 },
];

const Dashboard = () => {
  const lastUpdated = MOCK_DOCUMENTS.reduce((latest, doc) => {
    const d = new Date(doc.updatedOn);
    return d > latest ? d : latest;
  }, new Date(0));

  const docsByType = DOCUMENT_TYPES.map(type => ({
    type,
    count: MOCK_DOCUMENTS.filter(d => d.documentType === type).length,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of your project ecosystem</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card className="card-elevated-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sources</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{SOURCES.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{SOURCES.join(', ')}</p>
          </CardContent>
        </Card>

        <Card className="card-elevated-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{MOCK_DOCUMENTS.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all sources</p>
          </CardContent>
        </Card>

        <Card className="card-elevated-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-display font-bold text-foreground">{lastUpdated.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground mt-1">{lastUpdated.toLocaleTimeString()}</p>
          </CardContent>
        </Card>

        <Card className="card-elevated-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">ABAP Objects</CardTitle>
            <Code className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">{ABAP_OBJECTS.reduce((s, o) => s + o.count, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">{ABAP_OBJECTS.length} object types</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents by type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base font-display">Documents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {docsByType.map(({ type, count }) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / MOCK_DOCUMENTS.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-base font-display">ABAP Objects by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ABAP_OBJECTS.map(({ type, count }) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${(count / 150) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
