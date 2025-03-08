'use client';

import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '@/lib/theme';

type InputElementProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaElementProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface BaseInputProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  as?: 'input' | 'textarea';
  isValid?: boolean;
}

type InputProps = BaseInputProps & (
  (BaseInputProps & { as?: 'input' } & InputElementProps) |
  (BaseInputProps & { as: 'textarea' } & TextareaElementProps)
);

const InputContainer = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.base};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: ${spacing.xsmall};
  color: ${colors.black};
`;

const baseInputStyles = `
  padding: ${spacing.base};
  font-size: 1rem;
  border: 1px solid ${colors.grey3};
  border-radius: ${borderRadius.small};
  background-color: ${colors.white};
  color: ${colors.black};
  transition: border-color 0.3s;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${colors.moss};
  }
  
  &:disabled {
    background-color: ${colors.white};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  &::placeholder {
    color: ${colors.grey4};
    opacity: 0.7;
  }
`;

const StyledInput = styled.input<{ $hasError?: boolean; $isValid?: boolean }>`
  ${baseInputStyles}
  border-color: ${({ $hasError, $isValid }) => 
    $hasError ? colors.error : $isValid ? colors.success : colors.grey3};
  
  &:focus {
    border-color: ${({ $hasError, $isValid }) => 
      $hasError ? colors.error : $isValid ? colors.success : colors.moss};
    box-shadow: 0 0 0 2px ${({ $hasError, $isValid }) => 
      $hasError ? 'rgba(211, 47, 47, 0.2)' : $isValid ? 'rgba(46, 125, 50, 0.2)' : colors.moss20};
  }
`;

const StyledTextarea = styled.textarea<{ $hasError?: boolean; $isValid?: boolean }>`
  ${baseInputStyles}
  min-height: 100px;
  resize: vertical;
  border-color: ${({ $hasError, $isValid }) => 
    $hasError ? colors.error : $isValid ? colors.success : colors.grey3};
  
  &:focus {
    border-color: ${({ $hasError, $isValid }) => 
      $hasError ? colors.error : $isValid ? colors.success : colors.moss};
    box-shadow: 0 0 0 2px ${({ $hasError, $isValid }) => 
      $hasError ? 'rgba(211, 47, 47, 0.2)' : $isValid ? 'rgba(46, 125, 50, 0.2)' : colors.moss20};
  }
`;

const ErrorText = styled.span`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: ${spacing.xsmall};
`;

const HelperText = styled.span`
  color: ${colors.grey4};
  font-size: 0.875rem;
  margin-top: ${spacing.xsmall};
`;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, fullWidth = false, helperText, id, as = 'input', isValid, ...props }, ref) => {
    // Use React's useId for stable ID generation
    const uniqueId = useId();
    const inputId = id || `input-${uniqueId}`;
    
    return (
      <InputContainer $fullWidth={fullWidth}>
        {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
        
        {as === 'textarea' ? (
          <StyledTextarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            $hasError={!!error}
            $isValid={isValid}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props as TextareaElementProps}
          />
        ) : (
          <StyledInput
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            $hasError={!!error}
            $isValid={isValid}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props as InputElementProps}
          />
        )}
        
        {error && (
          <ErrorText id={`${inputId}-error`} role="alert">{error}</ErrorText>
        )}
        
        {helperText && !error && (
          <HelperText id={`${inputId}-helper`}>{helperText}</HelperText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input; 