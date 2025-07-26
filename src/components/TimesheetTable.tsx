'use client';

import React, { useState, useEffect } from 'react';
import { Table } from './ui/Table';
import { TimesheetModal } from './TimesheetModal';
import { Timesheet } from '@/lib/types';
import { apiCall } from '@/lib/api';

export const TimesheetTable: React.FC = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const fetchTimesheets = async () => {
    setLoading(true);
    const response = await apiCall<Timesheet[]>('/timesheets');

    if (response.success && response.data) {
      setTimesheets(response.data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[1280px] h-[522px] gap-4">
      <div className='flex flex-col w-[1280px] h-[421px] gap-6 p-6 bg-white rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
        <div className="w-fill h-[24px] gap-2 flex items-center">
          <h2 className="font-bold text-[24px] leading-[24px] tracking-normal text-gray-900">Your Timesheets</h2>
        </div>
        <Table data={timesheets} setSelectedTimesheet={setSelectedTimesheet} setIsModalOpen={setIsModalOpen} />
      </div>
      <TimesheetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTimesheet(null);
        }}
        timesheet={selectedTimesheet}
        onSave={() => {
          fetchTimesheets();
          setIsModalOpen(false);
          setSelectedTimesheet(null);
        }}
      />
      <div className='w-fill h-[85px] flex items-center justify-center bg-white rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
        <div className='flex items-center justify-center w-full h-full gap-8 p-8 border'>
          <span className='w-[254px] h-[21px] font-normal text-sm leading-[150%] tracking-[0] text-gray-500'>&copy; 2024 tentwenty. All rights reserved</span>
        </div>
      </div>
    </div>
  );
};