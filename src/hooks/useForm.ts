'use client';

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

export type ValidationRule<T> = {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  custom?: (value: unknown, formValues: T) => boolean;
  errorMessage?: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T>;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  touched: { [K in keyof T]?: boolean };
  isValid: boolean;
  isDirty: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => void;
  setFieldValue: <K extends keyof T>(name: K, value: T[K]) => void;
  setFieldError: (name: keyof T, error: string) => void;
  resetForm: () => void;
}

/**
 * Custom hook for form handling with validation
 * 
 * @param initialValues - Initial form values
 * @param validationRules - Validation rules for form fields
 * @returns Form handling utilities
 */
function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});
  const [isDirty, setIsDirty] = useState(false);

  // Validate a single field
  const validateField = useCallback(
    (name: keyof T, value: unknown): string | undefined => {
      const rules = validationRules[name];
      if (!rules) return undefined;

      if (rules.required && (!value || (Array.isArray(value) && value.length === 0))) {
        return rules.errorMessage || `${String(name)} is required`;
      }

      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        return rules.errorMessage || `${String(name)} is invalid`;
      }

      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        return rules.errorMessage || `${String(name)} must be at least ${rules.minLength} characters`;
      }

      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        return rules.errorMessage || `${String(name)} must be at most ${rules.maxLength} characters`;
      }

      if (rules.min && typeof value === 'number' && value < rules.min) {
        return rules.errorMessage || `${String(name)} must be at least ${rules.min}`;
      }

      if (rules.max && typeof value === 'number' && value > rules.max) {
        return rules.errorMessage || `${String(name)} must be at most ${rules.max}`;
      }

      if (rules.custom && !rules.custom(value, values)) {
        return rules.errorMessage || `${String(name)} is invalid`;
      }

      return undefined;
    },
    [validationRules, values]
  );

  // Validate all fields
  const validateForm = useCallback((): FormErrors<T> => {
    const newErrors: FormErrors<T> = {};

    Object.keys(validationRules).forEach((key) => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    return newErrors;
  }, [validateField, validationRules, values]);

  // Handle input change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      let newValue: unknown = value;

      // Handle different input types
      if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      }

      setValues((prev) => ({ ...prev, [name]: newValue }));
      setIsDirty(true);

      // Validate field if it's been touched
      if (touched[name as keyof T]) {
        const error = validateField(name as keyof T, newValue);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Handle input blur
  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      setTouched((prev) => ({ ...prev, [name]: true }));
      
      const error = validateField(name as keyof T, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as { [K in keyof T]: boolean }
      );
      setTouched(allTouched);
      
      // Validate all fields
      const formErrors = validateForm();
      setErrors(formErrors);
      
      // Submit if no errors
      if (Object.keys(formErrors).length === 0) {
        onSubmit(values);
      }
    },
    [validateForm, values]
  );

  // Set a field value programmatically
  const setFieldValue = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [touched, validateField]);

  // Set a field error programmatically
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
  };
}

export default useForm; 