import { useState } from 'react';
import { ArrowRight, ArrowLeft, Camera, HelpCircle } from 'lucide-react';
import { KYCData } from '../KYCWizard';

interface PersonalInfoProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
  isFirstStep: boolean;
}

export function PersonalInfo({ data, onNext, isFirstStep }: PersonalInfoProps) {
  const [formData, setFormData] = useState({
    fullNameEn: data.fullNameEn || 'Ram Bahadur Tamang',
    fullNameNe: data.fullNameNe || 'राम बहादुर तामाङ',
    dobBS: data.dobBS || '2055/03/15',
    dobAD: data.dobAD || '1998-07-01',
    gender: data.gender || 'male',
    nationality: data.nationality || 'Nepali',
    education: data.education || "Bachelor's Degree",
    photograph: data.photograph || 'captured',
    branch: data.branch || 'Kathmandu Main',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleCapture = () => {
    // Simulate photo capture
    setFormData({ ...formData, photograph: 'captured' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Personal Information</h2>
        <p className="text-sm text-gray-600">
          Please provide your personal details as they appear on your official documents
        </p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Full Name (English) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullNameEn}
              onChange={(e) => setFormData({ ...formData, fullNameEn: e.target.value })}
              placeholder="As per citizenship / passport"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              पूरा नाम (नेपालीमा)
              <button type="button" className="ml-2 text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-4 h-4 inline" />
              </button>
            </label>
            <input
              type="text"
              value={formData.fullNameNe}
              onChange={(e) => setFormData({ ...formData, fullNameNe: e.target.value })}
              placeholder="वैकल्पिक"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Date of Birth (BS) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.dobBS}
              onChange={(e) => setFormData({ ...formData, dobBS: e.target.value })}
              placeholder="YYYY/MM/DD (e.g., 2055/03/15)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Bikram Sambat date</p>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Date of Birth (AD) <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dobAD}
              onChange={(e) => setFormData({ ...formData, dobAD: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-500 mt-1">Gregorian calendar</p>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-700 mb-3">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            {['male', 'female', 'other'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nationality & Education */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Nationality <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.nationality}
              onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Nepali">Nepali</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Education Qualification <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select qualification</option>
              <option value="Below SLC">Below SLC</option>
              <option value="SLC / SEE">SLC / SEE</option>
              <option value="+2 / Intermediate">+2 / Intermediate</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
        </div>

        {/* Branch */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Branch <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select branch</option>
            <option value="Kathmandu Main">Kathmandu Main</option>
            <option value="Thamel">Thamel</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Butwal">Butwal</option>
            <option value="Biratnagar">Biratnagar</option>
          </select>
        </div>

        {/* Photograph */}
        <div>
          <label className="block text-sm text-gray-700 mb-3">
            Photograph <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              {formData.photograph ? (
                <div className="text-center text-emerald-600">
                  <Camera className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">Photo captured</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Camera className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">No photo</p>
                </div>
              )}
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={handleCapture}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Capture Photo
              </button>
              <p className="text-xs text-gray-500 mt-2">
                • Use a clear, recent photo<br />
                • Face should be clearly visible<br />
                • Plain background preferred
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          disabled={isFirstStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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