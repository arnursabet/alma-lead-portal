'use client';

import { PageLayout } from '@/components/layout';
import { LeadForm } from '@/features/leads';

export default function Home() {
  return (
    <PageLayout>
      <LeadForm />
    </PageLayout>
  );
}
