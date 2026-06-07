import React from "react";
import { useRoutes } from "react-router-dom";

import routes from "./app/routes.js";

export default function App() {
  const routing = useRoutes(routes);

  return <>{routing}</>;
}
