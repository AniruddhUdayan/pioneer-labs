import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // For loading indicator

const Home = lazy(() => import("./pages/Home"));
const Organization = lazy(() => import("./pages/Organization"));
const Assets = lazy(() => import("./pages/Assets"));
const Trade = lazy(() => import("./pages/Trade"));
const SideBar = lazy(() => import("./components/shared/SideBar"));

const theme = createTheme({
  palette: {
    background: {
      default: "#000",
    },
    text: {
      primary: "#fff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="flex flex-col sm:flex-row">
          <Suspense fallback={<CircularProgress />}>
            <SideBar />
          </Suspense>
          <div className="">
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/organization" element={<Organization />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/trade" element={<Trade />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
