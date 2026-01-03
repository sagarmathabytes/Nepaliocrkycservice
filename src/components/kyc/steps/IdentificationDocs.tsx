import { useState } from 'react';
import { ArrowRight, ArrowLeft, Camera, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { KYCData, DocumentData } from '../KYCWizard';

interface IdentificationDocsProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function IdentificationDocs({ data, onNext, onBack }: IdentificationDocsProps) {
  const [documents, setDocuments] = useState<DocumentData[]>(data.documents || [
    {
      type: 'citizenship',
      number: '123-45-67890',
      issuedBy: 'Kathmandu',
      issueDate: '2020-01-15',
      confidence: 0.95,
      image: 'captured',
    }
  ]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);
  const [noNID, setNoNID] = useState(false);
  const [noPAN, setNoPAN] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ documents });
  };

  const handleCapture = (type: string) => {
    // Simulate OCR capture
    const mockDoc: DocumentData = {
      type,
      number: type === 'citizenship' ? '123-45-67890' : 'AUTO-EXTRACTED',
      issuedBy: 'Kathmandu',
      issueDate: '2020-01-15',
      expiryDate: type === 'passport' ? '2030-01-15' : undefined,
      confidence: Math.random() * 0.2 + 0.8, // 80-100%
      image: 'captured',
    };
    
    setDocuments([...documents, mockDoc]);
    setSelectedDoc(mockDoc);
  };

  const updateDocument = (index: number, field: keyof DocumentData, value: any) => {
    const updated = [...documents];
    updated[index] = { ...updated[index], [field]: value };
    setDocuments(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Identification Documents</h2>
        <p className="text-sm text-gray-600">
          Capture your government-issued ID documents. Our AI will automatically extract information.
        </p>
      </div>

      <div className="space-y-6">
        {/* Document Type Selection */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-sm text-gray-900 mb-3">Select Document to Capture</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleCapture('citizenship')}
              className="px-4 py-3 bg-white border-2 border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors text-left"
            >
              <p className="text-sm text-gray-900">Citizenship Certificate</p>
              <p className="text-xs text-gray-600 mt-1">नागरिकता प्रमाणपत्र</p>
            </button>
            
            <button
              type="button"
              onClick={() => handleCapture('national-id')}
              disabled={noNID}
              className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="text-sm text-gray-900">National ID Card</p>
              <p className="text-xs text-gray-600 mt-1">राष्ट्रिय परिचय पत्र</p>
            </button>
            
            <button
              type="button"
              onClick={() => handleCapture('passport')}
              className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <p className="text-sm text-gray-900">Passport</p>
              <p className="text-xs text-gray-600 mt-1">राहदानी</p>
            </button>
            
            <button
              type="button"
              onClick={() => handleCapture('pan')}
              disabled={noPAN}
              className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="text-sm text-gray-900">PAN Card</p>
              <p className="text-xs text-gray-600 mt-1">स्थायी लेखा नम्बर</p>
            </button>
            
            <button
              type="button"
              onClick={() => handleCapture('license')}
              className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <p className="text-sm text-gray-900">Driving License</p>
              <p className="text-xs text-gray-600 mt-1">चालक अनुमतिपत्र</p>
            </button>
          </div>

          <div className="flex gap-4 mt-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={noNID}
                onChange={(e) => setNoNID(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-xs text-gray-700">Haven't received NID till date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={noPAN}
                onChange={(e) => setNoPAN(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
              <span className="text-xs text-gray-700">Haven't received PAN till date</span>
            </label>
          </div>
        </div>

        {/* Captured Documents */}
        {documents.map((doc, index) => (
          <div key={index} className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span className="text-sm text-gray-900 capitalize">{doc.type.replace('-', ' ')}</span>
                {doc.confidence && doc.confidence > 0.9 ? (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    High Confidence ({Math.round(doc.confidence * 100)}%)
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Verify Accuracy ({Math.round((doc.confidence || 0.5) * 100)}%)
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 p-6">
              {/* Document Preview */}
              <div className="md:col-span-1">
                <div className="aspect-[3/2] bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Document Image</p>
                  </div>
                </div>
              </div>

              {/* Extracted Fields */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">ID Number <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={doc.number || ''}
                      onChange={(e) => updateDocument(index, 'number', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Issued By <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={doc.issuedBy || ''}
                      onChange={(e) => updateDocument(index, 'issuedBy', e.target.value)}
                      placeholder="District / Authority"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Issue Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      value={doc.issueDate || ''}
                      onChange={(e) => updateDocument(index, 'issueDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  {doc.type === 'passport' || doc.type === 'license' ? (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="date"
                        value={doc.expiryDate || ''}
                        onChange={(e) => updateDocument(index, 'expiryDate', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No documents captured yet</p>
            <p className="text-sm mt-1">Click a button above to capture a document</p>
          </div>
        )}
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
          disabled={documents.length === 0}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}