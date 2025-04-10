"use client";
import { SignUpForm } from "@/components/Form";
import { SignInForm } from "@/components/Form/SignIn";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Home() {
  const [currentForm, setCurrentForm] = useState<"signin" | "signup">("signin");

  return (
    <div className="flex items-center flex-col space-y-10">
      <h1 className="text-7xl text-primary font-extrabold text-center">
        Plan, write reviews and take notes of everything you watch in just one
        place!
      </h1>
      <div className="flex space-x-2">
        <Button onClick={() => setCurrentForm("signin")} size={"lg"}>
          Sign in
        </Button>
        <Button
          onClick={() => setCurrentForm("signup")}
          size={"lg"}
          variant={"secondary"}
        >
          Sign up
        </Button>
      </div>
      {
        {
          signin: <SignInForm />,
          signup: <SignUpForm />,
        }[currentForm]
      }
    </div>
  );
}
