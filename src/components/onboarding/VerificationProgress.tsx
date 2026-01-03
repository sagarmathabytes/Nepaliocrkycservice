import { useEffect, useState } from 'react';
import { CheckCircle, Shield, Sparkles } from 'lucide-react';
import { Language } from './OnboardingFlow';
import { ProgressBar } from './ProgressBar';

interface VerificationProgressProps {
  language: Language;
}

const content = {
  en: {
    title: 'Verifying Your Document',
    subtitle: 'Please wait while we process your information',
    steps: [
      'Analyzing document image',
      'Extracting information',
      'Verifying authenticity',
      'Completing verification',
    ],
    success: {
      title: 'Verification Complete!',
      subtitle: 'Your identity has been successfully verified',
      message: 'You can now access all features and services',
      button: 'Continue',
    },
  },
  ne: {
    title: 'तपाईंको कागजात प्रमाणित गर्दै',
    subtitle: 'कृपया पर्खनुहोस् जब हामी तपाईंको जानकारी प्रशोधन गर्दैछौं',
    steps: [
      'कागजात छवि विश्लेषण गर्दै',
      'जानकारी निकाल्दै',
      'प्रामाणिकता प्रमाणित गर्दै',
      'प्रमाणीकरण पूरा गर्दै',
    ],
    success: {
      title: 'प्रमाणीकरण सम्पन्न भयो!',
      subtitle: 'तपाईंको परिचय सफलतापूर्वक प्रमाणित भएको छ',
      message: 'तपाईं अब सबै सुविधाहरू र सेवाहरू पहुँच गर्न सक्नुहुन्छ',
      button: 'जारी राख्नुहोस्',
    },
  },
};

export function VerificationProgress({ language }: VerificationProgressProps) {
  const t = content[language];
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stepDuration = 1500; // 1.5 seconds per step
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < t.steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setCompleted(true), 1000);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [t.steps.length]);

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h1 className="mb-3">{t.success.title}</h1>
            <p className="text-gray-600 text-lg mb-2">{t.success.subtitle}</p>
            <p className="text-gray-500">{t.success.message}</p>
          </div>

          {/* Success Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Verification ID</p>
                  <p className="text-gray-900">VRF-2026-{Math.floor(Math.random() * 100000)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Confidence Score</p>
                  <p className="text-gray-900">99.8%</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            {t.success.button}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <ProgressBar currentStep={4} totalSteps={4} />
      
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          {/* Animated loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {t.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                index < currentStep
                  ? 'bg-green-50 border border-green-200'
                  : index === currentStep
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  index < currentStep
                    ? 'bg-green-600'
                    : index === currentStep
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : index === currentStep ? (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                ) : (
                  <span className="text-white text-sm">{index + 1}</span>
                )}
              </div>
              <p
                className={`flex-1 ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900 text-center">
            {language === 'en'
              ? 'This usually takes 2-5 minutes'
              : 'यो सामान्यतया २-५ मिनेट लाग्छ'}
          </p>
        </div>
      </div>
    </div>
  );
}
