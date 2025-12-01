import "./global.css"
import AppNavigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./src/context/theme-context";
import { FavoritesProvider } from "./src/context/favorites-context";

const queryClient = new QueryClient()
function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <AppNavigation />
        </QueryClientProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
