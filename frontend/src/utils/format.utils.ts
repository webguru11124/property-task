export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const titleCase = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const formatAddress = (
  address: string,
  postalCode?: string,
  city?: string
): string => {
  const parts = [address];
  if (postalCode || city) {
    const postalCity = [postalCode, city].filter(Boolean).join(' ');
    if (postalCity) parts.push(postalCity);
  }
  return parts.join(', ');
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .filter(Boolean)
    .join('');
  return initials || '??';
};
