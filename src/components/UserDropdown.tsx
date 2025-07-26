import { ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function UserDropdown({ userName, handleLogout }: any) {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center w-[91px] h-[24px] gap-[6px] rounded">
          <span className="w-[73px] h[24px] font-medium text-base leading-[150%] tracking-normal text-gray-500">{userName}</span>
          <div className="h-3 w-3 flex items-center justify-center">
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        <DropdownMenuItem disabled>{userName}</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
