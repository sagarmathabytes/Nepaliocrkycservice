import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { DocumentSelection } from './DocumentSelection';
import { CameraCapture } from './CameraCapture';
import { ReviewSubmit } from './ReviewSubmit';
import { VerificationProgress } from './VerificationProgress';
import { LanguageToggle } from './LanguageToggle';

export type Language = 'en' | 'ne';
export type DocumentType = 'citizenship' | 'national-id' | 'license' | null;

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDocument, setSelectedDocument] = useState<DocumentType>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleStart = () => {
    setStep(2);
  };

  const handleDocumentSelect = (docType: DocumentType) => {
    setSelectedDocument(docType);
    setStep(3);
  };

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setStep(4);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setStep(3);
  };

  const handleSubmit = () => {
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-white">
      <LanguageToggle language={language} onToggle={setLanguage} />
      
      {step === 1 && <WelcomeScreen language={language} onStart={handleStart} />}
      {step === 2 && <DocumentSelection language={language} onSelect={handleDocumentSelect} />}
      {step === 3 && <CameraCapture language={language} documentType={selectedDocument} onCapture={handleCapture} />}
      {step === 4 && <ReviewSubmit language={language} documentType={selectedDocument} imageData={capturedImage} onRetake={handleRetake} onSubmit={handleSubmit} />}
      {step === 5 && <VerificationProgress language={language} />}
    </div>
  );
}
