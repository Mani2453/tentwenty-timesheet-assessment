'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Timesheet, Project, CreateTimesheetEntry } from '@/lib/types';
import { apiCall } from '@/lib/api';

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
        return 'Create Timesheet Entry';
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
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errors.general}
          </div>
        )}

        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
            Select Project *
          </label>
          <select
            id="project"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            disabled={isReadOnly}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.projectId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${isReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}
            `}
          >
            <option value="">Project Name</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {errors.projectId && (
            <p className="mt-1 text-sm text-red-600">{errors.projectId}</p>
          )}
        </div>

        <div>
          <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Task description *
          </label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            rows={4}
            value={formData.taskDescription}
            onChange={handleChange}
            placeholder="Write task here"
            disabled={isReadOnly}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
              focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.taskDescription ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
              ${isReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}
            `}
          />
          {errors.taskDescription && (
            <p className="mt-1 text-sm text-red-600">{errors.taskDescription}</p>
          )}
        </div>

        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
            Hours *
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, hours: Math.max(0, prev.hours - 1) }))}
              disabled={isReadOnly}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="text-center"
              error={errors.hours}
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, hours: prev.hours + 1 }))}
              disabled={isReadOnly}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <Input
          label="Date *"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={isReadOnly}
          error={errors.date}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          {!isReadOnly && (
            <Button
              type="submit"
              loading={loading}
            >
              Add entry
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};