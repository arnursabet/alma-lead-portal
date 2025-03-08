'use client';

import styled from 'styled-components';
import { colors, spacing } from '../lib/theme';

const FooterContainer = styled.footer`
  background-color: ${colors.background};
  padding: ${spacing.lg} 0;
  border-top: 1px solid ${colors.border};
  font-family: var(--font-montserrat), sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${spacing.md};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${colors.text.secondary};
  font-size: 0.875rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${spacing.lg};
`;

const FooterLink = styled.a`
  color: ${colors.text.secondary};
  text-decoration: none;
  font-size: 0.875rem;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Copyright>© {new Date().getFullYear()} Alma. All rights reserved.</Copyright>
        <FooterLinks>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Service</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
      </Container>
    </FooterContainer>
  );
} 