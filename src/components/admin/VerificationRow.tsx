import { Clock, AlertTriangle } from 'lucide-react';
import { Verification } from './AdminDashboard';

interface VerificationRowProps {
  verification: Verification;
  onClick: () => void;
  isSelected: boolean;
}

export function VerificationRow({ verification, onClick, isSelected }: VerificationRowProps) {
  const getElapsedTime = () => {
    const minutes = Math.floor((Date.now() - verification.submittedAt.getTime()) / 60000);
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const isSlaBreached = () => {
    const elapsed = Math.floor((Date.now() - verification.submittedAt.getTime()) / 60000);
    return elapsed > verification.slaMinutes;
  };

  const statusColors = {
    pending: 'bg-blue-100 text-blue-700',
    'needs-review': 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const riskColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  const documentLabels = {
    citizenship: 'Citizenship',
    'national-id': 'National ID',
    license: 'Driving License',
  };

  const breached = isSlaBreached();

  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 hover:bg-gray-50 transition-colors text-left ${
        isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
      }`}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Verification ID */}
        <div className="col-span-2">
          <p className="text-sm text-gray-900">{verification.id}</p>
          <p className="text-xs text-gray-500">{verification.userId}</p>
        </div>

        {/* Customer */}
        <div className="col-span-2">
          <p className="text-sm text-gray-900">{verification.userName}</p>
          {verification.assignedTo && (
            <p className="text-xs text-gray-500">Assigned: {verification.assignedTo}</p>
          )}
        </div>

        {/* Institution */}
        <div className="col-span-2">
          <p className="text-sm text-gray-900">{verification.institution}</p>
        </div>

        {/* Document Type */}
        <div className="col-span-2">
          <p className="text-sm text-gray-900">{documentLabels[verification.documentType]}</p>
        </div>

        {/* Risk Level */}
        <div className="col-span-1">
          <span className={`inline-flex px-2 py-1 rounded text-xs ${riskColors[verification.riskLevel]}`}>
            {verification.riskLevel.toUpperCase()}
          </span>
        </div>

        {/* Status */}
        <div className="col-span-1">
          <span className={`inline-flex px-2 py-1 rounded text-xs ${statusColors[verification.status]}`}>
            {verification.status === 'needs-review' ? 'Review' : verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
          </span>
        </div>

        {/* SLA Timer */}
        <div className="col-span-2">
          <div className={`flex items-center gap-2 ${breached ? 'text-red-600' : 'text-gray-700'}`}>
            {breached ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <div>
              <p className="text-sm">{getElapsedTime()}</p>
              <p className="text-xs text-gray-500">SLA: {verification.slaMinutes}m</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
