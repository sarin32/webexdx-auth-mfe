import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { CLIENT_BASE_URL } from "@/config";
import {
  getSessionToken,
  removeSessionToken,
  setSessionToken,
} from "@/lib/session";

export interface User {
  isLoggedIn: boolean;
  token: string;
  email: string;
}
export interface UserContext extends User {
  login: (token: string) => void;
  logout: () => void;
}

const defaultUser: User = {
  isLoggedIn: false,
  email: "",
  token: "",
};

const AuthContext = createContext<UserContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User>({
    ...defaultUser,
  });

  useEffect(() => {
    // On mount, check for existing session
    const token = getSessionToken();
    if (token) {
      // get profile info, call api

      setUser({
        isLoggedIn: true,
        email: "",
        token: token,
      });
    }
  }, []);

  const redirectAfterLogin = () => {
    const app = searchParams.get("app");
    if (app) window.location.href = CLIENT_BASE_URL + app;
    else navigate("/apps");
  };

  const login = (token: string) => {
    setSessionToken(token);
    setUser({
      isLoggedIn: true,
      email: "",
      token: token,
    });
    redirectAfterLogin();
  };

  const logout = () => {
    removeSessionToken();
    setUser({
      ...defaultUser,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  if (!auth.isLoggedIn && !getSessionToken()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
