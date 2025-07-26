import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { FaCircleInfo } from "react-icons/fa6";


type Option = { label: string; value: string }

type SelectFieldProps = {
    id: string
    name: string
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    options: Option[]
    required?: boolean
    disabled?: boolean
    error?: string
    infoTooltip?: string
    defaultValue: string
}

export function SelectField({
    id,
    name,
    label,
    value,
    onChange,
    options,
    required,
    disabled,
    error,
    infoTooltip,
    defaultValue,
}: SelectFieldProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="relative w-[364px] flex flex-col gap-2">
            <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium text-gray-900">
                {label} {required && "*"} <FaCircleInfo className="text-gray-400"/>
            </label>

            <div className="relative">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    className={`
            appearance-none w-full h-[42px] p-3 pr-9 border rounded-md text-[14px] text-gray-500
            focus:outline-none focus:ring-1
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary-500"}
            ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}
          `}
                >
                    <option value="">{defaultValue}</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* ChevronDown Icon from Lucide */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform duration-200 ${isFocused ? "rotate-180" : "rotate-0"}`}
                    />
                </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    )
}
