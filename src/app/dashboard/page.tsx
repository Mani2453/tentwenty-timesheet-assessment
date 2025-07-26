import React from 'react';
import { Layout } from '@/components/Layout';
import { TimesheetTable } from '@/components/TimesheetTable';

export default function DashboardPage() {
  return (
    <Layout>
        <TimesheetTable />
    </Layout>
  );
}