import { Zap, Shield, Languages, CloudCog, TrendingUp, Lock } from 'lucide-react';

const features = [
  {
    icon: Languages,
    title: 'Nepali Script OCR',
    description: 'Advanced AI trained specifically on Devanagari script and Nepali government document formats.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process documents in under 3 seconds. Reduce customer onboarding from days to minutes.',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'SOC 2 compliant with end-to-end encryption. Data processed locally in Nepal data centers.',
  },
  {
    icon: CloudCog,
    title: 'Multiple Integration Options',
    description: 'Mobile SDK, REST API, or on-premise deployment. Choose what works for your infrastructure.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Learning',
    description: 'AI model improves with every scan. Get better accuracy over time with automatic updates.',
  },
  {
    icon: Lock,
    title: 'Compliance Ready',
    description: 'Built to meet Nepal Rastra Bank regulations and data localization requirements.',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Why Choose NepalKYC AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Purpose-built for Nepal's unique requirements. From citizenship papers to driving licenses, we handle it all.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
