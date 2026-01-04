import { useState } from 'react';
import { Building2, Download, FileCheck, XCircle, Clock, AlertTriangle, X, Check, CheckCircle, User, MapPin, Briefcase, FileText, Users } from 'lucide-react';

interface KYCApplication {
  id: string;
  name: string;
  mobile: string;
  branch: string;
  status: 'pending' | 'approved' | 'rejected';
  riskLevel: 'low' | 'medium' | 'high';
  riskReasons?: string[];
  isPEP: boolean;
  submittedAt: string;
  ocrConfidence: number;
  fullData?: {
    personalInfo: {
      fullNameEn: string;
      fullNameNe: string;
      dobBS: string;
      dobAD: string;
      gender: string;
      nationality: string;
      education: string;
    };
    address: {
      permanent: string;
      present: string;
      mobile: string;
      email: string;
    };
    documents: Array<{
      type: string;
      number: string;
      issuedBy: string;
      issueDate: string;
      confidence: number;
    }>;
    family: Array<{
      relation: string;
      name: string;
    }>;
    income: {
      sources: string[];
      occupation: string;
      annualIncome: string;
      annualTransaction: string;
    };
    compliance: {
      isGovEmployee: boolean;
      isPEP: boolean;
      isConvicted: boolean;
    };
    residence: {
      landlordName: string;
      landlordContact: string;
      landmark: string;
      location?: { lat: number; lng: number };
    };
  };
}

