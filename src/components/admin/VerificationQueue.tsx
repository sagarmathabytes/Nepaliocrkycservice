import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Verification } from './AdminDashboard';
import { VerificationRow } from './VerificationRow';

interface VerificationQueueProps {
  verifications: Verification[];
  onSelectVerification: (verification: Verification) => void;
  selectedId?: string;
}

export function VerificationQueue({ verifications, onSelectVerification, selectedId }: VerificationQueueProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [documentFilter, setDocumentFilter] = useState<string>('all');
  const [institutionFilter, setInstitutionFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const institutions = Array.from(new Set(verifications.map(v => v.institution)));

  // Filter verifications
  const filteredVerifications = verifications.filter(v => {
    const matchesSearch = v.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || v.riskLevel === riskFilter;
    const matchesDocument = documentFilter === 'all' || v.documentType === documentFilter;
    const matchesInstitution = institutionFilter === 'all' || v.institution === institutionFilter;

    return matchesSearch && matchesStatus && matchesRisk && matchesDocument && matchesInstitution;
  });

  // Sort by submission time (most recent first)
  const sortedVerifications = [...filteredVerifications].sort((a, b) => 
    b.submittedAt.getTime() - a.submittedAt.getTime()
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Search and Filters Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="needs-review">Needs Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Document Type</label>
              <select
                value={documentFilter}
                onChange={(e) => setDocumentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Documents</option>
                <option value="citizenship">Citizenship</option>
                <option value="national-id">National ID</option>
                <option value="license">Driving License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Institution</label>
              <select
                value={institutionFilter}
                onChange={(e) => setInstitutionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Institutions</option>
                {institutions.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Queue Header */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-600">
          <div className="col-span-2">Verification ID</div>
          <div className="col-span-2">Customer</div>
          <div className="col-span-2">Institution</div>
          <div className="col-span-2">Document</div>
          <div className="col-span-1">Risk</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">SLA Timer</div>
        </div>
      </div>

      {/* Queue Items */}
      <div className="divide-y divide-gray-200">
        {sortedVerifications.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <p>No verifications found matching your criteria</p>
          </div>
        ) : (
          sortedVerifications.map(verification => (
            <VerificationRow
              key={verification.id}
              verification={verification}
              onClick={() => onSelectVerification(verification)}
              isSelected={selectedId === verification.id}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {sortedVerifications.length} of {verifications.length} verifications
        </p>
      </div>
    </div>
  );
}
