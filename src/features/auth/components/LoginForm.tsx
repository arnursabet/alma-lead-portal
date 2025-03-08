'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { login } from '../authSlice';
import { RootState, AppDispatch } from '@/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { colors } from '@/lib/theme';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxlarge};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

const Alert = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  background-color: ${props => {
    switch (props.type) {
      case 'success': return `${colors.success}`;
      case 'error': return `${colors.error}`;
      case 'info': return `${colors.info}`;
      default: return `${colors.info}`;
    }
  }};
  color: white;
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const resultAction = await dispatch(login({ email, password }));
    
    if (login.fulfilled.match(resultAction)) {
      router.push('/admin/leads');
    }
  };

  return (
    <FormContainer>
      <Card variant="elevated">
        <form onSubmit={handleSubmit}>
          <Card.Content>
            <FormTitle>Login to Alma Lead Portal</FormTitle>
            
            {error && <Alert type="error">{error}</Alert>}
            
            <Input
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={errors.email}
              fullWidth
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              error={errors.password}
              fullWidth
            />
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={loading}
              size="large"
            >
              Login
            </Button>
          </Card.Content>
        </form>
      </Card>
    </FormContainer>
  );
} 