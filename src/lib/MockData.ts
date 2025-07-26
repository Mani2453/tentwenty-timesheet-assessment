import { WeeklyTimesheet } from './types';

export const mockWeeklyTimesheet: WeeklyTimesheet = {
  id: '3',
  weekNumber: 3,
  weekRange: '15 - 19 January, 2024',
  startDate: '2024-01-15',
  endDate: '2024-01-19',
  totalHours: 32,
  targetHours: 40,
  dailyTimesheets: [
    {
      id: 'day-1',
      date: '2024-01-21',
      dayName: 'Jan 21',
      entries: [
        {
          id: 'entry-1',
          projectName: 'Homepage Development',
          taskDescription: 'Working on responsive header component',
          hours: 4,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-21'
        },
        {
          id: 'entry-2',
          projectName: 'Homepage Development',
          taskDescription: 'Implementing navigation menu',
          hours: 3,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-21'
        }
      ]
    },
    {
      id: 'day-2',
      date: '2024-01-22',
      dayName: 'Jan 22',
      entries: [
        {
          id: 'entry-3',
          projectName: 'Homepage Development',
          taskDescription: 'CSS styling for main sections',
          hours: 5,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-22'
        },
        {
          id: 'entry-4',
          projectName: 'Homepage Development',
          taskDescription: 'JavaScript functionality for forms',
          hours: 2,
          projectId: '1',
          status: 'active',
          timesheetId: '3',
          date: '2024-01-22'
        },
        {
          id: 'entry-5',
          projectName: 'Homepage Development',
          taskDescription: 'Testing cross-browser compatibility',
          hours: 1,
          projectId: '1',
          status: 'active',
          timesheetId: '3',
          date: '2024-01-22'
        }
      ]
    },
    {
      id: 'day-3',
      date: '2024-01-23',
      dayName: 'Jan 23',
      entries: [
        {
          id: 'entry-6',
          projectName: 'Homepage Development',
          taskDescription: 'Mobile responsiveness optimization',
          hours: 4,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-23'
        },
        {
          id: 'entry-7',
          projectName: 'Homepage Development',
          taskDescription: 'Performance optimization',
          hours: 3,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-23'
        },
        {
          id: 'entry-8',
          projectName: 'Homepage Development',
          taskDescription: 'Code review and refactoring',
          hours: 2,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-23'
        }
      ]
    },
    {
      id: 'day-4',
      date: '2024-01-24',
      dayName: 'Jan 24',
      entries: [
        {
          id: 'entry-9',
          projectName: 'Homepage Development',
          taskDescription: 'Final testing and bug fixes',
          hours: 6,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-24'
        },
        {
          id: 'entry-10',
          projectName: 'Homepage Development',
          taskDescription: 'Documentation and deployment prep',
          hours: 2,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-24'
        },
        {
          id: 'entry-11',
          projectName: 'Homepage Development',
          taskDescription: 'Client presentation preparation',
          hours: 1,
          projectId: '1',
          status: 'completed',
          timesheetId: '3',
          date: '2024-01-24'
        }
      ]
    },
    {
      id: 'day-5',
      date: '2024-01-25',
      dayName: 'Jan 25',
      entries: []
    }
  ]
};
