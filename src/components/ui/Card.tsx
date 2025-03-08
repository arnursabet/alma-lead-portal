'use client';

import React, { HTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const StyledCard = styled.div<Omit<CardProps, 'children'>>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'outlined':
        return css`
          border: 1px solid ${theme.colors.border};
        `;
      case 'elevated':
        return css`
          box-shadow: ${theme.shadows.large};
        `;
      default: // default
        return css`
          box-shadow: ${theme.shadows.small};
        `;
    }
  }}
  
  /* Padding styles */
  ${({ padding, theme }) => {
    switch (padding) {
      case 'none':
        return css`
          padding: 0;
        `;
      case 'small':
        return css`
          padding: ${theme.spacing.small};
        `;
      case 'large':
        return css`
          padding: ${theme.spacing.xlarge};
        `;
      default: // medium
        return css`
          padding: ${theme.spacing.medium};
        `;
    }
  }}
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.medium} ${theme.spacing.medium}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.large};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => `${theme.spacing.medium} ${theme.spacing.medium}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
`;

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  fullWidth = false,
  ...props
}: CardProps) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 