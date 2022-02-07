import React from "react";
import { useAxiosInterceptors } from "custom-hooks";
import { theme } from "@constants";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import Router from "router";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";

const ThemeProvider = () => {
  useAxiosInterceptors();
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Router />
      </StyledThemeProvider>
    </MaterialThemeProvider>
  );
};

export default ThemeProvider;
