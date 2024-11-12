import { ThemeProvider } from "@/components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Toaster } from "sonner";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Route>
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      ></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
