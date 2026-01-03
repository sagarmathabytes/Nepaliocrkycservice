import { useState } from 'react';
import { ArrowLeft, CheckCircle, FileText, Edit } from 'lucide-react';
import { KYCData } from '../KYCWizard';

interface ReviewDeclarationProps {
  data: KYCData;
  onBack: () => void;
}

export function ReviewDeclaration({ data, onBack }: ReviewDeclarationProps) {
  const [declarations, setDeclarations] = useState([true, true, true]);
  const [signature, setSignature] = useState('signed');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('KYC Form Submitted Successfully! In production, this would be sent to the verification queue.');
  };

  const toggleDeclaration = (index: number) => {
    const updated = [...declarations];
    updated[index] = !updated[index];
    setDeclarations(updated);
  };

  const allChecked = declarations.every(d => d);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6 text-emerald-600" />
          Review, Declaration & Signature
        </h2>
        <p className="text-sm text-gray-600">
          Please review your information and provide your declaration
        </p>
      </div>

      <div className="space-y-6">
        {/* Summary Sections */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Personal Information</h3>
            <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="text-gray-900">{data.fullNameEn || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Date of Birth</p>
              <p className="text-gray-900">{data.dobAD || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Gender</p>
              <p className="text-gray-900 capitalize">{data.gender || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Nationality</p>
              <p className="text-gray-900">{data.nationality || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Contact Information</h3>
            <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Mobile</p>
              <p className="text-gray-900">{data.mobile || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-gray-900">{data.email || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Documents</h3>
            <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="text-sm">
            <p className="text-gray-900">{data.documents?.length || 0} document(s) uploaded</p>
          </div>
        </div>

        {/* Declarations */}
        <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
          <h3 className="text-gray-900 mb-4">Declarations <span className="text-red-500">*</span></h3>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declarations[0]}
                onChange={() => toggleDeclaration(0)}
                className="w-5 h-5 mt-1 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                I hereby declare that all information provided in this form is true and correct to the best of my knowledge. म यो फारममा प्रदान गरिएको सबै जानकारी सत्य र सही छ भनी घोषणा गर्दछु।
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declarations[1]}
                onChange={() => toggleDeclaration(1)}
                className="w-5 h-5 mt-1 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                I authorize the bank to verify the information provided and conduct necessary background checks as per Nepal Rastra Bank regulations.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declarations[2]}
                onChange={() => toggleDeclaration(2)}
                className="w-5 h-5 mt-1 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">
                I understand that providing false information may result in rejection of my application and legal consequences.
              </span>
            </label>
          </div>
        </div>

        {/* Signature */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Digital Signature <span className="text-red-500">*</span></h3>
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-sm mb-2">Sign Here</p>
              <button
                type="button"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                Open Signature Pad
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Date: {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="submit"
          disabled={!allChecked}
          className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="w-5 h-5" />
          Submit KYC Form
        </button>
      </div>
    </form>
  );
}