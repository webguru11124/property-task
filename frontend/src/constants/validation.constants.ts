export const VALIDATION_PATTERNS = {
  NORWEGIAN_PHONE: /^(\+47)?[2-9]\d{7}$/,
  INTERNATIONAL_PHONE: /^\+?[1-9]\d{1,14}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NORWEGIAN_POSTAL_CODE: /^\d{4}$/,
  NAME: /^[a-zA-ZæøåÆØÅ\s\-']{2,50}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&/=]*)$/,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid Norwegian phone number (+47 XXXXXXXX)',
  INVALID_NAME: 'Please enter a valid name (2-50 characters)',
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  INVALID_POSTAL_CODE: 'Please enter a valid 4-digit postal code',
  INVALID_URL: 'Please enter a valid URL',
} as const;

export const FIELD_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  COMMENT_MAX: 500,
  PHONE_MIN: 8,
  PHONE_MAX: 15,
  ADDRESS_MAX: 100,
  CITY_MAX: 50,
} as const;
