import { useState } from 'react';
import { Building2, Download, FileCheck, XCircle, Clock, AlertTriangle, X, Check, CheckCircle, User, MapPin, Briefcase, FileText, Users, Search, Filter, Calendar } from 'lucide-react';

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
  submittedDate: Date;
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
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mockKYCs: KYCApplication[] = [
    {
      id: 'KYC-2026-001',
      name: 'Ram Bahadur Tamang',
      mobile: '9841234567',
      branch: 'Kathmandu Main',
      status: 'pending',
      riskLevel: 'high',
      riskReasons: [
        'Politically Exposed Person (PEP) - Government official',
        'Low OCR confidence score (72%) - requires manual verification',
        'High annual transaction volume (NPR 2,000,000)',
      ],
      isPEP: true,
      submittedAt: '2026-01-03 10:30',
      submittedDate: new Date('2026-01-03T10:30:00'),
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
          landmark: 'Near Garden of Dreams',
          location: { lat: 27.7172, lng: 85.3240 },
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
      submittedDate: new Date('2026-01-03T11:15:00'),
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
          landmark: 'Near Bouddha Stupa',
          location: { lat: 27.7215, lng: 85.3621 },
        },
      },
    },
    {
      id: 'KYC-2026-003',
      name: 'Rajesh Thapa',
      mobile: '9803456789',
      branch: 'Pokhara',
      status: 'approved',
      riskLevel: 'low',
      riskReasons: [],
      isPEP: false,
      submittedAt: '2026-01-02 14:20',
      submittedDate: new Date('2026-01-02T14:20:00'),
      ocrConfidence: 94,
      fullData: {
        personalInfo: {
          fullNameEn: 'Rajesh Thapa',
          fullNameNe: 'राजेश थापा',
          dobBS: '2050/08/12',
          dobAD: '1993-11-28',
          gender: 'Male',
          nationality: 'Nepali',
          education: "Master's Degree",
        },
        address: {
          permanent: 'Lakeside, Ward 6, Pokhara Metropolitan, Kaski, Gandaki',
          present: 'Lakeside, Ward 6, Pokhara Metropolitan, Kaski, Gandaki',
          mobile: '9803456789',
          email: 'rajesh.thapa@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '456-78-12345',
            issuedBy: 'Kaski',
            issueDate: '2019-03-20',
            confidence: 94,
          },
        ],
        family: [
          { relation: 'Father', name: 'Gopal Thapa' },
          { relation: 'Spouse', name: 'Anita Thapa' },
        ],
        income: {
          sources: ['Salary', 'Business'],
          occupation: 'Hotel Manager',
          annualIncome: 'NPR 800,000',
          annualTransaction: 'NPR 1,500,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Self-owned',
          landlordContact: 'N/A',
          landmark: 'Near Fewa Lake',
          location: { lat: 28.2096, lng: 83.9856 },
        },
      },
    },
    {
      id: 'KYC-2026-004',
      name: 'Sunita Gurung',
      mobile: '9867543210',
      branch: 'Kathmandu Main',
      status: 'pending',
      riskLevel: 'medium',
      riskReasons: [
        'Multiple income sources requiring verification',
        'Recent address change within last 6 months',
      ],
      isPEP: false,
      submittedAt: '2026-01-04 09:45',
      submittedDate: new Date('2026-01-04T09:45:00'),
      ocrConfidence: 88,
      fullData: {
        personalInfo: {
          fullNameEn: 'Sunita Gurung',
          fullNameNe: 'सुनिता गुरुङ',
          dobBS: '2058/02/10',
          dobAD: '2001-05-24',
          gender: 'Female',
          nationality: 'Nepali',
          education: "Bachelor's Degree",
        },
        address: {
          permanent: 'Baneshwor, Ward 32, Kathmandu Metropolitan, Kathmandu, Bagmati',
          present: 'Baneshwor, Ward 32, Kathmandu Metropolitan, Kathmandu, Bagmati',
          mobile: '9867543210',
          email: 'sunita.gurung@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '789-12-34567',
            issuedBy: 'Kathmandu',
            issueDate: '2019-08-15',
            confidence: 88,
          },
        ],
        family: [
          { relation: 'Father', name: 'Tek Bahadur Gurung' },
          { relation: 'Mother', name: 'Mina Gurung' },
        ],
        income: {
          sources: ['Salary', 'Freelance'],
          occupation: 'Graphic Designer',
          annualIncome: 'NPR 500,000',
          annualTransaction: 'NPR 800,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Prakash Rai',
          landlordContact: '9841567890',
          landmark: 'Near Baneshwor Chowk',
        },
      },
    },
    {
      id: 'KYC-2026-005',
      name: 'Bikash Adhikari',
      mobile: '9812345678',
      branch: 'Biratnagar',
      status: 'rejected',
      riskLevel: 'high',
      riskReasons: [
        'Document verification failed - Inconsistent information',
        'Unable to verify employment details',
        'No response to verification calls',
      ],
      isPEP: false,
      submittedAt: '2026-01-01 16:10',
      submittedDate: new Date('2026-01-01T16:10:00'),
      ocrConfidence: 65,
      fullData: {
        personalInfo: {
          fullNameEn: 'Bikash Adhikari',
          fullNameNe: 'विकाश अधिकारी',
          dobBS: '2062/10/05',
          dobAD: '2006-01-20',
          gender: 'Male',
          nationality: 'Nepali',
          education: 'SEE / SLC',
        },
        address: {
          permanent: 'Traffic Chowk, Ward 5, Biratnagar Metropolitan, Morang, Province 1',
          present: 'Traffic Chowk, Ward 5, Biratnagar Metropolitan, Morang, Province 1',
          mobile: '9812345678',
          email: 'bikash.adhikari@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '321-98-76543',
            issuedBy: 'Morang',
            issueDate: '2024-03-10',
            confidence: 65,
          },
        ],
        family: [
          { relation: 'Father', name: 'Ram Adhikari' },
          { relation: 'Mother', name: 'Sita Adhikari' },
        ],
        income: {
          sources: ['Salary'],
          occupation: 'Retail Store Assistant',
          annualIncome: 'NPR 200,000',
          annualTransaction: 'NPR 400,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Mohan Yadav',
          landlordContact: '9823456789',
          landmark: 'Near Traffic Chowk',
        },
      },
    },
    {
      id: 'KYC-2026-006',
      name: 'Anjali Shrestha',
      mobile: '9845678901',
      branch: 'Lalitpur',
      status: 'approved',
      riskLevel: 'low',
      riskReasons: [],
      isPEP: false,
      submittedAt: '2026-01-02 10:15',
      submittedDate: new Date('2026-01-02T10:15:00'),
      ocrConfidence: 96,
      fullData: {
        personalInfo: {
          fullNameEn: 'Anjali Shrestha',
          fullNameNe: 'अञ्जली श्रेष्ठ',
          dobBS: '2053/11/22',
          dobAD: '1997-03-06',
          gender: 'Female',
          nationality: 'Nepali',
          education: "Bachelor's Degree",
        },
        address: {
          permanent: 'Jawalakhel, Ward 3, Lalitpur Metropolitan, Lalitpur, Bagmati',
          present: 'Jawalakhel, Ward 3, Lalitpur Metropolitan, Lalitpur, Bagmati',
          mobile: '9845678901',
          email: 'anjali.shrestha@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '654-32-10987',
            issuedBy: 'Lalitpur',
            issueDate: '2018-05-15',
            confidence: 96,
          },
        ],
        family: [
          { relation: 'Father', name: 'Shyam Shrestha' },
          { relation: 'Mother', name: 'Laxmi Shrestha' },
        ],
        income: {
          sources: ['Salary'],
          occupation: 'Accountant at Finance Company',
          annualIncome: 'NPR 700,000',
          annualTransaction: 'NPR 1,200,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Self-owned',
          landlordContact: 'N/A',
          landmark: 'Near Jawalakhel Zoo',
        },
      },
    },
    {
      id: 'KYC-2026-007',
      name: 'Deepak Karki',
      mobile: '9834567890',
      branch: 'Thamel',
      status: 'pending',
      riskLevel: 'high',
      riskReasons: [
        'Large cash deposit history requiring source verification',
        'Business ownership requires enhanced due diligence',
        'International transaction history flagged',
      ],
      isPEP: false,
      submittedAt: '2026-01-04 13:20',
      submittedDate: new Date('2026-01-04T13:20:00'),
      ocrConfidence: 91,
      fullData: {
        personalInfo: {
          fullNameEn: 'Deepak Karki',
          fullNameNe: 'दीपक कार्की',
          dobBS: '2048/06/18',
          dobAD: '1991-10-04',
          gender: 'Male',
          nationality: 'Nepali',
          education: "Bachelor's Degree",
        },
        address: {
          permanent: 'Thamel, Ward 26, Kathmandu Metropolitan, Kathmandu, Bagmati',
          present: 'Thamel, Ward 26, Kathmandu Metropolitan, Kathmandu, Bagmati',
          mobile: '9834567890',
          email: 'deepak.karki@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '147-25-36985',
            issuedBy: 'Kathmandu',
            issueDate: '2017-12-01',
            confidence: 91,
          },
        ],
        family: [
          { relation: 'Father', name: 'Narayan Karki' },
          { relation: 'Spouse', name: 'Sabina Karki' },
        ],
        income: {
          sources: ['Business', 'Investment'],
          occupation: 'Import/Export Business Owner',
          annualIncome: 'NPR 2,500,000',
          annualTransaction: 'NPR 5,000,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Ramesh Pradhan',
          landlordContact: '9856789012',
          landmark: 'Near Kathmandu Guest House',
        },
      },
    },
    {
      id: 'KYC-2026-008',
      name: 'Prabha Rai',
      mobile: '9823456789',
      branch: 'Pokhara',
      status: 'approved',
      riskLevel: 'low',
      riskReasons: [],
      isPEP: false,
      submittedAt: '2026-01-03 15:30',
      submittedDate: new Date('2026-01-03T15:30:00'),
      ocrConfidence: 97,
      fullData: {
        personalInfo: {
          fullNameEn: 'Prabha Rai',
          fullNameNe: 'प्रभा राई',
          dobBS: '2056/04/08',
          dobAD: '1999-07-24',
          gender: 'Female',
          nationality: 'Nepali',
          education: "+2 / Intermediate",
        },
        address: {
          permanent: 'Mahendrapul, Ward 16, Pokhara Metropolitan, Kaski, Gandaki',
          present: 'Mahendrapul, Ward 16, Pokhara Metropolitan, Kaski, Gandaki',
          mobile: '9823456789',
          email: 'prabha.rai@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '258-14-73695',
            issuedBy: 'Kaski',
            issueDate: '2020-02-14',
            confidence: 97,
          },
        ],
        family: [
          { relation: 'Father', name: 'Kumar Rai' },
          { relation: 'Mother', name: 'Sunita Rai' },
        ],
        income: {
          sources: ['Salary'],
          occupation: 'Teacher at Secondary School',
          annualIncome: 'NPR 400,000',
          annualTransaction: 'NPR 600,000',
        },
        compliance: {
          isGovEmployee: true,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Self-owned',
          landlordContact: 'N/A',
          landmark: 'Near Mahendrapul Bazaar',
        },
      },
    },
    {
      id: 'KYC-2026-009',
      name: 'Anil Magar',
      mobile: '9856123456',
      branch: 'Lalitpur',
      status: 'pending',
      riskLevel: 'medium',
      riskReasons: [
        'Foreign employment history requires additional documentation',
        'Remittance income source needs verification',
      ],
      isPEP: false,
      submittedAt: '2026-01-04 11:00',
      submittedDate: new Date('2026-01-04T11:00:00'),
      ocrConfidence: 85,
      fullData: {
        personalInfo: {
          fullNameEn: 'Anil Magar',
          fullNameNe: 'अनिल मगर',
          dobBS: '2054/09/25',
          dobAD: '1998-01-10',
          gender: 'Male',
          nationality: 'Nepali',
          education: 'SEE / SLC',
        },
        address: {
          permanent: 'Kupondole, Ward 23, Lalitpur Metropolitan, Lalitpur, Bagmati',
          present: 'Kupondole, Ward 23, Lalitpur Metropolitan, Lalitpur, Bagmati',
          mobile: '9856123456',
          email: 'anil.magar@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '369-85-14725',
            issuedBy: 'Lalitpur',
            issueDate: '2016-11-20',
            confidence: 85,
          },
        ],
        family: [
          { relation: 'Father', name: 'Dhan Bahadur Magar' },
          { relation: 'Mother', name: 'Kamala Magar' },
        ],
        income: {
          sources: ['Remittance'],
          occupation: 'Foreign Employment (Qatar)',
          annualIncome: 'NPR 900,000',
          annualTransaction: 'NPR 1,000,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Sanjay Maharjan',
          landlordContact: '9841789456',
          landmark: 'Near Kupondole Height',
        },
      },
    },
    {
      id: 'KYC-2026-010',
      name: 'Sarita Poudel',
      mobile: '9867891234',
      branch: 'Biratnagar',
      status: 'pending',
      riskLevel: 'low',
      riskReasons: [],
      isPEP: false,
      submittedAt: '2026-01-04 14:45',
      submittedDate: new Date('2026-01-04T14:45:00'),
      ocrConfidence: 93,
      fullData: {
        personalInfo: {
          fullNameEn: 'Sarita Poudel',
          fullNameNe: 'सरिता पौडेल',
          dobBS: '2059/07/12',
          dobAD: '2002-10-28',
          gender: 'Female',
          nationality: 'Nepali',
          education: "Bachelor's Degree (Pursuing)",
        },
        address: {
          permanent: 'Tinpaini, Ward 10, Biratnagar Metropolitan, Morang, Province 1',
          present: 'Tinpaini, Ward 10, Biratnagar Metropolitan, Morang, Province 1',
          mobile: '9867891234',
          email: 'sarita.poudel@example.com',
        },
        documents: [
          {
            type: 'Citizenship Certificate',
            number: '741-85-96321',
            issuedBy: 'Morang',
            issueDate: '2021-04-10',
            confidence: 93,
          },
        ],
        family: [
          { relation: 'Father', name: 'Bhim Poudel' },
          { relation: 'Mother', name: 'Gita Poudel' },
        ],
        income: {
          sources: ['Parents'],
          occupation: 'Student',
          annualIncome: 'NPR 100,000',
          annualTransaction: 'NPR 200,000',
        },
        compliance: {
          isGovEmployee: false,
          isPEP: false,
          isConvicted: false,
        },
        residence: {
          landlordName: 'Self-owned (Family)',
          landlordContact: 'N/A',
          landmark: 'Near Tinpaini Chowk',
        },
      },
    },
  ];

  const branches = ['all', ...Array.from(new Set(mockKYCs.map(k => k.branch)))];

  const stats = {
    total: mockKYCs.length,
    pending: mockKYCs.filter(k => k.status === 'pending').length,
    approved: mockKYCs.filter(k => k.status === 'approved').length,
    rejected: mockKYCs.filter(k => k.status === 'rejected').length,
    highRisk: mockKYCs.filter(k => k.riskLevel === 'high').length,
  };

  // Apply all filters
  let filteredKYCs = mockKYCs;

  // Status filter
  if (filterStatus !== 'all') {
    if (filterStatus === 'high-risk') {
      filteredKYCs = filteredKYCs.filter(k => k.riskLevel === 'high');
    } else {
      filteredKYCs = filteredKYCs.filter(k => k.status === filterStatus);
    }
  }

  // Branch filter
  if (filterBranch !== 'all') {
    filteredKYCs = filteredKYCs.filter(k => k.branch === filterBranch);
  }

  // Risk filter
  if (filterRisk !== 'all') {
    filteredKYCs = filteredKYCs.filter(k => k.riskLevel === filterRisk);
  }

  // Search filter
  if (searchQuery) {
    filteredKYCs = filteredKYCs.filter(k => 
      k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.mobile.includes(searchQuery)
    );
  }

  // Date filter
  if (dateFrom) {
    const fromDate = new Date(dateFrom);
    filteredKYCs = filteredKYCs.filter(k => k.submittedDate >= fromDate);
  }
  if (dateTo) {
    const toDate = new Date(dateTo);
    toDate.setHours(23, 59, 59, 999);
    filteredKYCs = filteredKYCs.filter(k => k.submittedDate <= toDate);
  }

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

  const clearAllFilters = () => {
    setFilterStatus('all');
    setFilterBranch('all');
    setFilterRisk('all');
    setSearchQuery('');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = filterStatus !== 'all' || filterBranch !== 'all' || filterRisk !== 'all' || searchQuery || dateFrom || dateTo;

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
        <div className="grid grid-cols-5 gap-4 mb-6">
          <button
            onClick={() => { setFilterStatus('all'); setFilterRisk('all'); }}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-gray-400 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-6 h-6 text-gray-600" />
              <span className="text-2xl text-gray-700">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600">Total Applications</p>
          </button>

          <button
            onClick={() => { setFilterStatus('pending'); setFilterRisk('all'); }}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-blue-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <span className="text-2xl text-blue-700">{stats.pending}</span>
            </div>
            <p className="text-sm text-gray-600">Pending Review</p>
          </button>
          
          <button
            onClick={() => { setFilterStatus('approved'); setFilterRisk('all'); }}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-green-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <FileCheck className="w-6 h-6 text-green-600" />
              <span className="text-2xl text-green-700">{stats.approved}</span>
            </div>
            <p className="text-sm text-gray-600">Approved</p>
          </button>
          
          <button
            onClick={() => { setFilterStatus('rejected'); setFilterRisk('all'); }}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-red-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="text-2xl text-red-700">{stats.rejected}</span>
            </div>
            <p className="text-sm text-gray-600">Rejected</p>
          </button>
          
          <button
            onClick={() => { setFilterStatus('all'); setFilterRisk('high'); }}
            className="bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-orange-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <span className="text-2xl text-orange-700">{stats.highRisk}</span>
            </div>
            <p className="text-sm text-gray-600">High Risk</p>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, ID, or mobile number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showFilters ? 'bg-emerald-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-4 grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Branch</label>
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>
                      {branch === 'all' ? 'All Branches' : branch}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Risk Level</label>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  From Date
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  To Date
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filterStatus !== 'all' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                  Status: {filterStatus}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterStatus('all')} />
                </span>
              )}
              {filterBranch !== 'all' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                  Branch: {filterBranch}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterBranch('all')} />
                </span>
              )}
              {filterRisk !== 'all' && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-1">
                  Risk: {filterRisk}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterRisk('all')} />
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  Search: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              {(dateFrom || dateTo) && (
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm flex items-center gap-1">
                  Date Range
                  <X className="w-3 h-3 cursor-pointer" onClick={() => { setDateFrom(''); setDateTo(''); }} />
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <strong>{filteredKYCs.length}</strong> of <strong>{mockKYCs.length}</strong> applications
          </p>
        </div>

        {/* Queue */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-900">KYC Applications</h2>
          </div>

          <div className="p-6">
            {filteredKYCs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No applications found matching your filters</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
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
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          kyc.status === 'approved' ? 'bg-green-100 text-green-700' :
                          kyc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {kyc.status.toUpperCase()}
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
                        <p className={`capitalize ${
                          kyc.status === 'approved' ? 'text-green-600' :
                          kyc.status === 'rejected' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>{kyc.status}</p>
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

                    {kyc.riskLevel === 'medium' && kyc.riskReasons && kyc.riskReasons.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-yellow-900 mb-2">Medium Risk Flags:</p>
                            <ul className="space-y-1">
                              {kyc.riskReasons.map((reason, idx) => (
                                <li key={idx} className="text-sm text-yellow-700 flex items-start gap-2">
                                  <span className="text-yellow-600">•</span>
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
            )}
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
                      {selectedKYC.riskLevel !== 'low' && selectedKYC.riskReasons && selectedKYC.riskReasons.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-amber-300">
                          <p className="text-sm text-gray-900 mb-2">Risk Flags:</p>
                          <ul className="space-y-2">
                            {selectedKYC.riskReasons.map((reason, idx) => (
                              <li key={idx} className={`text-xs flex items-start gap-2 p-2 rounded border ${
                                selectedKYC.riskLevel === 'high' 
                                  ? 'text-red-700 bg-red-50 border-red-200'
                                  : 'text-yellow-700 bg-yellow-50 border-yellow-200'
                              }`}>
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
                        <p className={`capitalize ${
                          selectedKYC.status === 'approved' ? 'text-green-600' :
                          selectedKYC.status === 'rejected' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>{selectedKYC.status}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {selectedKYC.status === 'pending' && (
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
                  )}
                  {selectedKYC.status !== 'pending' && (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-lg border-2 ${
                        selectedKYC.status === 'approved' 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <p className={`text-sm text-center ${
                          selectedKYC.status === 'approved' ? 'text-green-700' : 'text-red-700'
                        }`}>
                          This application has been {selectedKYC.status}
                        </p>
                      </div>
                      <button
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
