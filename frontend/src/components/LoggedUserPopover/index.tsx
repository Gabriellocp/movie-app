import { useAuthContext } from "@/provider/AuthProvider";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function LoggedUserPopover() {
  const [showOptions, setShowOptions] = useState(false);
  const { activeUser, logout } = useAuthContext();
  return (
    <Popover>
      <PopoverTrigger
        className="hover:cursor-pointer hover:border-white hover:rounded-md hover:border-2 
        border-transparent border-2 p-1"
        asChild
      >
        <label className="text-white">{activeUser?.name.split(" ")[0]}</label>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-hidden w-fit">
        <h2
          onClick={logout}
          className="hover:bg-red-600 hover:text-white hover:cursor-pointer p-2"
        >
          Logout
        </h2>
      </PopoverContent>
    </Popover>
  );
}
