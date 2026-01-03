import { useState } from 'react';
import { ArrowRight, ArrowLeft, AlertTriangle, Plus, X } from 'lucide-react';
import { KYCData, BankAccount } from '../KYCWizard';

interface ComplianceRiskProps {
  data: KYCData;
  onNext: (data: Partial<KYCData>) => void;
  onBack: () => void;
}

export function ComplianceRisk({ data, onNext, onBack }: ComplianceRiskProps) {
  const [formData, setFormData] = useState({
    isGovEmployee: data.isGovEmployee || false,
    isPEP: data.isPEP || false,
    isConvicted: data.isConvicted || false,
    convictionDetails: data.convictionDetails || '',
    hasBeneficialOwner: data.hasBeneficialOwner || false,
    hasExistingAccount: data.hasExistingAccount || false,
    existingAccountNumber: data.existingAccountNumber || '',
  });
  const [otherBankAccounts, setOtherBankAccounts] = useState<BankAccount[]>(data.otherBankAccounts || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ ...formData, otherBankAccounts });
  };

  const addBankAccount = () => {
    setOtherBankAccounts([...otherBankAccounts, { bankName: '', accountNumber: '', accountType: '' }]);
  };

  const updateBankAccount = (index: number, field: keyof BankAccount, value: string) => {
    const updated = [...otherBankAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setOtherBankAccounts(updated);
  };

  const removeBankAccount = (index: number) => {
    setOtherBankAccounts(otherBankAccounts.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-emerald-600" />
          Compliance & Risk Declarations
        </h2>
        <p className="text-sm text-gray-600">
          Answer these questions for regulatory compliance (NRB requirements)
        </p>
      </div>

      <div className="space-y-6">
        {/* Risk Questions */}
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
          <h3 className="text-gray-900 mb-4">Regulatory Questions</h3>
          
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex-1">
                <p className="text-sm text-gray-900">Are you a government employee or dignitary?</p>
                <p className="text-xs text-gray-600 mt-1">सरकारी कर्मचारी वा महत्त्वपूर्ण व्यक्ति</p>
              </div>
              <div className="flex gap-3 ml-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="govEmployee"
                    checked={formData.isGovEmployee === true}
                    onChange={() => setFormData({ ...formData, isGovEmployee: true })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="govEmployee"
                    checked={formData.isGovEmployee === false}
                    onChange={() => setFormData({ ...formData, isGovEmployee: false })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex-1">
                <p className="text-sm text-gray-900">Are you a politically exposed person (PEP)?</p>
                <p className="text-xs text-gray-600 mt-1">राजनीतिक रूपमा उजागर व्यक्ति</p>
              </div>
              <div className="flex gap-3 ml-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pep"
                    checked={formData.isPEP === true}
                    onChange={() => setFormData({ ...formData, isPEP: true })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="pep"
                    checked={formData.isPEP === false}
                    onChange={() => setFormData({ ...formData, isPEP: false })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Have you been convicted for any crime?</p>
                  <p className="text-xs text-gray-600 mt-1">कुनै अपराधमा दोषी ठहरिएको</p>
                </div>
                <div className="flex gap-3 ml-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="convicted"
                      checked={formData.isConvicted === true}
                      onChange={() => setFormData({ ...formData, isConvicted: true })}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="convicted"
                      checked={formData.isConvicted === false}
                      onChange={() => setFormData({ ...formData, isConvicted: false })}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
              </div>
              {formData.isConvicted && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Please explain</label>
                  <textarea
                    value={formData.convictionDetails}
                    onChange={(e) => setFormData({ ...formData, convictionDetails: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>

            <div className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex-1">
                <p className="text-sm text-gray-900">Does a beneficial owner exist for this account?</p>
                <p className="text-xs text-gray-600 mt-1">लाभकारी मालिक छ?</p>
              </div>
              <div className="flex gap-3 ml-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="beneficialOwner"
                    checked={formData.hasBeneficialOwner === true}
                    onChange={() => setFormData({ ...formData, hasBeneficialOwner: true })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="beneficialOwner"
                    checked={formData.hasBeneficialOwner === false}
                    onChange={() => setFormData({ ...formData, hasBeneficialOwner: false })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Accounts */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-gray-900 mb-4">Existing Accounts</h3>
          
          <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-gray-900">Do you have an existing account with this bank?</p>
              <div className="flex gap-3 ml-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="existingAccount"
                    checked={formData.hasExistingAccount === true}
                    onChange={() => setFormData({ ...formData, hasExistingAccount: true })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="existingAccount"
                    checked={formData.hasExistingAccount === false}
                    onChange={() => setFormData({ ...formData, hasExistingAccount: false })}
                    className="w-4 h-4 text-emerald-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
            </div>
            {formData.hasExistingAccount && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  value={formData.existingAccountNumber}
                  onChange={(e) => setFormData({ ...formData, existingAccountNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-gray-900 mb-3">Accounts with Other Banks / Financial Institutions</p>
            {otherBankAccounts.map((acc, index) => (
              <div key={index} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={acc.bankName}
                      onChange={(e) => updateBankAccount(index, 'bankName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      value={acc.accountNumber}
                      onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-700 mb-1">Type</label>
                      <select
                        value={acc.accountType}
                        onChange={(e) => updateBankAccount(index, 'accountType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="Saving">Saving</option>
                        <option value="Current">Current</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBankAccount(index)}
                      className="mt-5 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addBankAccount}
              className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
            >
              <Plus className="w-4 h-4" />
              Add Bank Account
            </button>
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