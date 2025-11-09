import "./styles/globals.css";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/app.route";

function App() {
  return <RouterProvider router={appRouter} />;
}
export default App;
