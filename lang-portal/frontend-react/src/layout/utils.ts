export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculatePercentage = (part: number, total: number): string => {
  if (total === 0) return '0%';
  return `${((part / total) * 100).toFixed(2)}%`;
};
