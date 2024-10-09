import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  const theme = {
    button: {
      defaultProps: { variant: "filled", color: "blue" },
    },
  };
  return (
    <ThemeProvider value={theme}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
