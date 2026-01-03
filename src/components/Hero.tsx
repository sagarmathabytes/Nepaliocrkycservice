import { ArrowRight, CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm">Powered by AI • Built for Nepal</span>
            </div>
            
            <h1 className="mb-6">
              Instant KYC Verification for Nepal's Digital Future
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              AI-powered OCR tailored for Nepali documents. Verify citizenship papers, ID cards, and driving licenses in seconds — not days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                Try Live Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                View Documentation
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">99.2% accuracy on Nepali documents</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">3-second average processing time</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-blue-100">SDK & API ready for integration</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-lg">Scan • Extract • Verify</p>
                  <p className="text-sm text-blue-200 mt-2">In real-time</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl text-white">10K+</p>
                  <p className="text-xs text-blue-200 mt-1">Documents/day</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl text-white">99.2%</p>
                  <p className="text-xs text-blue-200 mt-1">Accuracy</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-2xl text-white">3s</p>
                  <p className="text-xs text-blue-200 mt-1">Avg. time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
