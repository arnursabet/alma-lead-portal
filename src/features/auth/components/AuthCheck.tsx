'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '@/store';
import { checkAuth } from '../authSlice';
import { colors, spacing } from '@/lib/theme';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  margin-left: ${spacing.medium};
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${colors.primary};
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface AuthCheckProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function AuthCheck({ children, adminOnly = false }: AuthCheckProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => 
    (state.auth || { 
      isAuthenticated: false, 
      loading: false, 
      user: null,
      error: null
    }) as {
      isAuthenticated: boolean;
      loading: boolean;
      user: { id: string; email: string; name: string; role: string } | null;
      error: string | null;
    }
  );
  const { isAuthenticated, loading, user } = auth;
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  useEffect(() => {
    if (!loading && !isAuthenticated && pathname.startsWith('/admin')) {
      // Redirect to admin login page
      router.push(`/admin/login?from=${encodeURIComponent(pathname)}`);
    } else if (!loading && isAuthenticated && adminOnly && user?.role !== 'admin') {
      // If admin-only and user is not admin, redirect to home
      router.push('/');
    }
  }, [isAuthenticated, loading, router, pathname, adminOnly, user]);
  
  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Checking authentication...</LoadingText>
      </LoadingContainer>
    );
  }
  
  if ((pathname.startsWith('/admin') && !isAuthenticated) || (adminOnly && user?.role !== 'admin')) {
    return null;
  }
  
  return <>{children}</>;
} 