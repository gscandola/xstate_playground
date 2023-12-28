import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { GeminiProvider } from "@gemini/core";
import { AVIV_THEME } from "@gemini/tokens";
import Home from "./pages/Home";
import Link from "./components/Link";
import IceCream from "./pages/IceCream";
import Weather from "./pages/Weather";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<Home />} index />
        <Route element={<IceCream />} path="/ice-cream" />
        <Route element={<Weather />} path="/weather" />
        <Route element={<Navigate to="/" replace />} path="*" />
      </Route>
    )
  );

  return (
    <GeminiProvider
      colorScheme="light"
      locale="fr"
      renderLink={Link}
      scopingSelector={`[id="app"]`}
      theme={AVIV_THEME}
    >
      <RouterProvider router={router} />
    </GeminiProvider>
  );
};

export default App;
