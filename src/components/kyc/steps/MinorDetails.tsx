import { ArrowRight, ArrowLeft } from 'lucide-react';
import { KYCData } from '../KYCWizard';

interface MinorDetailsProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function MinorDetails({ data, onNext, onBack }: MinorDetailsProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext({}); }} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Minor Details (Conditional)</h2>
        <p className="text-sm text-gray-600">Guardian and birth certificate information</p>
      </div>
      <div className="flex justify-between mt-8">
        <button type="button" onClick={onBack} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button type="submit" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
