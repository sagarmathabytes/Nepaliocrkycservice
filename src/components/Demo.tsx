import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const mockDocumentData = {
  citizenship: {
    fullName: 'राम बहादुर तामाङ',
    fullNameEn: 'Ram Bahadur Tamang',
    citizenshipNumber: '१२३-४५-६७८९०',
    citizenshipNumberEn: '123-45-67890',
    dateOfBirth: '२०४५/०३/१५',
    dateOfBirthEn: '1988/06/28',
    district: 'काठमाडौं',
    districtEn: 'Kathmandu',
    issueDate: '२०७५/०८/२०',
    issueDateEn: '2018/12/05',
  },
};

export function Demo() {
  const [uploading, setUploading] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<'citizenship' | 'license' | null>(null);

  const handleDemo = (docType: 'citizenship' | 'license') => {
    setSelectedDoc(docType);
    setUploading(true);
    setExtracted(false);
    
    setTimeout(() => {
      setUploading(false);
      setExtracted(true);
    }, 2000);
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our AI extract structured data from Nepali documents in real-time
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
            <h3 className="mb-6">Upload Document</h3>
            
            <div className="space-y-4">
              <button
                onClick={() => handleDemo('citizenship')}
                className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 rounded-xl p-6 transition-all hover:border-blue-400 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 mb-1">नागरिकता प्रमाणपत्र</p>
                    <p className="text-sm text-gray-600">Citizenship Certificate</p>
                  </div>
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
              </button>

              <button
                onClick={() => handleDemo('license')}
                className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 rounded-xl p-6 transition-all hover:border-blue-400 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 mb-1">सवारी चालक अनुमतिपत्र</p>
                    <p className="text-sm text-gray-600">Driving License</p>
                  </div>
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
              </button>
            </div>

            {uploading && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                  <span className="text-blue-900">Processing document...</span>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="mb-6">Extracted Data</h3>
            
            {!extracted && (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a document type to see extraction results</p>
                </div>
              </div>
            )}

            {extracted && selectedDoc === 'citizenship' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span>Verification complete • 99.8% confidence</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="text-gray-900">{mockDocumentData.citizenship.fullName}</p>
                    <p className="text-sm text-gray-500 mt-1">{mockDocumentData.citizenship.fullNameEn}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Citizenship Number</p>
                    <p className="text-gray-900">{mockDocumentData.citizenship.citizenshipNumber}</p>
                    <p className="text-sm text-gray-500 mt-1">{mockDocumentData.citizenship.citizenshipNumberEn}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                      <p className="text-gray-900">{mockDocumentData.citizenship.dateOfBirth}</p>
                      <p className="text-xs text-gray-500 mt-1">{mockDocumentData.citizenship.dateOfBirthEn}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">District</p>
                      <p className="text-gray-900">{mockDocumentData.citizenship.district}</p>
                      <p className="text-xs text-gray-500 mt-1">{mockDocumentData.citizenship.districtEn}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                    <p className="text-gray-900">{mockDocumentData.citizenship.issueDate}</p>
                    <p className="text-sm text-gray-500 mt-1">{mockDocumentData.citizenship.issueDateEn}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Processing time: 2.3 seconds</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
