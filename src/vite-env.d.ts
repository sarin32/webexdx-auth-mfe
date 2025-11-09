/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_BASE_URL: string;
  readonly VITE_REACT_CLIENT_BASE_URL: string;
  readonly VITE_REACT_TASKIFY_APP_URL: string;
  readonly VITE_REACT_CONFIGFORGE_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
