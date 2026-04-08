import AppProvider from "../../shared/providers/AppProvider";
import AppRoutes from "./routes";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
