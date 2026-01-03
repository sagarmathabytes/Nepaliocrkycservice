import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'NPR 25,000',
    period: '/month',
    description: 'Perfect for startups and small fintechs',
    features: [
      '1,000 verifications/month',
      'REST API access',
      'All document types',
      'Email support',
      '99.2% accuracy guarantee',
      'Standard SLA',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Professional',
    price: 'NPR 75,000',
    period: '/month',
    description: 'For growing banks and remittance providers',
    features: [
      '5,000 verifications/month',
      'REST API + Mobile SDK',
      'Priority processing',
      'Phone & email support',
      '99.5% accuracy guarantee',
      'Premium SLA',
      'Custom webhooks',
      'Analytics dashboard',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large institutions and government',
    features: [
      'Unlimited verifications',
      'On-premise deployment option',
      'Dedicated support team',
      'Custom model training',
      '99.8% accuracy guarantee',
      'Custom SLA',
      'White-label options',
      'Advanced security features',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

export function Pricing() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start small and scale as you grow. All plans include access to our core OCR engine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl scale-105 border-4 border-blue-500'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="text-center mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className={`mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              <div className="mb-6">
                <span className={`text-4xl ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-lg mb-8 transition-colors ${
                  plan.highlight
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      plan.highlight ? 'text-blue-200' : 'text-blue-600'
                    }`} />
                    <span className={`${plan.highlight ? 'text-blue-50' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a custom plan? <a href="#" className="text-blue-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </div>
  );
}
