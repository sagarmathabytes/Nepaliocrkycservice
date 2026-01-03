import { Shield, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { Language } from './OnboardingFlow';

interface WelcomeScreenProps {
  language: Language;
  onStart: () => void;
}

const content = {
  en: {
    title: 'Verify Your Identity',
    subtitle: 'Complete your verification in 3 simple steps',
    security: 'Your Security Matters',
    securityText: 'We use bank-level encryption to protect your personal information',
    steps: [
      'Select your government document',
      'Take a clear photo',
      'Review and submit',
    ],
    features: [
      { text: 'Safe & Secure', icon: Lock },
      { text: 'Fast Verification', icon: CheckCircle },
      { text: 'Government Approved', icon: Shield },
    ],
    button: 'Start Verification',
    consent: 'By continuing, you agree to share your document information for identity verification purposes.',
  },
  ne: {
    title: 'आफ्नो परिचय प्रमाणित गर्नुहोस्',
    subtitle: '३ सरल चरणहरूमा आफ्नो प्रमाणीकरण पूरा गर्नुहोस्',
    security: 'तपाईंको सुरक्षा महत्त्वपूर्ण छ',
    securityText: 'हामी तपाईंको व्यक्तिगत जानकारी सुरक्षित गर्न बैंक-स्तरको एन्क्रिप्शन प्रयोग गर्छौं',
    steps: [
      'आफ्नो सरकारी कागजात छान्नुहोस्',
      'स्पष्ट फोटो खिच्नुहोस्',
      'समीक्षा र पेश गर्नुहोस्',
    ],
    features: [
      { text: 'सुरक्षित र संरक्षित', icon: Lock },
      { text: 'छिटो प्रमाणीकरण', icon: CheckCircle },
      { text: 'सरकार अनुमोदित', icon: Shield },
    ],
    button: 'प्रमाणीकरण सुरु गर्नुहोस्',
    consent: 'जारी राखेर, तपाईं पहिचान प्रमाणीकरणको लागि आफ्नो कागजात जानकारी साझा गर्न सहमत हुनुहुन्छ।',
  },
};

export function WelcomeScreen({ language, onStart }: WelcomeScreenProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Security Badge */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">{t.security}</h3>
              <p className="text-sm text-gray-600">{t.securityText}</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {t.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white">{index + 1}</span>
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {t.features.map((feature) => (
            <div key={feature.text} className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 max-w-md mx-auto w-full">
        <button
          onClick={onStart}
          className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
        >
          {t.button}
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          {t.consent}
        </p>
      </div>
    </div>
  );
}
