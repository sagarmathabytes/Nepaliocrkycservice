import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <div className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-6">
          Ready to Transform Your KYC Process?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Join leading banks, fintechs, and government services already using NepalKYC AI. Get started with a free trial today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            Start Free 30-Day Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
            Schedule a Demo
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-3xl text-white mb-2">50+</p>
            <p className="text-sm text-blue-200">Active Partners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-white mb-2">500K+</p>
            <p className="text-sm text-blue-200">Documents Processed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl text-white mb-2">99.2%</p>
            <p className="text-sm text-blue-200">Avg. Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
