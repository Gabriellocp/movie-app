"use client";
import { useAuthContext } from "@/provider/AuthProvider";
import { LoggedUserPopover } from "../LoggedUserPopover";
export function Header() {
  const { activeUser } = useAuthContext();
  return (
    <header className="flex p-5 mb-10 justify-between bg-gray-800 items-center">
      <h1 className="text-white">Movie Planner</h1>
      {!!activeUser && <LoggedUserPopover />}
    </header>
  );
}
