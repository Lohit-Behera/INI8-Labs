import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import { ErrorBoundary } from "react-error-boundary";
import SomethingWentWrong from "./pages/Error/SomethingWentWrong";

function Layout() {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <ErrorBoundary FallbackComponent={SomethingWentWrong}>
        <main className="flex-1 flex justify-center items-center my-6">
          <ScrollRestoration />
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
