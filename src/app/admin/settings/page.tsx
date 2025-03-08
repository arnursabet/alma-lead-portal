'use client';

import styled from 'styled-components';
import { AdminLayout } from '@/components/layout';
import { typography, spacing } from '@/lib/theme';

const PageHeader = styled.div`
  margin-bottom: ${spacing.xlarge};
  font-family: var(--font-montserrat), sans-serif;
`;

const PageTitle = styled.h1`
  font-size: ${typography.fontSizes.xxlarge};
  font-weight: ${typography.fontWeights.bold};
  margin-bottom: ${spacing.medium};
`;

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
    </AdminLayout>
  );
} 