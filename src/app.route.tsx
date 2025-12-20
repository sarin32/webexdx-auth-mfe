import { createBrowserRouter } from "react-router-dom";
import Apps from "@/pages/apps";
import { AppLayout } from "./layouts/apps.layout";
import { AuthLayout } from "./layouts/auth.layout";
import { HomeLayout } from "./layouts/home.layout";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { GuestGuard } from "./components/auth.provider";

export const appRouter = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          { path: "/", element: <Login /> }, // default → login
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/apps",
            element: <Apps />,
          },
        ],
      },
    ],
  },
]);
