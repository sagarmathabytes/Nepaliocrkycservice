import { useState } from 'react';
import { Header } from './Header';
import { StatsOverview } from './StatsOverview';
import { VerificationQueue } from './VerificationQueue';
import { VerificationDetail } from './VerificationDetail';
import { OnboardingFlow } from '../onboarding/OnboardingFlow';

export interface Verification {
  id: string;
  userId: string;
  userName: string;
  documentType: 'citizenship' | 'national-id' | 'license';
  institution: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs-review';
  riskLevel: 'low' | 'medium' | 'high';
  submittedAt: Date;
  slaMinutes: number;
  assignedTo?: string;
  documentImage?: string;
  extractedData?: any;
  notes?: Array<{ id: string; author: string; text: string; timestamp: Date }>;
  auditLog?: Array<{ id: string; action: string; user: string; timestamp: Date; details?: string }>;
}

// Mock data
const mockVerifications: Verification[] = [
  {
    id: 'VRF-2026-10234',
    userId: 'USR-45678',
    userName: 'Ram Bahadur Tamang',
    documentType: 'citizenship',
    institution: 'NIC Asia Bank',
    status: 'needs-review',
    riskLevel: 'high',
    submittedAt: new Date(Date.now() - 12 * 60 * 1000),
    slaMinutes: 30,
    extractedData: {
      fullName: 'Ram Bahadur Tamang',
      citizenshipNumber: '123-45-67890',
      dateOfBirth: '1988/06/28',
      district: 'Kathmandu',
      issueDate: '2018/12/05',
    },
    notes: [
      { id: '1', author: 'Sarah Chen', text: 'Document quality appears degraded, needs closer inspection', timestamp: new Date(Date.now() - 5 * 60 * 1000) }
    ],
    auditLog: [
      { id: '1', action: 'Submitted', user: 'System', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
      { id: '2', action: 'Auto-flagged', user: 'AI Engine', timestamp: new Date(Date.now() - 11 * 60 * 1000), details: 'Low image quality score: 72%' },
      { id: '3', action: 'Assigned', user: 'System', timestamp: new Date(Date.now() - 10 * 60 * 1000), details: 'Assigned to Sarah Chen' },
    ]
  },
  {
    id: 'VRF-2026-10235',
    userId: 'USR-45679',
    userName: 'Sita Sharma',
    documentType: 'national-id',
    institution: 'IME Pay',
    status: 'pending',
    riskLevel: 'low',
    submittedAt: new Date(Date.now() - 8 * 60 * 1000),
    slaMinutes: 30,
    extractedData: {
      fullName: 'Sita Sharma',
      idNumber: 'NID-987654321',
      dateOfBirth: '1995/03/15',
      address: 'Pokhara-12, Kaski',
    },
    auditLog: [
      { id: '1', action: 'Submitted', user: 'System', timestamp: new Date(Date.now() - 8 * 60 * 1000) },
    ]
  },
  {
    id: 'VRF-2026-10236',
    userId: 'USR-45680',
    userName: 'Krishna Thapa',
    documentType: 'license',
    institution: 'Prabhu Bank',
    status: 'pending',
    riskLevel: 'medium',
    submittedAt: new Date(Date.now() - 15 * 60 * 1000),
    slaMinutes: 30,
    extractedData: {
      fullName: 'Krishna Thapa',
      licenseNumber: 'DL-05-2021-123456',
      dateOfBirth: '1990/08/20',
      expiryDate: '2031/08/19',
    },
    auditLog: [
      { id: '1', action: 'Submitted', user: 'System', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
      { id: '2', action: 'Auto-flagged', user: 'AI Engine', timestamp: new Date(Date.now() - 14 * 60 * 1000), details: 'Manual review recommended' },
    ]
  },
  {
    id: 'VRF-2026-10237',
    userId: 'USR-45681',
    userName: 'Maya Gurung',
    documentType: 'citizenship',
    institution: 'Khalti',
    status: 'approved',
    riskLevel: 'low',
    submittedAt: new Date(Date.now() - 45 * 60 * 1000),
    slaMinutes: 30,
    assignedTo: 'John Doe',
    extractedData: {
      fullName: 'Maya Gurung',
      citizenshipNumber: '456-78-90123',
      dateOfBirth: '1992/11/10',
      district: 'Lalitpur',
      issueDate: '2020/01/15',
    },
    auditLog: [
      { id: '1', action: 'Submitted', user: 'System', timestamp: new Date(Date.now() - 45 * 60 * 1000) },
      { id: '2', action: 'Assigned', user: 'System', timestamp: new Date(Date.now() - 40 * 60 * 1000), details: 'Assigned to John Doe' },
      { id: '3', action: 'Approved', user: 'John Doe', timestamp: new Date(Date.now() - 35 * 60 * 1000), details: 'All checks passed' },
    ]
  },
  {
    id: 'VRF-2026-10238',
    userId: 'USR-45682',
    userName: 'Rajesh Shrestha',
    documentType: 'national-id',
    institution: 'eSewa',
    status: 'rejected',
    riskLevel: 'high',
    submittedAt: new Date(Date.now() - 60 * 60 * 1000),
    slaMinutes: 30,
    assignedTo: 'Sarah Chen',
    extractedData: {
      fullName: 'Rajesh Shrestha',
      idNumber: 'NID-111222333',
    },
    notes: [
      { id: '1', author: 'Sarah Chen', text: 'Document appears to be expired', timestamp: new Date(Date.now() - 50 * 60 * 1000) },
      { id: '2', author: 'Sarah Chen', text: 'Customer notified for re-submission', timestamp: new Date(Date.now() - 48 * 60 * 1000) }
    ],
    auditLog: [
      { id: '1', action: 'Submitted', user: 'System', timestamp: new Date(Date.now() - 60 * 60 * 1000) },
      { id: '2', action: 'Assigned', user: 'System', timestamp: new Date(Date.now() - 55 * 60 * 1000), details: 'Assigned to Sarah Chen' },
      { id: '3', action: 'Rejected', user: 'Sarah Chen', timestamp: new Date(Date.now() - 47 * 60 * 1000), details: 'Expired document' },
    ]
  },
];

export function AdminDashboard() {
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [currentView, setCurrentView] = useState<'admin' | 'user'>('admin');

  const handleStatusChange = (id: string, newStatus: Verification['status'], note?: string) => {
    setVerifications(prev =>
      prev.map(v => {
        if (v.id === id) {
          const updatedVerification = {
            ...v,
            status: newStatus,
            assignedTo: 'Current User',
          };

          if (note) {
            updatedVerification.notes = [
              ...(v.notes || []),
              {
                id: Date.now().toString(),
                author: 'Current User',
                text: note,
                timestamp: new Date(),
              }
            ];
          }

          updatedVerification.auditLog = [
            ...(v.auditLog || []),
            {
              id: Date.now().toString(),
              action: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
              user: 'Current User',
              timestamp: new Date(),
              details: note,
            }
          ];

          return updatedVerification;
        }
        return v;
      })
    );

    // Update selected verification if it's the one being changed
    if (selectedVerification?.id === id) {
      const updated = verifications.find(v => v.id === id);
      if (updated) {
        setSelectedVerification({ ...updated, status: newStatus });
      }
    }
  };

  if (currentView === 'user') {
    return (
      <div className="min-h-screen bg-white">
        <Header onViewChange={setCurrentView} currentView={currentView} />
        <OnboardingFlow />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onViewChange={setCurrentView} currentView={currentView} />
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <StatsOverview verifications={verifications} />
        <VerificationQueue
          verifications={verifications}
          onSelectVerification={setSelectedVerification}
          selectedId={selectedVerification?.id}
        />
      </div>

      {selectedVerification && (
        <VerificationDetail
          verification={selectedVerification}
          onClose={() => setSelectedVerification(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}