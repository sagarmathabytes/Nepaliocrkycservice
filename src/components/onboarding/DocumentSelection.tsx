import { FileText, CreditCard, Car } from 'lucide-react';
import { Language, DocumentType } from './OnboardingFlow';
import { ProgressBar } from './ProgressBar';

interface DocumentSelectionProps {
  language: Language;
  onSelect: (docType: DocumentType) => void;
}

const content = {
  en: {
    title: 'Select Your Document',
    subtitle: 'Choose the government ID you want to verify',
    documents: [
      {
        type: 'citizenship' as DocumentType,
        icon: FileText,
        title: 'Citizenship Certificate',
        titleNe: 'नागरिकता प्रमाणपत्र',
        description: 'Government issued citizenship',
      },
      {
        type: 'national-id' as DocumentType,
        icon: CreditCard,
        title: 'National ID Card',
        titleNe: 'राष्ट्रिय परिचय पत्र',
        description: 'Smart card national identity',
      },
      {
        type: 'license' as DocumentType,
        icon: Car,
        title: 'Driving License',
        titleNe: 'सवारी चालक अनुमतिपत्र',
        description: 'Valid driving license',
      },
    ],
    tip: 'Make sure your document is valid and not expired',
  },
  ne: {
    title: 'आफ्नो कागजात छान्नुहोस्',
    subtitle: 'तपाईंले प्रमाणित गर्न चाहनुभएको सरकारी परिचय पत्र छान्नुहोस्',
    documents: [
      {
        type: 'citizenship' as DocumentType,
        icon: FileText,
        title: 'नागरिकता प्रमाणपत्र',
        titleNe: 'Citizenship Certificate',
        description: 'सरकार द्वारा जारी नागरिकता',
      },
      {
        type: 'national-id' as DocumentType,
        icon: CreditCard,
        title: 'राष्ट्रिय परिचय पत्र',
        titleNe: 'National ID Card',
        description: 'स्मार्ट कार्ड राष्ट्रिय परिचय',
      },
      {
        type: 'license' as DocumentType,
        icon: Car,
        title: 'सवारी चालक अनुमतिपत्र',
        titleNe: 'Driving License',
        description: 'मान्य चालक अनुमतिपत्र',
      },
    ],
    tip: 'सुनिश्चित गर्नुहोस् कि तपाईंको कागजात मान्य छ र म्याद समाप्त भएको छैन',
  },
};

export function DocumentSelection({ language, onSelect }: DocumentSelectionProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProgressBar currentStep={1} totalSteps={4} />
      
      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <div className="mb-8">
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="space-y-4 mb-6">
          {t.documents.map((doc) => (
            <button
              key={doc.type}
              onClick={() => onSelect(doc.type)}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <doc.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{doc.titleNe}</p>
                  <p className="text-sm text-gray-600">{doc.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900">{t.tip}</p>
        </div>
      </div>
    </div>
  );
}
