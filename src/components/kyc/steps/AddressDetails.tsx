import { useState } from 'react';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import { KYCData, AddressData } from '../KYCWizard';

interface AddressDetailsProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function AddressDetails({ data, onNext, onBack }: AddressDetailsProps) {
  const [sameAsPermament, setSameAsPermament] = useState(data.sameAsPermament || false);
  const [formData, setFormData] = useState({
    permanentAddress: data.permanentAddress || {
      houseNo: '123',
      tole: 'Thamel',
      ward: '26',
      municipality: 'Kathmandu Metropolitan',
      district: 'Kathmandu',
      province: 'Bagmati'
    },
    presentAddress: data.presentAddress || {
      houseNo: '123',
      tole: 'Thamel',
      ward: '26',
      municipality: 'Kathmandu Metropolitan',
      district: 'Kathmandu',
      province: 'Bagmati'
    },
    mailingAddress: data.mailingAddress || {},
    residenceTel: data.residenceTel || '01-4567890',
    officeTel: data.officeTel || '01-4567891',
    mobile: data.mobile || '9841234567',
    email: data.email || 'ram.tamang@example.com',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ ...formData, sameAsPermament });
  };

  const updateAddress = (type: 'permanentAddress' | 'presentAddress' | 'mailingAddress', field: keyof AddressData, value: string) => {
    setFormData({
      ...formData,
      [type]: { ...formData[type], [field]: value }
    });
  };

  const handleSameAsPermament = (checked: boolean) => {
    setSameAsPermament(checked);
    if (checked) {
      setFormData({ ...formData, presentAddress: formData.permanentAddress });
    }
  };

  const renderAddressFields = (
    type: 'permanentAddress' | 'presentAddress' | 'mailingAddress',
    title: string,
    optional: boolean = false
  ) => (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-gray-900 mb-4">
        {title}
        {optional && <span className="text-sm text-gray-500 ml-2">(Optional)</span>}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">House No.</label>
          <input
            type="text"
            value={(formData[type] as AddressData).houseNo || ''}
            onChange={(e) => updateAddress(type, 'houseNo', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Tole / Street</label>
          <input
            type="text"
            value={(formData[type] as AddressData).tole || ''}
            onChange={(e) => updateAddress(type, 'tole', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Ward No. {!optional && <span className="text-red-500">*</span>}</label>
          <input
            type="text"
            value={(formData[type] as AddressData).ward || ''}
            onChange={(e) => updateAddress(type, 'ward', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Municipality / Rural Municipality {!optional && <span className="text-red-500">*</span>}</label>
          <input
            type="text"
            value={(formData[type] as AddressData).municipality || ''}
            onChange={(e) => updateAddress(type, 'municipality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">District {!optional && <span className="text-red-500">*</span>}</label>
          <select
            value={(formData[type] as AddressData).district || ''}
            onChange={(e) => updateAddress(type, 'district', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select district</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Pokhara">Pokhara</option>
            <option value="Chitwan">Chitwan</option>
            <option value="Morang">Morang</option>
            <option value="Rupandehi">Rupandehi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Province {!optional && <span className="text-red-500">*</span>}</label>
          <select
            value={(formData[type] as AddressData).province || ''}
            onChange={(e) => updateAddress(type, 'province', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select province</option>
            <option value="Koshi">Koshi</option>
            <option value="Madhesh">Madhesh</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="Sudurpashchim">Sudurpashchim</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-600" />
          Address Details
        </h2>
        <p className="text-sm text-gray-600">
          Provide your permanent, present, and mailing addresses
        </p>
      </div>

      <div className="space-y-6">
        {/* Permanent Address */}
        {renderAddressFields('permanentAddress', 'Permanent Address')}

        {/* Present Address */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Present Address</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsPermament}
                onChange={(e) => handleSameAsPermament(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">Same as Permanent</span>
            </label>
          </div>
          {!sameAsPermament && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">House No.</label>
                <input
                  type="text"
                  value={(formData.presentAddress as AddressData).houseNo || ''}
                  onChange={(e) => updateAddress('presentAddress', 'houseNo', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tole / Street</label>
                <input
                  type="text"
                  value={(formData.presentAddress as AddressData).tole || ''}
                  onChange={(e) => updateAddress('presentAddress', 'tole', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Ward No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={(formData.presentAddress as AddressData).ward || ''}
                  onChange={(e) => updateAddress('presentAddress', 'ward', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Municipality <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={(formData.presentAddress as AddressData).municipality || ''}
                  onChange={(e) => updateAddress('presentAddress', 'municipality', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">District <span className="text-red-500">*</span></label>
                <select
                  required
                  value={(formData.presentAddress as AddressData).district || ''}
                  onChange={(e) => updateAddress('presentAddress', 'district', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select district</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Lalitpur">Lalitpur</option>
                  <option value="Bhaktapur">Bhaktapur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Province <span className="text-red-500">*</span></label>
                <select
                  value={(formData.presentAddress as AddressData).province || ''}
                  onChange={(e) => updateAddress('presentAddress', 'province', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select province</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Lumbini">Lumbini</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Mailing Address */}
        {renderAddressFields('mailingAddress', 'Mailing / Correspondence Address', true)}

        {/* Contact Details */}
        <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
          <h3 className="text-gray-900 mb-4">Contact Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Residence Telephone</label>
              <input
                type="tel"
                value={formData.residenceTel}
                onChange={(e) => setFormData({ ...formData, residenceTel: e.target.value })}
                placeholder="01-XXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Office Telephone</label>
              <input
                type="tel"
                value={formData.officeTel}
                onChange={(e) => setFormData({ ...formData, officeTel: e.target.value })}
                placeholder="01-XXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="98XXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
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