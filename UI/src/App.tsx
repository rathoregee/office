
import { SignIn } from "./pages/SignIn";
import { Test } from "./pages/Test";
import { Sample } from "./pages/pdf";
import { SuccessPage } from "./pages/Success";
import { TopBar } from "./pages/TopBar";
import { Tenency } from "./pages/Tenency";
import { TenencyList } from "./pages/TenencyList";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const TopPage = () => (
  <div>
    <ThemeProvider theme={theme}>
      <TopBar />
      <TenencyList></TenencyList>
    </ThemeProvider>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <div className="App">
          <header className="App-header">
            {/* <Test /> */}
            {/* <TenencyList></TenencyList> */}
          </header>
        </div>
      </CssVarsProvider>
    </StyledEngineProvider>
  </div>
);

function App() {

  const auth = useAuth();

  if (auth.isLoading) {
    return <h1>Loading ....</h1>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="success" element={<SuccessPage />}></Route>
        <Route path="pdf" element={<Sample />}></Route>
        <Route path="tenency" element={<Tenency />}></Route>           
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
