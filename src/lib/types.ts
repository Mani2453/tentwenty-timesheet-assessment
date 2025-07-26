export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Timesheet {
  id: string;
  weekNumber: number;
  dateRange: string;
  status: 'COMPLETED' | 'INCOMPLETE' | 'MISSING';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimesheetEntry {
  id: string;
  timesheetId: string;
  projectId: string;
  projectName: string;
  taskDescription: string;
  hours: number;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateTimesheetEntry {
  projectId: string;
  taskDescription: string;
  hours: number;
  date: string;
}

export interface DailyTimesheet {
  id: string;
  date: string;
  dayName: string;
  entries: TimesheetEntry[];
}

export interface TimesheetEntry {
  id: string;
  projectName: string;
  taskDescription: string;
  hours: number;
  projectId: string;
  status: 'active' | 'completed';
}

export interface WeeklyTimesheet {
  id: string;
  weekNumber: number;
  weekRange: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  targetHours: number;
  dailyTimesheets: DailyTimesheet[];
}