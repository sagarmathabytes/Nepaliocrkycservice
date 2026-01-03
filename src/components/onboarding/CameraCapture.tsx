import { useState } from 'react';
import { Camera, RotateCcw, Info } from 'lucide-react';
import { Language, DocumentType } from './OnboardingFlow';
import { ProgressBar } from './ProgressBar';

interface CameraCaptureProps {
  language: Language;
  documentType: DocumentType;
  onCapture: (imageData: string) => void;
}

const content = {
  en: {
    title: 'Capture Your Document',
    subtitle: 'Position document within the frame',
    tips: [
      'Place document on a flat surface',
      'Ensure good lighting',
      'Avoid glare and shadows',
      'Keep text clearly visible',
    ],
    button: 'Capture Photo',
    retake: 'Retake',
  },
  ne: {
    title: 'आफ्नो कागजात खिच्नुहोस्',
    subtitle: 'कागजातलाई फ्रेम भित्र राख्नुहोस्',
    tips: [
      'कागजातलाई समतल सतहमा राख्नुहोस्',
      'राम्रो प्रकाश सुनिश्चित गर्नुहोस्',
      'चमक र छाया बच्नुहोस्',
      'पाठ स्पष्ट रूपमा देखिने गरी राख्नुहोस्',
    ],
    button: 'फोटो खिच्नुहोस्',
    retake: 'फेरि खिच्नुहोस्',
  },
};

export function CameraCapture({ language, documentType, onCapture }: CameraCaptureProps) {
  const t = content[language];
  const [captured, setCaptured] = useState(false);

  const handleCapture = () => {
    // Simulate camera capture with a placeholder
    const mockImageData = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTdhM2IwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2FwdHVyZWQgRG9jdW1lbnQ8L3RleHQ+PC9zdmc+';
    setCaptured(true);
    onCapture(mockImageData);
  };

  const handleRetake = () => {
    setCaptured(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <ProgressBar currentStep={2} totalSteps={4} />
      
      <div className="flex-1 flex flex-col px-6 py-8 max-w-md mx-auto w-full">
        <div className="mb-6 text-white">
          <h1 className="mb-2">{t.title}</h1>
          <p className="text-gray-300">{t.subtitle}</p>
        </div>

        {/* Camera View with Frame Guide */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-full aspect-[4/3] max-h-[400px]">
            {/* Camera viewport */}
            <div className="absolute inset-0 bg-gray-800 rounded-2xl overflow-hidden">
              {captured ? (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <div className="w-4/5 h-3/4 bg-gray-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Camera className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Camera preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Frame guide overlay */}
            {!captured && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-4/5 h-3/4">
                  {/* Corner guides */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-sm bg-black/50 px-3 py-2 rounded-lg">
                      {t.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <ul className="space-y-2">
                {t.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Capture Button */}
        <div className="space-y-3">
          {!captured ? (
            <button
              onClick={handleCapture}
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              {t.button}
            </button>
          ) : (
            <button
              onClick={handleRetake}
              className="w-full bg-gray-700 text-white py-4 rounded-xl hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              {t.retake}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
