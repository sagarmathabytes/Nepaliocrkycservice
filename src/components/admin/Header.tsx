import { Shield, Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onViewChange?: (view: 'admin' | 'user') => void;
  currentView?: 'admin' | 'user';
}

export function Header({ onViewChange, currentView = 'admin' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">KYC Verification Center</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>

            {/* View Switcher */}
            {onViewChange && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => onViewChange('admin')}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    currentView === 'admin'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Admin View
                </button>
                <button
                  onClick={() => onViewChange('user')}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    currentView === 'user'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  User View
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-900">Sarah Chen</p>
                <p className="text-xs text-gray-500">Senior Reviewer</p>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}