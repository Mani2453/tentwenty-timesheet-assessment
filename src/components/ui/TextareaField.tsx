import { Info } from "lucide-react"
import React from "react"

type TextAreaFieldProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  error?: string
  infoTooltip?: string
  placeholder?: string
  rows?: number
}

export function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  infoTooltip,
  placeholder = "",
  rows = 4
}: TextAreaFieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-900">
        {label} {required && <span>*</span>}
      </label>

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-[494px] h-[163px] p-3 text-sm border rounded-md resize-none
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          focus:outline-none focus:ring-1
        `}
      />
        {infoTooltip && (
            <p className="text-[12px] text-gray-500 mt-1">{infoTooltip}</p>
        )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
