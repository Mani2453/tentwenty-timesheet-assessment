'use client';
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  const checkboxId = id || name;

  return (
    <div className="flex items-center h-[16px] gap-2">
      <input
        id={checkboxId}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 text-primary rounded-[4px] border-[0.5px] border-gray-300 bg-gray-50 ${className}`}
        {...props}
      />
      {label && (
        <label htmlFor={checkboxId} className="h-[14px] font-medium text-[14px] leading-[14px] tracking-normal align-middle gap-[2px] text-gray-500">
          {label}
        </label>
      )}
    </div>
  );
};
