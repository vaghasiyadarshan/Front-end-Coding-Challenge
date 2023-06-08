import "./App.css";
import Home from "./Pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

export default App;
