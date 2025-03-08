'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { colors, spacing, borderRadius } from '@/lib/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${colors.moss};
        color: ${colors.white};
        border: 1px solid ${colors.moss};
        
        &:hover:not(:disabled) {
          background-color: ${colors.moss80};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${colors.sun};
        color: ${colors.black};
        border: 1px solid ${colors.sun};
        
        &:hover:not(:disabled) {
          background-color: ${colors.honey};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${colors.moss};
        border: 1px solid ${colors.moss};
        
        &:hover:not(:disabled) {
          background-color: ${colors.moss20};
        }
      `;
    case 'danger':
      return css`
        background-color: ${colors.error};
        color: ${colors.white};
        border: 1px solid ${colors.error};
        
        &:hover:not(:disabled) {
          background-color: #b71c1c;
        }
      `;
    case 'success':
      return css`
        background-color: ${colors.grass};
        color: ${colors.white};
        border: 1px solid ${colors.grass};
        
        &:hover:not(:disabled) {
          background-color: #2e7d32;
        }
      `;
    default:
      return css`
        background-color: ${colors.moss};
        color: ${colors.white};
        border: 1px solid ${colors.moss};
        
        &:hover:not(:disabled) {
          background-color: ${colors.moss80};
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${spacing.xsmall} ${spacing.small};
        font-size: 0.875rem;
      `;
    case 'medium':
      return css`
        padding: ${spacing.small} ${spacing.base};
        font-size: 1rem;
      `;
    case 'large':
      return css`
        padding: ${spacing.base} ${spacing.medium};
        font-size: 1.125rem;
      `;
    default:
      return css`
        padding: ${spacing.small} ${spacing.base};
        font-size: 1rem;
      `;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border-radius: ${borderRadius.small};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}
  
  /* Full width style */
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  
  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Loading state */
  ${({ $isLoading }) =>
    $isLoading &&
    css`
      color: transparent;
      pointer-events: none;
      
      &::after {
        content: '';
        position: absolute;
        width: 1.2em;
        height: 1.2em;
        top: 50%;
        left: 50%;
        margin: -0.6em 0 0 -0.6em;
        border-radius: 50%;
        border: 2px solid currentColor;
        border-color: ${colors.white} transparent ${colors.white} transparent;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}
`;

// Create the Button component with forwardRef for better accessibility
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'medium', fullWidth = false, isLoading = false, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $isLoading={isLoading}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 