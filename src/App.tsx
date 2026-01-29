import AppRouter from "./routes/AppRouter";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
