'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { checkAuth, login, logout, User, LoginCredentials } from '@/features/auth';

// Use the types from the auth feature directly
interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  requireAuth: (redirectTo?: string) => void;
  requireAdmin: (redirectTo?: string) => void;
}

/**
 * Custom hook for authentication
 * 
 * @returns Authentication utilities
 */
function useAuth(): UseAuthReturn {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get auth state from Redux
  const auth = useSelector((state: RootState) => state.auth || {});
  
  // Extract values with default fallbacks
  const user = auth.user as User | null || null;
  const isAuthenticated = auth.isAuthenticated || false;
  const loading = auth.loading || false;
  const error = auth.error || null;
  
  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true);
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (err) {
        console.error('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthentication();
  }, [dispatch]);
  
  // Login function
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      try {
        await dispatch(login(credentials)).unwrap();
        // Redirect to admin leads page
        router.push('/admin/leads');
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, router]
  );
  
  // Logout function
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(logout()).unwrap();
      // Redirect to home page
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, router]);
  
  // Require authentication
  const requireAuth = useCallback(
    (redirectTo = '/admin/login') => {
      if (!isLoading && !isAuthenticated) {
        router.push(redirectTo);
      }
    },
    [isAuthenticated, isLoading, router]
  );
  
  // Require admin role
  const requireAdmin = useCallback(
    (redirectTo = '/admin/login') => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push(redirectTo);
        } else if (user?.role !== 'admin') {
          router.push('/');
        }
      }
    },
    [isAuthenticated, isLoading, router, user]
  );
  
  // Check if user is admin
  const isAdmin = user?.role === 'admin';
  
  return {
    user,
    isAuthenticated,
    isAdmin,
    isLoading: isLoading || loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    requireAuth,
    requireAdmin,
  };
}

export default useAuth; 