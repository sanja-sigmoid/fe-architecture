import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";

import type { FCC } from "../@types/general";
import { queryClient } from "../libs/reactQuery/reactQuery";
import CustomThemeProvider from "./CustomThemeProvider/CustomThemeProvider";

const AppProvider: FCC = ({ children }) => {
  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    </CustomThemeProvider>
  );
};

export default AppProvider;
