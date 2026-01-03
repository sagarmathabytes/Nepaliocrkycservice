import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, Users } from 'lucide-react';
import { KYCData, FamilyMember } from '../KYCWizard';

interface FamilyMembersProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

const relationTypes = [
  'Spouse',
  'Father',
  'Mother',
  'Grandfather',
  'Son',
  'Daughter',
  'Daughter-in-law',
  'Father-in-law',
];

export function FamilyMembers({ data, onNext, onBack }: FamilyMembersProps) {
  const [members, setMembers] = useState<FamilyMember[]>(data.familyMembers || [
    { relation: 'Father', fullName: 'Bir Bahadur Tamang' },
    { relation: 'Mother', fullName: 'Maya Tamang' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ familyMembers: members });
  };

  const addMember = () => {
    setMembers([...members, { relation: '', fullName: '' }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof FamilyMember, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <Users className="w-6 h-6 text-emerald-600" />
          Family Members & Relationships
        </h2>
        <p className="text-sm text-gray-600">
          Add your family members as per official records
        </p>
      </div>

      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Relation <span className="text-red-500">*</span></label>
                  <select
                    value={member.relation}
                    onChange={(e) => updateMember(index, 'relation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select relation</option>
                    {relationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={member.fullName}
                    onChange={(e) => updateMember(index, 'fullName', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMember}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-600"
        >
          <Plus className="w-5 h-5" />
          Add Family Member
        </button>
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