export function AdminDashboard() {
  const [selectedKYC, setSelectedKYC] = useState<KYCApplication | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const mockKYCs: KYCApplication[] = [
    {
      id: 'KYC-2026-001',
      name: 'Ram Bahadur Tamang',
      mobile: '9841234567',
      branch: 'Kathmandu Main',
      status: 'pending',
      riskLevel: 'high',
      riskReasons: ['High transaction volume', 'PEP status'],
      isPEP: true,
      submittedAt: '2026-01-03 10:30',
      ocrConfidence: 72,
      fullData: {
        personalInfo: {
          fullNameEn: 'Ram Bahadur Tamang',
          fullNameNe: 'राम बहादुर तामाङ',
          dobBS: '2055/03/15',
          dobAD: '1998-07-01',
          gender: 'Male',
          nationality: 'Nepali',
          education: "Bachelor's Degree",
        },
        address: {
          permanent: 'House 123, Thamel, Ward 26, Kathmandu Metropolitan, Kathmandu, Bagmati',
          present: 'House 123, Thamel, Ward 26, Kathmandu Metropolitan, Kathmandu, Bagmati',
          mobile: '9841234567',
          email: 'ram.tamang@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '123-45-67890',
            issuedBy: 'Kathmandu',
            issueDate: '2020-01-15',
            confidence: 95,
          },
        ],
        family: [
          { relation: 'Father', name: 'Bir Bahadur Tamang' },
          { relation: 'Mother', name: 'Maya Tamang' },
        ],
        income: {
          sources: ['Salary'],
          occupation: 'Senior Developer at Tech Company Pvt. Ltd.',
          annualIncome: 'NPR 1,200,000',
          annualTransaction: 'NPR 2,000,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: true,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Hari Prasad Sharma',
          landlordContact: '9851234567',
          landmark: 'Near Garden of Dreams, 50m from landmark',
        },
      },
    },
    {
      id: 'KYC-2026-002',
      name: 'Sita Sharma',
      mobile: '9851234567',
      branch: 'Thamel',
      status: 'pending',
      riskLevel: 'low',
      riskReasons: [],
      isPEP: false,
      submittedAt: '2026-01-03 11:15',
      ocrConfidence: 98,
      fullData: {
        personalInfo: {
          fullNameEn: 'Sita Sharma',
          fullNameNe: 'सीता शर्मा',
          dobBS: '2060/05/20',
          dobAD: '2003-09-05',
          gender: 'Female',
          nationality: 'Nepali',
          education: '+2 / Intermediate',
        },
        address: {
          permanent: 'House 456, Bouddha, Ward 6, Kathmandu Metropolitan, Kathmandu, Bagmati',
          present: 'House 456, Bouddha, Ward 6, Kathmandu Metropolitan, Kathmandu, Bagmati',
          mobile: '9851234567',
          email: 'sita.sharma@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '987-65-43210',
            issuedBy: 'Kathmandu',
            issueDate: '2021-06-10',
            confidence: 98,
          },
        ],
        family: [
          { relation: 'Father', name: 'Krishna Sharma' },
          { relation: 'Mother', name: 'Radha Sharma' },
        ],
        income: {
          sources: ['Business'],
          occupation: 'Small Business Owner',
          annualIncome: 'NPR 600,000',
          annualTransaction: 'NPR 1,000,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Self-owned',
          landlordContact: 'N/A',
          landmark: 'Near Bouddha Stupa, 100m from main gate',
        },
      },
    },
  ];

  const stats = {
    pending: mockKYCs.filter(k => k.status === 'pending').length,
    approved: mockKYCs.filter(k => k.status === 'approved').length,
    rejected: mockKYCs.filter(k => k.status === 'rejected').length,
    highRisk: mockKYCs.filter(k => k.riskLevel === 'high').length,
  };

  const filteredKYCs = filterStatus === 'all' 
    ? mockKYCs 
    : filterStatus === 'high-risk'
    ? mockKYCs.filter(k => k.riskLevel === 'high')
    : mockKYCs.filter(k => k.status === filterStatus);

  const handleApprove = () => {
    alert(`KYC Application ${selectedKYC?.id} has been APPROVED`);
    setSelectedKYC(null);
  };

  const handleReject = () => {
    const reason = prompt('Please provide rejection reason:');
    if (reason) {
      alert(`KYC Application ${selectedKYC?.id} has been REJECTED\nReason: ${reason}`);
      setSelectedKYC(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Bank KYC Verification Center</h1>
              <p className="text-sm text-gray-600">Review and approve customer KYC applications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <button
            onClick={() => setFilterStatus('pending')}
            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <span className="text-3xl text-blue-700">{stats.pending}</span>
            </div>
            <p className="text-sm text-gray-600">Pending Review</p>
          </button>
          
          <button
            onClick={() => setFilterStatus('approved')}
            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-green-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <FileCheck className="w-8 h-8 text-green-600" />
              <span className="text-3xl text-green-700">{stats.approved}</span>
            </div>
            <p className="text-sm text-gray-600">Approved Today</p>
          </button>
          
          <button
            onClick={() => setFilterStatus('rejected')}
            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-red-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <span className="text-3xl text-red-700">{stats.rejected}</span>
            </div>
            <p className="text-sm text-gray-600">Rejected Today</p>
          </button>
          
          <button
            onClick={() => setFilterStatus('high-risk')}
            className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-orange-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <span className="text-3xl text-orange-700">{stats.highRisk}</span>
            </div>
            <p className="text-sm text-gray-600">High Risk Flagged</p>
          </button>
        </div>

        {/* Filter indicator */}
        {filterStatus !== 'all' && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtered by:</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
              {filterStatus.replace('-', ' ')}
            </span>
            <button
              onClick={() => setFilterStatus('all')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Queue */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900">KYC Applications</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {filteredKYCs.map(kyc => (
                <div key={kyc.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-emerald-500 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{kyc.name}</h3>
                      <p className="text-sm text-gray-600">{kyc.id} • {kyc.mobile}</p>
                    </div>
                    <div className="flex gap-2">
                      {kyc.isPEP && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">PEP</span>
                      )}
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        kyc.riskLevel === 'high' ? 'bg-red-100 text-red-700' : 
                        kyc.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {kyc.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Branch</p>
                      <p className="text-gray-900">{kyc.branch}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Submitted</p>
                      <p className="text-gray-900">{kyc.submittedAt}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">OCR Confidence</p>
                      <p className={`${kyc.ocrConfidence > 90 ? 'text-green-600' : 'text-orange-600'}`}>
                        {kyc.ocrConfidence}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="text-blue-600 capitalize">{kyc.status}</p>
                    </div>
                  </div>

                  {/* Risk Reasons */}
                  {kyc.riskLevel === 'high' && kyc.riskReasons && kyc.riskReasons.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-red-900 mb-2">High Risk Flags:</p>
                          <ul className="space-y-1">
                            {kyc.riskReasons.map((reason, idx) => (
                              <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                                <span className="text-red-600">•</span>
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedKYC(kyc)}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Review Application
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedKYC && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-gray-900">KYC Application Review</h2>
                <p className="text-sm text-gray-600">{selectedKYC.id}</p>
              </div>
              <button
                onClick={() => setSelectedKYC(null)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="col-span-2 space-y-6">
                  {/* Personal Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Full Name (English)</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.fullNameEn}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Full Name (Nepali)</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.fullNameNe}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date of Birth (BS)</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.dobBS}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date of Birth (AD)</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.dobAD}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Gender</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.gender}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Nationality</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.nationality}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Education</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.personalInfo.education}</p>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      Address & Contact
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-gray-600">Permanent Address</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.address.permanent}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Present Address</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.address.present}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Mobile</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.address.mobile}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Email</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.address.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      Identity Documents
                    </h3>
                    {selectedKYC.fullData?.documents.map((doc, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-900">{doc.type}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            doc.confidence > 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {doc.confidence}% Confidence
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Number</p>
                            <p className="text-gray-900">{doc.number}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Issued By</p>
                            <p className="text-gray-900">{doc.issuedBy}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Issue Date</p>
                            <p className="text-gray-900">{doc.issueDate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Family */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-600" />
                      Family Members
                    </h3>
                    <div className="space-y-2">
                      {selectedKYC.fullData?.family.map((member, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{member.relation}</span>
                          <span className="text-gray-900">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Income */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                      Income & Occupation
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600">Income Sources</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.income.sources.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Occupation</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.income.occupation}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Annual Income</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.income.annualIncome}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Annual Transaction</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.income.annualTransaction}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Residence */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4">Residence Verification</h3>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600">Landlord Name</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.residence.landlordName}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Landlord Contact</p>
                          <p className="text-gray-900">{selectedKYC.fullData?.residence.landlordContact}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600">Nearest Landmark</p>
                        <p className="text-gray-900">{selectedKYC.fullData?.residence.landmark}</p>
                      </div>
                      {selectedKYC.fullData?.residence.location && (
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-gray-600 mb-2">GPS Location</p>
                          <p className="text-gray-900 mb-2">
                            {selectedKYC.fullData.residence.location.lat.toFixed(6)}, {selectedKYC.fullData.residence.location.lng.toFixed(6)}
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${selectedKYC.fullData.residence.location.lat},${selectedKYC.fullData.residence.location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <MapPin className="w-4 h-4" />
                            View on Google Maps
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                    <h3 className="text-gray-900 mb-4">Risk Assessment</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          selectedKYC.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                          selectedKYC.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {selectedKYC.riskLevel.toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Risk Reasons */}
                      {selectedKYC.riskLevel === 'high' && selectedKYC.riskReasons && selectedKYC.riskReasons.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-amber-300">
                          <p className="text-sm text-gray-900 mb-2">Risk Flags:</p>
                          <ul className="space-y-2">
                            {selectedKYC.riskReasons.map((reason, idx) => (
                              <li key={idx} className="text-xs text-red-700 flex items-start gap-2 bg-red-50 p-2 rounded border border-red-200">
                                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-600 mb-1">OCR Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${selectedKYC.ocrConfidence > 90 ? 'bg-green-600' : 'bg-orange-600'}`}
                              style={{ width: `${selectedKYC.ocrConfidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-900">{selectedKYC.ocrConfidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Flags */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4">Compliance Checks</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Government Employee</span>
                        <span className={selectedKYC.fullData?.compliance.isGovEmployee ? 'text-orange-600' : 'text-green-600'}>
                          {selectedKYC.fullData?.compliance.isGovEmployee ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">PEP Status</span>
                        <span className={selectedKYC.fullData?.compliance.isPEP ? 'text-orange-600' : 'text-green-600'}>
                          {selectedKYC.fullData?.compliance.isPEP ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Convicted</span>
                        <span className={selectedKYC.fullData?.compliance.isConvicted ? 'text-red-600' : 'text-green-600'}>
                          {selectedKYC.fullData?.compliance.isConvicted ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Application Info */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-gray-900 mb-4">Application Info</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-gray-600">Branch</p>
                        <p className="text-gray-900">{selectedKYC.branch}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Submitted</p>
                        <p className="text-gray-900">{selectedKYC.submittedAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <p className="text-blue-600 capitalize">{selectedKYC.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleApprove}
                      className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Application
                    </button>
                    <button
                      onClick={handleReject}
                      className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Application
                    </button>
                    <button
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}