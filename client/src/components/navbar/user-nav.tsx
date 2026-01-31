import { ChevronDown, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserNav({
  userName,
  profilePicture,
  onLogout,
}: {
  userName: string;
  profilePicture?: string;
  onLogout: () => void;
}) {
  const initials = userName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Open user menu"
          className="relative !bg-transparent h-10 w-auto px-1 rounded-full !gap-1
                     focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage
              src={profilePicture || ""}
              alt={userName}
            />
            <AvatarFallback
              className="bg-[var(--secondary-dark-color)] border border-gray-700 text-white"
            >
              {initials || "U"}
            </AvatarFallback>
          </Avatar>

          <ChevronDown className="w-3 h-3 ml-1 text-white opacity-70 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-[var(--secondary-dark-color)] text-white border border-gray-700"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="font-semibold">{userName}</span>
          <span className="text-[12px] text-gray-400 font-light">
            Free Trial · 2 days left
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-700" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2 text-red-400" />
            <span className="text-red-400">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
