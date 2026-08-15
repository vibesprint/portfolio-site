import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ROUTES } from "./routes.jsx";

const USER_ID_KEY = "myuser-id";
function getUserId() {
  let user_id = localStorage.getItem(USER_ID_KEY);
  if (user_id == null) {
    user_id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, user_id);
  }
  return user_id;
}

async function identifyUser() {
  const user_id = getUserId();
  await window.umami?.identify({ id: user_id });
}

async function blockAnalytics() {
  const user_id = getUserId();
  await fetch("/block-analytics", {
    method: "POST",
    body: JSON.stringify({ id: user_id }),
  });
}

const umami_website_id = import.meta.env.VITE_UMAMI_WEBSITE_ID;
if (umami_website_id != null) {
  const script = document.createElement("script");
  script.src = "https://cloud.umami.is/script.js";
  script.setAttribute("data-website-id", umami_website_id);
  script.defer = true;
  script.onload = identifyUser;
  script.onerror = blockAnalytics;
  document.head.appendChild(script);
}

const queryClient = new QueryClient();
const router = createBrowserRouter(ROUTES);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
