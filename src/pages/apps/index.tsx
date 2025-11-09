import type React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONFIGFORGE_APP_URL, TASKIFY_APP_URL } from "@/config";

const apps = [
  {
    name: "Configforge",
    path: CONFIGFORGE_APP_URL,
    description: "Configuration Management Tool",
  },
  {
    name: "Taskify",
    path: TASKIFY_APP_URL,
    description: "Task Management Application",
  },
];

const Apps: React.FC = () => {
  const handleAppClick = (path: string) => {
    // keep existing navigation behavior
    // navigateToUrl(path);
    window.location.href = path;
  };

  const onKeyActivate = (e: React.KeyboardEvent, path: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAppClick(path);
    }
  };

  return (
    <div className="h-full w-full p-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Apps</h2>
          <p className="text-sm text-muted-foreground">Quick access to apps</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <Card
            key={app.path}
            // make card act like a button
            role="button"
            tabIndex={0}
            onClick={() => handleAppClick(app.path)}
            onKeyDown={(e) => onKeyActivate(e, app.path)}
            className="cursor-pointer transform transition duration-150 hover:scale-[1.01] focus:scale-[1.01] focus:ring-2 focus:ring-ring"
            aria-label={`Open ${app.name}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle>
                    <a href={app.path}>{app.name}</a>
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Apps;
