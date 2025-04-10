"use client";
import AuthService from "@/services/AuthService";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface IActiveUser {
  name: string;
  token: string;
}
interface IAuthContext {
  login: ({ email, password }: { email: string; password: string }) => {};
  register: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {};
  logout: () => void;
  activeUser: IActiveUser | undefined;
}
const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext was not initialized!");
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [activeUser, setActiveUser] = useState<IActiveUser | undefined>(
    undefined
  );
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") ?? undefined;
    if (accessToken) {
      Cookie.set("accessToken", accessToken);
    }
    handleToken(accessToken);
  }, []);
  const handleToken = (token?: string) => {
    if (!token) {
      return;
    }
    try {
      const user = jwtDecode(token);
      setActiveUser({ name: user.name, token });
      localStorage.setItem("accessToken", token);
    } catch {
      handleLogout();
    }
  };
  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const token = await AuthService.authenticate({ email, password });
      handleToken(token);
    } catch {}
  };
  const handleRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const token = await AuthService.signup({ email, password, name });
      handleToken(token);
    } catch {}
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setActiveUser(undefined);
    Cookie.remove("accessToken");
    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        activeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
