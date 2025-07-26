'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProgressBar } from './ui/ProgressBar';
import { TimesheetModal } from './TimesheetModal';
import { WeeklyTimesheet, DailyTimesheet, TimesheetEntry, Timesheet } from '@/lib/types';
import { mockWeeklyTimesheet } from '@/lib/MockData';
import { ActionDropdown } from './Dropdowns';

interface TimesheetListViewProps {
  weekId?: string;
  isReadonly?: boolean;  // Add this
}

export const TimesheetListView: React.FC<TimesheetListViewProps> = ({
  weekId,
  isReadonly = false  // Add this with default value
}) => {
  const [weeklyData, setWeeklyData] = useState<WeeklyTimesheet>(mockWeeklyTimesheet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const actions = [
    {
      label: 'Edit',
      onClick: (entry: TimesheetEntry) => handleEditEntry(entry, selectedDate),
      className: 'font-normal text-[14px] h-[37px] leading-[150%] text-gray-700 hover:cursor-pointer'
    },
    {
      label: 'Delete',
      onClick: (entryId: string) => handleDeleteEntry(entryId, selectedDate),
      className: 'text-red-600 text-[14px] h-[37px] leading-[150%] hover:cursor-pointer'
    }
  ]
  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setSelectedEntry(null);
    setIsModalOpen(true);
  };

  const handleEditEntry = (entry: TimesheetEntry, date: string) => {
    setSelectedEntry(entry);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = (entryId: string, date: string) => {
    setWeeklyData(prev => ({
      ...prev,
      dailyTimesheets: prev.dailyTimesheets.map(day =>
        day.date === date
          ? { ...day, entries: day.entries.filter(entry => entry.id !== entryId) }
          : day
      )
    }));
  };

  // Use isReadonly to conditionally disable editing
  const canEdit = !isReadonly;

  return (
    <div className=" flex flex-col w-[1280px] gap-4">
      <div className=' w-fill bg-white rounded-lg flex flex-col gap-6 p-6 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            This week&apos;s timesheet
          </h1>
          <ProgressBar
            current={weeklyData.totalHours}
            target={weeklyData.targetHours}
            className="mb-6"
          />
        </div>
        <p className="w-[146px] text-sm text-gray-600">{weeklyData.weekRange}</p>

        {/* Daily Timesheets */}
        <>
          {weeklyData.dailyTimesheets.map((day: DailyTimesheet) => (
            <div key={day.id} className="flex w-[1232px] gap-5">
              <h3 className="text-lg w-[108px] h-[27px] font-semibold text-gray-900">{day.dayName}</h3>
              {/* Entries */}
              <div className="w-[1104px]">
                {day.entries.length > 0 ? (
                  <div className="w-fill flex flex-col gap-[10px]">
                    {day.entries.map((entry: TimesheetEntry) => (
                      <div
                        key={entry.id}
                        className="flex items-center w-[1104px] h-[44px] gap-4 rounded-lg border border-gray-200 px-3 py-2.5"
                      >
                        <div className="flex justify-between w-full">
                          <div className={`w-[428px] h-[24px] font-medium text-base leading-[150%] tracking-normal text-gray-900`}>
                            {entry.projectName}
                          </div>
                          <div className="flex items-center w-[142px] h-[21px] gap-[10px]">
                            <span className="w-[34px] h-[18px] font-normal text-sm leading-[125%] tracking-normal text-gray-400">
                              {entry.hours} hrs
                            </span>
                            <div className='flex items-center justify-center w-[98px] h-[22px] bg-blue-100 rounded-md'>
                              <span className="w-[98px] h-[18px] font-normal text-sm leading-[125%] tracking-normal text-center align-middle text-blue-800">
                                Project Name
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {/* Only show action buttons if not readonly */}
                          {canEdit && (
                            <div className="flex items-center">
                              <ActionDropdown
                                actions={actions} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  null
                )}
                {/* Add New Task Button - only show if not readonly */}
                {canEdit && (
                  <button
                    onClick={() => handleAddTask(day.date)}
                    className="w-full h-11 p-3 mt-[10px] border-2 border-dashed hover:border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus size={16} />
                    <span className="text-sm font-medium">Add new task</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      </div>
      {/* Footer */}
      <div className='w-fill h-[85px] flex items-center justify-center bg-white rounded-lg shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]'>
        <div className='flex items-center justify-center w-full h-full gap-8 p-8 border'>
          <span className='w-[254px] h-[21px] font-normal text-sm leading-[150%] tracking-[0] text-gray-500'>&copy; 2024 tentwenty. All rights reserved</span>
        </div>
      </div>

      {/* Modal - only show if not readonly */}
      {canEdit && (
        <TimesheetModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEntry(null);
            setSelectedDate('');
          }}
          timesheet={null}
          onSave={() => {
            setIsModalOpen(false);
            setSelectedEntry(null);
            setSelectedDate('');
          }}
        />
      )}
    </div>
  );
};