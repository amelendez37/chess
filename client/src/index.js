import React from "react";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./app.jsx";

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: 'Montserrat', sans-serif;
  }
`;

render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
