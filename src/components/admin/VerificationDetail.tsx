import { useState } from 'react';
import { X, CheckCircle, XCircle, MessageSquare, FileText, Clock, User } from 'lucide-react';
import { Verification } from './AdminDashboard';

interface VerificationDetailProps {
  verification: Verification;
  onClose: () => void;
  onStatusChange: (id: string, status: Verification['status'], note?: string) => void;
}

export function VerificationDetail({ verification, onClose, onStatusChange }: VerificationDetailProps) {
  const [activeTab, setActiveTab] = useState<'document' | 'notes' | 'audit'>('document');
  const [note, setNote] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = () => {
    onStatusChange(verification.id, 'approved', 'Approved after manual review');
    onClose();
  };

  const handleReject = () => {
    if (rejectReason.trim()) {
      onStatusChange(verification.id, 'rejected', rejectReason);
      setShowRejectDialog(false);
      onClose();
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      onStatusChange(verification.id, verification.status, note);
      setNote('');
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900">Verification Details</h2>
            <p className="text-sm text-gray-600">{verification.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Left Column - Document and Data */}
            <div className="col-span-2 space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm text-gray-700 mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Name</p>
                    <p className="text-sm text-gray-900">{verification.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">User ID</p>
                    <p className="text-sm text-gray-900">{verification.userId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Institution</p>
                    <p className="text-sm text-gray-900">{verification.institution}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Submitted</p>
                    <p className="text-sm text-gray-900">{formatTimestamp(verification.submittedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-4 border-b border-gray-200 mb-4">
                  <button
                    onClick={() => setActiveTab('document')}
                    className={`pb-2 px-1 border-b-2 transition-colors ${
                      activeTab === 'document'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Document & Data
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`pb-2 px-1 border-b-2 transition-colors ${
                      activeTab === 'notes'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Notes ({verification.notes?.length || 0})
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className={`pb-2 px-1 border-b-2 transition-colors ${
                      activeTab === 'audit'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Audit Log
                    </span>
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'document' && (
                  <div className="space-y-4">
                    {/* Document Image */}
                    <div className="bg-gray-900 rounded-lg p-4 aspect-[3/2] flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <FileText className="w-16 h-16 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Document Preview</p>
                        <p className="text-xs mt-1">Citizenship Certificate</p>
                      </div>
                    </div>

                    {/* Extracted Data */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm text-gray-700 mb-3">Extracted Data</h3>
                      <div className="space-y-3">
                        {verification.extractedData && Object.entries(verification.extractedData).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-sm text-gray-900">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Confidence */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-900">AI Confidence Score</span>
                        <span className="text-sm text-blue-900">98.5%</span>
                      </div>
                      <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '98.5%' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {/* Add Note */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add a note..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                        rows={3}
                      />
                      <button
                        onClick={handleAddNote}
                        disabled={!note.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add Note
                      </button>
                    </div>

                    {/* Notes List */}
                    <div className="space-y-3">
                      {verification.notes && verification.notes.length > 0 ? (
                        verification.notes.map(note => (
                          <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-900">{note.author}</span>
                                  <span className="text-xs text-gray-500">{formatTimestamp(note.timestamp)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{note.text}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-8">No notes yet</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'audit' && (
                  <div className="space-y-3">
                    {verification.auditLog && verification.auditLog.length > 0 ? (
                      verification.auditLog.map((log, index) => (
                        <div key={log.id} className="relative pl-6 pb-4">
                          {index !== verification.auditLog!.length - 1 && (
                            <div className="absolute left-2 top-6 bottom-0 w-px bg-gray-200"></div>
                          )}
                          <div className="absolute left-0 top-1 w-4 h-4 bg-blue-600 rounded-full"></div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-900">{log.action}</span>
                              <span className="text-xs text-gray-500">{formatTimestamp(log.timestamp)}</span>
                            </div>
                            <p className="text-xs text-gray-600">by {log.user}</p>
                            {log.details && (
                              <p className="text-sm text-gray-700 mt-2">{log.details}</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-8">No audit log available</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Actions and Info */}
            <div className="space-y-6">
              {/* Status and Risk */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Current Status</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    verification.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                    verification.status === 'needs-review' ? 'bg-orange-100 text-orange-700' :
                    verification.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    verification.riskLevel === 'low' ? 'bg-green-100 text-green-700' :
                    verification.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {verification.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {(verification.status === 'pending' || verification.status === 'needs-review') && (
                <div className="space-y-3">
                  <button
                    onClick={handleApprove}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Verification
                  </button>
                  <button
                    onClick={() => setShowRejectDialog(true)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Verification
                  </button>
                </div>
              )}

              {/* Quick Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
                <h3 className="text-gray-700 mb-3">Quick Info</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Document Type:</span>
                  <span className="text-gray-900 capitalize">{verification.documentType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="text-gray-900">{formatTimestamp(verification.submittedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SLA:</span>
                  <span className="text-gray-900">{verification.slaMinutes} minutes</span>
                </div>
                {verification.assignedTo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned To:</span>
                    <span className="text-gray-900">{verification.assignedTo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-gray-900 mb-4">Reject Verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejection. This will be sent to the customer.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              rows={4}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
