import React from 'react';
import { Button } from './Button';
import { Timesheet } from '@/lib/types';
import { useRouter } from 'next/navigation';
interface TableProps {
  data: Timesheet[];
  setSelectedTimesheet: (timesheet: Timesheet) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  className?: string;
}

export function Table({
  data,
  setSelectedTimesheet,
  setIsModalOpen,
  className = '',
}: TableProps) {
  
  const router = useRouter();

  const getStatusBadge = (status: Timesheet['status']) => {
    const statusStyles = {
      COMPLETED: 'bg-green-100 text-green-800',
      INCOMPLETE: 'bg-yellow-100 text-yellow-800',
      MISSING: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  const getActionButton = (timesheet: Timesheet) => {
    const buttonProps = {
      COMPLETED: { text: 'View' },
      INCOMPLETE: { text: 'Update' },
      MISSING: { text: 'Create' },
    };

    const { text } = buttonProps[timesheet.status];

    const handleAction = () => {
      if (timesheet.status === 'INCOMPLETE') {
        // Navigate to list view for editing
        router.push(`/dashboard/timesheet/${timesheet.id}`);
      } else if (timesheet.status === 'COMPLETED') {
        // Navigate to list view for viewing
        router.push(`/dashboard/timesheet/${timesheet.id}?view=readonly`);
      } else {
        // Open modal for creating new
        setSelectedTimesheet(timesheet);
        setIsModalOpen(true);
      }
    };
    return (
      <Button
        size="sm"
        onClick={handleAction}
      >
        {text}
      </Button>
    );
  };

  return (
    <div className={`h-[325px] overflow-x-auto ${className} shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] rounded-lg`}>
      <table className="w-fill ">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="w-[107px] h-[50px] px-4 text-left rounded-tl-lg">
              <span className="font-semibold text-[12px] leading-[150%] uppercase text-gray-500">Week #</span>
            </th>
            <th className="w-[502px] h-[50px] px-4 text-left">
              <span className="font-semibold text-[12px] leading-[150%] uppercase text-gray-500">Date</span>
            </th>
            <th className="w-[502px] h-[50px] px-4 text-left">
              <span className="font-semibold text-[12px] leading-[150%] uppercase text-gray-500">Status</span>
            </th>
            <th className="w-[121px] h-[50px] px-4 text-center rounded-tr-lg">
              <span className="font-semibold text-[12px] leading-[150%] uppercase text-gray-500">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((timesheet, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="w-[107px] h-[54px] px-4 bg-gray-50 text-sm text-gray-900">{timesheet.weekNumber}</td>
              <td className="w-[502px] h-[54px] px-4 text-sm text-gray-500">{timesheet.dateRange}</td>
              <td className="w-[502px] h-[54px] px-4 text-sm">{getStatusBadge(timesheet.status)}</td>
              <td className="w-[121px] h-[54px] px-4 text-center">{getActionButton(timesheet)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
