import React from "react";
import { AppProvider } from "./context/AppContext";
import Main from "./main/Main";

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
