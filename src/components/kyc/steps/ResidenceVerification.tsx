import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { KYCData } from '../KYCWizard';

interface ResidenceVerificationProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function ResidenceVerification({ data, onNext, onBack }: ResidenceVerificationProps) {
  const [landlordName, setLandlordName] = useState('');
  const [landlordPhone, setLandlordPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext({ landlordName, landlordPhone, address }); }} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Residence Verification</h2>
        <p className="text-sm text-gray-600">Landlord details and location verification</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landlordName">
          Landlord Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="landlordName"
          type="text"
          value={landlordName}
          onChange={(e) => setLandlordName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="landlordPhone">
          Landlord Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="landlordPhone"
          type="text"
          value={landlordPhone}
          onChange={(e) => setLandlordPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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