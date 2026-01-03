import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, Briefcase } from 'lucide-react';
import { KYCData, OccupationData } from '../KYCWizard';

interface IncomeOccupationProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function IncomeOccupation({ data, onNext, onBack }: IncomeOccupationProps) {
  const [incomeSource, setIncomeSource] = useState<string[]>(data.incomeSource || ['Salary']);
  const [occupations, setOccupations] = useState<OccupationData[]>(data.occupations || [
    { 
      institution: 'Tech Company Pvt. Ltd.', 
      nature: 'Software Development', 
      address: 'Thamel, Kathmandu', 
      position: 'Senior Developer', 
      income: '1200000' 
    }
  ]);
  const [annualTransaction, setAnnualTransaction] = useState(data.annualTransaction || '2000000');
  const [remittanceCountry, setRemittanceCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ incomeSource, occupations, annualTransaction });
  };

  const toggleIncomeSource = (source: string) => {
    setIncomeSource(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const addOccupation = () => {
    setOccupations([...occupations, { institution: '', nature: '', address: '', position: '', income: '' }]);
  };

  const updateOccupation = (index: number, field: keyof OccupationData, value: string) => {
    const updated = [...occupations];
    updated[index] = { ...updated[index], [field]: value };
    setOccupations(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-emerald-600" />
          Income, Occupation & Risk Assessment
        </h2>
        <p className="text-sm text-gray-600">
          Provide your income sources and occupation details for risk assessment
        </p>
      </div>

      <div className="space-y-6">
        {/* Source of Income */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Source of Income <span className="text-red-500">*</span></h3>
          <div className="grid md:grid-cols-2 gap-3">
            {['Business', 'Salary', 'Return on Investment', 'Remittance from abroad', 'Other'].map(source => (
              <label key={source} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-emerald-500">
                <input
                  type="checkbox"
                  checked={incomeSource.includes(source)}
                  onChange={() => toggleIncomeSource(source)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-900">{source}</span>
              </label>
            ))}
          </div>
          
          {incomeSource.includes('Remittance from abroad') && (
            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-2">
                Country of Remittance <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={remittanceCountry}
                onChange={(e) => setRemittanceCountry(e.target.value)}
                placeholder="Enter country name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Occupation Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Occupation / Business Details</h3>
          {occupations.map((occ, index) => (
            <div key={index} className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Name of Institution</label>
                  <input
                    type="text"
                    value={occ.institution}
                    onChange={(e) => updateOccupation(index, 'institution', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Nature of Occupation / Business</label>
                  <input
                    type="text"
                    value={occ.nature}
                    onChange={(e) => updateOccupation(index, 'nature', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Address of Institution</label>
                  <input
                    type="text"
                    value={occ.address}
                    onChange={(e) => updateOccupation(index, 'address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Position / Designation</label>
                  <input
                    type="text"
                    value={occ.position}
                    onChange={(e) => updateOccupation(index, 'position', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Estimated Annual Income (NPR)</label>
                  <input
                    type="text"
                    value={occ.income}
                    onChange={(e) => updateOccupation(index, 'income', e.target.value)}
                    placeholder="e.g., 1000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addOccupation}
            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600"
          >
            <Plus className="w-5 h-5" />
            Add Another Occupation
          </button>
        </div>

        {/* Annual Transaction */}
        <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
          <h3 className="text-gray-900 mb-4">Financial Projection</h3>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Annual Projected Transaction Amount (NPR) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={annualTransaction}
              onChange={(e) => setAnnualTransaction(e.target.value)}
              placeholder="e.g., 5000000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-600 mt-1">Estimated total transactions per year</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}