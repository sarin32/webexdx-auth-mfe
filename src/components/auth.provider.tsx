import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { registrationService } from "@/api/registration.service";
import { apps } from "@/config";

export interface User {
  isLoggedIn: boolean;
  token: string;
  email: string;
  isLoading: boolean;
}
export interface UserContext extends User {
  login: (token: string) => void;
  logout: () => void;
}

const defaultUser: User = {
  isLoggedIn: false,
  email: "",
  token: "",
  isLoading: true,
};

const AuthContext = createContext<UserContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User>({
    ...defaultUser,
  });

  useEffect(() => {
    // On mount, check for existing session via API
    const checkSession = async () => {
      try {
        const response = await registrationService.getSelfInfo();
        if (response.ok) {
          setUser({
            isLoggedIn: true,
            email: response.data.email,
            token: "", // Cookie handles it
            isLoading: false,
          });
        } else {
          setUser({
            ...defaultUser,
            isLoading: false,
          });
        }
      } catch (e) {
        setUser({
          ...defaultUser,
          isLoading: false,
        });
      }
    };
    checkSession();
  }, []);

  const redirectAfterLogin = () => {
    const app = searchParams.get("app");
    if (app) {
      const url = apps.find((a) => a.path === app)?.url;
      if (url) {
        window.location.href = url;
        return;
      }
    }
    navigate("/apps");
  };

  const login = (token: string) => {
    setUser({
      isLoggedIn: true,
      email: "",
      token: token,
      isLoading: false,
    });
    redirectAfterLogin();
  };

  const logout = async () => {
    await registrationService.logout();
    setUser({
      ...defaultUser,
      isLoading: false,
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

  if (auth.isLoading) {
    return <div>Loading...</div>; // Simple loading state
  }

  if (!auth.isLoggedIn) {
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
