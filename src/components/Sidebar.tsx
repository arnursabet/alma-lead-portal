'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { spacing, typography, colors } from '@/lib/theme';

const SidebarContainer = styled.aside`
  background-color: ${colors.background};
  border-right: 1px solid ${colors.border};
  width: 250px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding: ${spacing.medium} 0;
  display: flex;
  flex-direction: column;
  font-family: ${typography.fontFamily.primary}, sans-serif;
`;

const Logo = styled.div`
  font-size: ${typography.fontSizes.xxxlarge};
  font-weight: ${typography.fontWeights.bold};
  padding: 0 ${spacing.medium};
  margin-bottom: ${spacing.xlarge};
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavItem = styled.a<{ $active?: boolean }>`
  padding: ${spacing.small} ${spacing.medium};
  color: ${colors.text.primary};
  text-decoration: none;
  font-weight: ${props => props.$active ? typography.fontWeights.bold : typography.fontWeights.normal};
`;

const UserInfo = styled.div`
  margin-top: auto;
  padding: ${spacing.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.small};
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  width: 100%;
`;

const Avatar = styled.div`
  width: ${spacing.medium};
  height: ${spacing.medium};
  border-radius: 50%;
  background-color: ${colors.cloud};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.small};
  font-weight: ${typography.fontWeights.semibold};
  font-size: ${typography.fontSizes.small};
`;

const UserRole = styled.div`
  font-weight: ${typography.fontWeights.bold};
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  color: ${colors.text.secondary};
  font-size: ${typography.fontSizes.small};
  padding: ${spacing.xsmall} ${spacing.medium};
  margin-top: ${spacing.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  
  &:hover {
    background-color: ${colors.background};
    color: ${colors.text.primary};
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = async () => {
    try {      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        console.log('Logout successful');
        
        // Also clear any local storage items
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          console.log('Local storage cleared');
        }
        
        // Use Next.js Router instead of window.location
        router.push('/admin/login');
      } else {
        console.error('Logout API call failed');
        // Fallback to manually clearing cookies
        document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;';
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;';
      router.push('/admin/login');
    }
  };
  
  return (
    <SidebarContainer>
      <Logo>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          Logo
        </Link>
      </Logo>
      
      <NavMenu>
        <Link href="/admin/leads" passHref legacyBehavior>
          <NavItem $active={pathname === '/admin/leads' || pathname.startsWith('/admin/leads/')}>
            Leads
          </NavItem>
        </Link>
        <Link href="/admin/settings" passHref legacyBehavior>
          <NavItem $active={pathname === '/admin/settings'}>
            Settings
          </NavItem>
        </Link>
      </NavMenu>
      
      <UserInfo>
        <UserProfile>
          <Avatar>A</Avatar>
          <UserRole>Admin</UserRole>
        </UserProfile>
        <LogoutButton onClick={handleLogout} type="button">
          Logout
        </LogoutButton>
      </UserInfo>
    </SidebarContainer>
  );
} 