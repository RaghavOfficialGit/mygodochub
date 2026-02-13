import { Document } from './documents';

// Simulated external documents that can be synced
export const EXTERNAL_DOCUMENTS: Document[] = [
  { id: 'ext-1', source: 'CALM', documentType: 'Solution Document', documentName: 'ERP Consolidation Roadmap v3.0', updatedBy: 'Ravi Kumar', updatedOn: '2026-02-10', project: 'Project Phoenix' },
  { id: 'ext-2', source: 'SharePoint', documentType: 'Decision Paper', documentName: 'Multi-Cloud Strategy Assessment', updatedBy: 'Emily Watson', updatedOn: '2026-02-09', project: 'Project Nebula' },
  { id: 'ext-3', source: 'Jira', documentType: 'Technical Spec', documentName: 'Microservices Migration Blueprint', updatedBy: 'Carlos Mendez', updatedOn: '2026-02-08', project: 'Project Atlas' },
  { id: 'ext-4', source: 'Solman', documentType: 'Change document', documentName: 'CR-4600 Security Patch Rollout', updatedBy: 'Aisha Begum', updatedOn: '2026-02-07', project: 'Project Phoenix' },
  { id: 'ext-5', source: 'CALM', documentType: 'Functional Spec', documentName: 'Payment Gateway Integration FS', updatedBy: 'James O\'Brien', updatedOn: '2026-02-06', project: 'Project Atlas' },
  { id: 'ext-6', source: 'SharePoint', documentType: 'Technical Spec', documentName: 'Data Warehouse Schema v2.0', updatedBy: 'Priya Patel', updatedOn: '2026-02-05', project: 'Project Nebula' },
  { id: 'ext-7', source: 'Jira', documentType: 'Solution Document', documentName: 'DevOps Pipeline Optimization', updatedBy: 'Marco Rossi', updatedOn: '2026-02-04', project: 'Project Phoenix' },
  { id: 'ext-8', source: 'Solman', documentType: 'Decision Paper', documentName: 'License Renewal Strategy 2026', updatedBy: 'Lena Müller', updatedOn: '2026-02-03', project: 'Project Nebula' },
  { id: 'ext-9', source: 'CALM', documentType: 'Change document', documentName: 'CR-4610 API Rate Limiting Update', updatedBy: 'David Chen', updatedOn: '2026-02-02', project: 'Project Atlas' },
  { id: 'ext-10', source: 'SharePoint', documentType: 'Functional Spec', documentName: 'Mobile App Notifications FS', updatedBy: 'Sarah Kim', updatedOn: '2026-02-01', project: 'Project Phoenix' },
];
