import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import defaultTheme from './theme';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
