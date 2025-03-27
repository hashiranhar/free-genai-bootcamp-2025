import React from 'react';

interface StatsCardProps {
  label: string;
  value: number | string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
  return (
    <div className="stats-card">
      <div className="stats-label">{label}</div>
      <div className="stats-value">{value}</div>
    </div>
  );
};

export default StatsCard;
