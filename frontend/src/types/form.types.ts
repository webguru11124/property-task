export interface FormField<T = unknown> {
  value: T;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: unknown) => string | undefined;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T> {
  values: T;
  errors: FormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}