'use client';

import styled from 'styled-components';
import { typography } from '@/lib/theme';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${typography.fontFamily.primary}, sans-serif;
`;

const Main = styled.main`
  flex: 1;
  padding: 0;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <PageContainer>
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
    </PageContainer>
  );
} 