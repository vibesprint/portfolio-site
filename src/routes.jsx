import App from "./App.jsx";

export const ROUTES = [
  {
    Component: App,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { default: Component } = await import("./screens/MainPage.jsx");
          return { Component };
        },
      },

      {
        path: "/exp",
        lazy: async () => {
          const { default: Component } =
            await import("./screens/ExperiencePage.jsx");
          return { Component };
        },
      },
    ],
  },
];
