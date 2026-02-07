export interface Document {
  id: string;
  source: 'CALM' | 'SharePoint' | 'Jira' | 'Solman';
  documentType: 'Solution Document' | 'Decision Paper' | 'Functional Spec' | 'Technical Spec' | 'Change document';
  documentName: string;
  updatedBy: string;
  updatedOn: string;
  project: string;
}

export const SOURCES = ['CALM', 'SharePoint', 'Jira', 'Solman'] as const;
export const DOCUMENT_TYPES = ['Solution Document', 'Decision Paper', 'Functional Spec', 'Technical Spec', 'Change document'] as const;

export const MOCK_DOCUMENTS: Document[] = [
  { id: '1', source: 'CALM', documentType: 'Solution Document', documentName: 'S4HANA Migration Strategy v2.1', updatedBy: 'Ankit Sharma', updatedOn: '2026-02-05', project: 'Project Phoenix' },
  { id: '2', source: 'SharePoint', documentType: 'Technical Spec', documentName: 'API Gateway Architecture', updatedBy: 'Priya Patel', updatedOn: '2026-02-04', project: 'Project Atlas' },
  { id: '3', source: 'Jira', documentType: 'Change document', documentName: 'CR-4521 Middleware Update', updatedBy: 'David Chen', updatedOn: '2026-02-03', project: 'Project Phoenix' },
  { id: '4', source: 'Solman', documentType: 'Decision Paper', documentName: 'Cloud vs On-Prem Assessment', updatedBy: 'Sarah Kim', updatedOn: '2026-02-02', project: 'Project Nebula' },
  { id: '5', source: 'CALM', documentType: 'Functional Spec', documentName: 'User Auth Module FS', updatedBy: 'Marco Rossi', updatedOn: '2026-02-01', project: 'Project Atlas' },
  { id: '6', source: 'SharePoint', documentType: 'Solution Document', documentName: 'Data Lake Integration Plan', updatedBy: 'Ankit Sharma', updatedOn: '2026-01-30', project: 'Project Nebula' },
  { id: '7', source: 'Jira', documentType: 'Technical Spec', documentName: 'Kafka Event Streaming Design', updatedBy: 'Lena Müller', updatedOn: '2026-01-28', project: 'Project Phoenix' },
  { id: '8', source: 'Solman', documentType: 'Change document', documentName: 'CR-4499 DB Schema Migration', updatedBy: 'David Chen', updatedOn: '2026-01-27', project: 'Project Atlas' },
  { id: '9', source: 'CALM', documentType: 'Decision Paper', documentName: 'Vendor Selection: Monitoring Tools', updatedBy: 'Priya Patel', updatedOn: '2026-01-25', project: 'Project Nebula' },
  { id: '10', source: 'SharePoint', documentType: 'Functional Spec', documentName: 'Reporting Dashboard FS v1.3', updatedBy: 'Sarah Kim', updatedOn: '2026-01-22', project: 'Project Phoenix' },
  { id: '11', source: 'Jira', documentType: 'Solution Document', documentName: 'CI/CD Pipeline Overhaul', updatedBy: 'Marco Rossi', updatedOn: '2026-01-20', project: 'Project Atlas' },
  { id: '12', source: 'Solman', documentType: 'Technical Spec', documentName: 'SAP BTP Extension Architecture', updatedBy: 'Lena Müller', updatedOn: '2026-01-18', project: 'Project Nebula' },
];

export const PROJECTS = [...new Set(MOCK_DOCUMENTS.map(d => d.project))];
