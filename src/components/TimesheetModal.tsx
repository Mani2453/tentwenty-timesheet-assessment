'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Timesheet, Project, CreateTimesheetEntry } from '@/lib/types';
import { apiCall } from '@/lib/api';
import { SelectField } from './ui/SelectField';
import { TextAreaField } from './ui/TextareaField';

interface TimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  timesheet: Timesheet | null;
  onSave: () => void;
}

export const TimesheetModal: React.FC<TimesheetModalProps> = ({
  isOpen,
  onClose,
  timesheet,
  onSave,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<CreateTimesheetEntry>({
    projectId: '',
    taskDescription: '',
    hours: 0,
    date: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      resetForm();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    const response = await apiCall<Project[]>('/projects');
    if (response.success && response.data) {
      setProjects(response.data);
    }
  };

  const resetForm = () => {
    setFormData({
      projectId: '',
      taskDescription: '',
      hours: 0,
      date: '',
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' ? Number(value) : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectId) {
      newErrors.projectId = 'Project is required';
    }

    if (!formData.taskDescription.trim()) {
      newErrors.taskDescription = 'Task description is required';
    }

    if (formData.hours <= 0) {
      newErrors.hours = 'Hours must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // In a real app, you would submit this to an API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSave();
    } catch (error) {
      setErrors({ general: 'Failed to save entry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    if (!timesheet) return 'Add New Entry';

    switch (timesheet.status) {
      case 'COMPLETED':
        return 'View Timesheet Entry';
      case 'INCOMPLETE':
        return 'Update Timesheet Entry';
      case 'MISSING':
        return 'Add New Entry';
      default:
        return 'Timesheet Entry';
    }
  };

  const isReadOnly = timesheet?.status === 'COMPLETED';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getModalTitle()}
    >
      <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[646px] h-[514px] gap-4 p-5">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <SelectField
          label="Select Project"
          id="project"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          disabled={isReadOnly}
          options={projects.map(project => ({
            value: project.id,
            label: project.name,
          }))}
          required={true}
          defaultValue="Project Name"
        />

        <SelectField
          label="Type of Work"
          id="workType"
          name="workType"
          value={formData.projectId}
          onChange={handleChange}
          disabled={isReadOnly}
          options={projects.map(project => ({
            value: project.id,
            label: project.name,
          }))}
          required={true}
          defaultValue="Select Work"
        />

        <TextAreaField
          id="taskDescription"
          name="taskDescription"
          label="Task Description"
          value={formData.taskDescription}
          onChange={handleChange}
          required
          disabled={false}
          error={errors.notes}
          infoTooltip="You can describe your work or add comments here."
        />

        <div className='flex flex-col gap-2 w-[364px] h-[66px]'>
          <label htmlFor="hours" className="block text-[14px] font-medium text-gray-900 mb-1">
            Hours *
          </label>
          <div className="flex items-center w-[113px] border border-gray-300 h-[37px] rounded-lg">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, hours: Math.max(0, prev.hours - 1) }))}
              disabled={isReadOnly}
            className="w-[34px] h-[34px] px-3 py-1 bg-gray-100 border-r text-gray-900 rounded-tl-lg rounded-bl-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <Input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              min="0"
              step="0.5"
              disabled={isReadOnly}
              className="w-[47px] py-2 px-4 border-none text-gray-500 rounded-none"
              error={errors.hours}
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, hours: prev.hours + 1 }))}
              disabled={isReadOnly}
              className="w-[34px] h-[34px] px-3 py-1 bg-gray-100 border-l rounded-tr-lg rounded-br-lg text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center h-[77px] w-full border-t p-5 gap-4 ">
        {!isReadOnly && (
            <Button
              type="submit"
              loading={loading}
              className='w-full rounded-lg bg-blue-600 text-white'
            >
              Add entry
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className='w-full border border-gray-300 bg-white rounded-lg'

          >
            Cancel
          </Button>
          
        </div>
    </Modal>
  );
};