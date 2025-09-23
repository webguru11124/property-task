import { VALIDATION_PATTERNS, FIELD_LIMITS } from '../constants/validation.constants';

export const validateNorwegianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\s+/g, '').replace(/-/g, '');
  return VALIDATION_PATTERNS.NORWEGIAN_PHONE.test(cleaned);
};

export const formatNorwegianPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('47')) {
    const number = cleaned.substring(2);
    if (number.length === 8) {
      return `+47 ${number.substring(0, 3)} ${number.substring(3, 5)} ${number.substring(5)}`;
    }
  }
  if (cleaned.length === 8) {
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5)}`;
  }
  return phone;
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.EMAIL.test(email.toLowerCase());
};

export const validateName = (name: string): boolean => {
  return (
    name.length >= FIELD_LIMITS.NAME_MIN &&
    name.length <= FIELD_LIMITS.NAME_MAX &&
    VALIDATION_PATTERNS.NAME.test(name)
  );
};

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
