import { useState } from 'react';
import { KYCWizard } from './components/kyc/KYCWizard';
import { AdminDashboard } from './components/admin/BankAdminDashboard';
import { Shield, User } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'customer' | 'admin'>('customer');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* View Switcher */}
      <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 flex overflow-hidden">
        <button
          onClick={() => setActiveView('customer')}
          className={`px-6 py-3 transition-colors flex items-center gap-2 ${
            activeView === 'customer'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Customer KYC</span>
        </button>
        <button
          onClick={() => setActiveView('admin')}
          className={`px-6 py-3 transition-colors flex items-center gap-2 ${
            activeView === 'admin'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Shield className="w-5 h-5" />
          <span>Bank Dashboard</span>
        </button>
      </div>

      {/* Content */}
      {activeView === 'customer' ? <KYCWizard /> : <AdminDashboard />}
    </div>
  );
}
