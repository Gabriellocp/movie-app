import { useAuthContext } from "@/provider/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function UserNavigation() {
  const { activeUser, logout } = useAuthContext();
  const router = useRouter();

  return (
    <div className="flex space-x-2">
      <Button asChild>
        <Link href={"/folder"}>Folders</Link>
      </Button>
      <Button asChild>
        <Link href={"/movie"}>Movies</Link>
      </Button>
      <Popover>
        <PopoverTrigger
          className="hover:cursor-pointer hover:border-white hover:rounded-md hover:border-2 
        border-transparent border-2 p-1"
          asChild
        >
          <label className="text-white">{activeUser?.name.split(" ")[0]}</label>
        </PopoverTrigger>
        <PopoverContent className="p-0 overflow-hidden w-30 text-center">
          <h2
            onClick={() => {
              router.push("/me");
            }}
            className="hover:bg-primary hover:text-white hover:cursor-pointer p-2"
          >
            Details
          </h2>
          <h2
            onClick={logout}
            className="hover:bg-red-600 hover:text-white hover:cursor-pointer p-2"
          >
            Logout
          </h2>
        </PopoverContent>
      </Popover>
    </div>
  );
}
