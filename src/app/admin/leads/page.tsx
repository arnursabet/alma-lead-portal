'use client';

import styled from 'styled-components';
import { AdminLayout } from '@/components/layout';
import LeadsTable from '@/components/admin/LeadsTable';
import { typography, spacing } from '@/lib/theme';

const PageHeader = styled.div`
  margin-bottom: ${spacing.xlarge};
  font-family: ${typography.fontFamily.primary}, sans-serif;
`;

const PageTitle = styled.h1`
  font-size: ${typography.fontSizes.xxlarge};
  font-weight: ${typography.fontWeights.bold};
  margin-bottom: ${spacing.medium};
`;

export default function AdminLeadsPage() {
  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle>Leads</PageTitle>
      </PageHeader>
      <LeadsTable />
    </AdminLayout>
  );
} 