"use client";
import { useAuthContext } from "@/provider/AuthProvider";
import { UserNavigation } from "../UserNavigation";
export function Header() {
  const { activeUser } = useAuthContext();
  return (
    <header className="flex p-5 justify-between bg-primary items-center sticky top-0">
      <h1 className="text-white text-2xl font-medium">Movie Planner</h1>
      {!!activeUser && <UserNavigation />}
    </header>
  );
}
