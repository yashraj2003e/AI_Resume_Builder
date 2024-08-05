import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./Pages/EditResume.jsx";
import Loader2 from "./components/custom/Loader2.jsx";

// import SignInPage from "./auth/sign-in/index.jsx";
// import Home from "./Pages/Home.jsx";
// import Dashboard from "./Pages/Dashboard.jsx";

const SignInPage = lazy(() => import("./auth/sign-in/SignIn.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loader2 />}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <RouterProvider router={router} />
      </ClerkProvider>
    </Suspense>
  </React.StrictMode>
);
