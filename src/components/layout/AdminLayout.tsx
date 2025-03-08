'use client';

import styled from 'styled-components';
import Sidebar from '../Sidebar';
import { AuthCheck } from '@/features/auth';
import { spacing, colors } from '@/lib/theme';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; // Same as sidebar width
  min-height: 100vh;
  padding: ${spacing.large} ${spacing.medium};
  background-color: ${colors.background};
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthCheck adminOnly>
      <LayoutContainer>
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </LayoutContainer>
    </AuthCheck>
  );
} 