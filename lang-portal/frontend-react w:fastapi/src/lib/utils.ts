// Format a date string to readable format
export function formatDateTime(input: string | Date): string {
    const date = typeof input === 'string' ? new Date(input) : input;
    return date.toLocaleString();
  }
  
  // Calculate percentage with fallback
  export function percent(part: number, total: number): string {
    if (!total) return '0%';
    return `${Math.round((part / total) * 100)}%`;
  }
  