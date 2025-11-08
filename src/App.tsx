import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { RootRoutes } from "./routes";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider storageKey="vite-ui-theme">
				<RootRoutes />
			</ThemeProvider>
			<Toaster></Toaster>
		</BrowserRouter>
	);
}

export default App;
