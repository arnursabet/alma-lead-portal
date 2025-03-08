'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useForm from '@/hooks/useForm';
import useAuth from '@/hooks/useAuth';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FFFCE1;
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxlarge};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: #f8d7da;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, isLoading, error, login } = useAuth();
  
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit,
    setFieldError
  } = useForm<LoginFormValues & Record<string, unknown>>(
    {
      email: 'admin@example.com',
      password: 'password123',
    },
    {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: 'Please enter a valid email address',
      },
      password: {
        required: true,
        errorMessage: 'Password is required',
      },
    }
  );
  
  // Redirect to the requested page or admin/leads if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = searchParams.get('from') || '/admin/leads';
      router.push(from);
    }
  }, [isAuthenticated, searchParams, router]);
  
  const onSubmit = async (formValues: LoginFormValues) => {
    try {
      await login(formValues);
    } catch {
      setFieldError('email', 'Login failed. Please try again.');
    }
  };
  
  return (
    <LoginContainer>
      <FormWrapper>
        <Card variant="elevated">
          <Card.Content>
            <Logo>Logo</Logo>
            
            {error && (
              <ErrorMessage>{error}</ErrorMessage>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errors.email}
                fullWidth
              />
              
              <Input
                id="password"
                name="password"
                type="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                error={errors.password}
                fullWidth
              />
              
              <Button 
                type="submit" 
                fullWidth 
                isLoading={isLoading}
                size="large"
              >
                Login
              </Button>
            </form>
          </Card.Content>
        </Card>
      </FormWrapper>
    </LoginContainer>
  );
} 