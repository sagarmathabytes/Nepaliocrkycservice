import { CheckCircle, RotateCcw, Send } from 'lucide-react';
import { Language, DocumentType } from './OnboardingFlow';
import { ProgressBar } from './ProgressBar';

interface ReviewSubmitProps {
  language: Language;
  documentType: DocumentType;
  imageData: string | null;
  onRetake: () => void;
  onSubmit: () => void;
}

const content = {
  en: {
    title: 'Review Your Document',
    subtitle: 'Make sure the information is clear and readable',
    quality: 'Image Quality Check',
    checks: [
      { label: 'All text is visible', status: true },
      { label: 'No glare or shadows', status: true },
      { label: 'Document is complete', status: true },
      { label: 'Image is in focus', status: true },
    ],
    retake: 'Retake Photo',
    submit: 'Submit for Verification',
    note: 'Your document will be securely processed and verified within 2-5 minutes',
  },
  ne: {
    title: 'आफ्नो कागजात समीक्षा गर्नुहोस्',
    subtitle: 'सुनिश्चित गर्नुहोस् कि जानकारी स्पष्ट र पढ्न योग्य छ',
    quality: 'छवि गुणस्तर जाँच',
    checks: [
      { label: 'सबै पाठ देखिने छ', status: true },
      { label: 'कुनै चमक वा छाया छैन', status: true },
      { label: 'कागजात पूर्ण छ', status: true },
      { label: 'छवि फोकसमा छ', status: true },
    ],
    retake: 'फेरि फोटो खिच्नुहोस्',
    submit: 'प्रमाणीकरणको लागि पेश गर्नुहोस्',
    note: 'तपाईंको कागजात सुरक्षित रूपमा प्रशोधन गरिनेछ र २-५ मिनेट भित्र प्रमाणित गरिनेछ',
  },
};

export function ReviewSubmit({ language, imageData, onRetake, onSubmit }: ReviewSubmitProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProgressBar currentStep={3} totalSteps={4} />
      
      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <div className="mb-6">
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Document Preview */}
        <div className="bg-gray-100 rounded-2xl p-4 mb-6">
          <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden mb-3">
            {imageData ? (
              <img src={imageData} alt="Captured document" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">No image captured</p>
              </div>
            )}
          </div>
          <button
            onClick={onRetake}
            className="w-full bg-white text-gray-700 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {t.retake}
          </button>
        </div>

        {/* Quality Checks */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <h3 className="text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {t.quality}
          </h3>
          <div className="space-y-3">
            {t.checks.map((check, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-green-900">{check.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-900">{t.note}</p>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          {t.submit}
        </button>
      </div>
    </div>
  );
}
