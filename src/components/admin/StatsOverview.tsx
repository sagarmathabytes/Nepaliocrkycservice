import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Verification } from './AdminDashboard';

interface StatsOverviewProps {
  verifications: Verification[];
}

export function StatsOverview({ verifications }: StatsOverviewProps) {
  const stats = {
    pending: verifications.filter(v => v.status === 'pending').length,
    needsReview: verifications.filter(v => v.status === 'needs-review').length,
    approved: verifications.filter(v => v.status === 'approved').length,
    rejected: verifications.filter(v => v.status === 'rejected').length,
  };

  const cards = [
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-700',
    },
    {
      label: 'Needs Review',
      value: stats.needsReview,
      icon: AlertTriangle,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      textColor: 'text-orange-700',
    },
    {
      label: 'Approved Today',
      value: stats.approved,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      textColor: 'text-green-700',
    },
    {
      label: 'Rejected Today',
      value: stats.rejected,
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      textColor: 'text-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
            <span className={`text-3xl ${card.textColor}`}>{card.value}</span>
          </div>
          <p className="text-sm text-gray-600">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
