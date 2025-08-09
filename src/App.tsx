import './styles/globals.css';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from './components/theme-provider';
import {RootRoutes} from './routes';
import {Toaster} from './components/ui/toaster';

function App() {
  return (
    <BrowserRouter basename="/auth">
      <ThemeProvider storageKey="vite-ui-theme">
        <RootRoutes />
      </ThemeProvider>
      <Toaster></Toaster>
    </BrowserRouter>
  );
}

export default App;
