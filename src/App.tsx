import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Main } from "./pages";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { theme } from "./utils";

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline enableColorScheme />
      <Stack minHeight="100vh">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />

            {/* 404 Not Found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
