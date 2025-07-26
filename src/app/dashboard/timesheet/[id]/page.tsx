import React from 'react';
import { Layout } from '@/components/Layout';
import { TimesheetListView } from '@/components/TimesheetListView';

interface TimesheetDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}

export default async function TimesheetDetailPage({ 
  params, 
  searchParams 
}: TimesheetDetailPageProps) {
  // Await the params and searchParams
  const { id } = await params;
  const { view } = await searchParams;
  
  const isReadonly = view === 'readonly';

  return (
    <Layout>
      <TimesheetListView weekId={id} isReadonly={isReadonly} />
    </Layout>
  );
}