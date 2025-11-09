export const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL!;
export const CLIENT_BASE_URL = import.meta.env.VITE_REACT_CLIENT_BASE_URL!;
export const TASKIFY_APP_URL = import.meta.env.VITE_REACT_TASKIFY_APP_URL!;
export const CONFIGFORGE_APP_URL = import.meta.env
  .VITE_REACT_CONFIGFORGE_APP_URL;


  export const apps = [
  {
    name: "Configforge",
    path: "configforge",
    url: CONFIGFORGE_APP_URL,
    description: "Configuration Management Tool",
  },
  {
    name: "Taskify",
    path: "taskify",
    url: TASKIFY_APP_URL,
    description: "Task Management Application",
  },
];