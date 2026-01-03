import { Code2, Smartphone, Server } from 'lucide-react';

const integrationOptions = [
  {
    icon: Smartphone,
    title: 'Mobile SDK',
    description: 'Native iOS and Android SDKs with camera integration and real-time feedback',
    code: `// Initialize SDK
import NepalKYC from '@nepalkyc/mobile-sdk';

const kyc = new NepalKYC({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Capture and verify
const result = await kyc.scanDocument({
  type: 'citizenship',
  autoCapture: true
});`,
  },
  {
    icon: Code2,
    title: 'REST API',
    description: 'Simple HTTP endpoints for web applications and backend integrations',
    code: `// POST to /api/v1/verify
curl -X POST https://api.nepalkyc.ai/v1/verify \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "document=@citizenship.jpg" \\
  -F "type=citizenship"

// Response
{
  "success": true,
  "confidence": 0.998,
  "data": {
    "fullName": "Ram Bahadur Tamang",
    "citizenshipNumber": "123-45-67890",
    ...
  }
}`,
  },
  {
    icon: Server,
    title: 'On-Premise',
    description: 'Deploy on your own infrastructure for maximum data control and compliance',
    code: `// Docker deployment
docker run -d \\
  --name nepalkyc-server \\
  -p 8080:8080 \\
  -v /path/to/models:/models \\
  -e LICENSE_KEY=your_license \\
  nepalkyc/enterprise:latest

// Kubernetes ready with Helm charts
helm install nepalkyc ./nepalkyc-chart \\
  --set license=your_license`,
  },
];

export function Integration() {
  return (
    <div className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Integrate in Minutes
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the integration method that fits your stack. Production-ready in less than an hour.
          </p>
        </div>

        <div className="space-y-8">
          {integrationOptions.map((option) => (
            <div key={option.title} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <option.icon className="w-6 h-6" />
                    </div>
                    <h3>{option.title}</h3>
                  </div>
                  <p className="text-gray-400 text-lg mb-6">{option.description}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    View Documentation
                  </button>
                </div>

                <div className="bg-gray-950 p-6 lg:p-8 border-l border-gray-700 overflow-hidden">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{option.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
