import { Building2, Smartphone, Send, Globe } from 'lucide-react';

const useCases = [
  {
    icon: Building2,
    title: 'Banks & Financial Institutions',
    description: 'Accelerate account opening and loan processing. Reduce KYC verification from days to minutes.',
    benefits: ['Faster customer onboarding', 'Reduced manual errors', 'Lower operational costs', 'Compliance automation'],
  },
  {
    icon: Smartphone,
    title: 'Fintech & Digital Wallets',
    description: 'Enable instant digital wallet creation and peer-to-peer transfers with seamless KYC.',
    benefits: ['Same-day activation', 'Mobile-first integration', 'Fraud prevention', 'Real-time verification'],
  },
  {
    icon: Send,
    title: 'Remittance Providers',
    description: 'Streamline sender and recipient verification for faster, compliant money transfers.',
    benefits: ['Instant beneficiary setup', 'Cross-border compliance', 'AML screening', 'Reduced abandonment'],
  },
  {
    icon: Globe,
    title: 'Government Portals',
    description: 'Power digital identity systems for Nagarik App and other e-governance platforms.',
    benefits: ['Citizen self-service', 'Reduced queues', 'Data accuracy', 'Digital-first government'],
  },
];

export function UseCases() {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Built for Every Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From traditional banks to government services, our KYC solution scales across all sectors
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                {useCase.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
