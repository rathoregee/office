
import { SignIn } from "./pages/SignIn";
import React, { useEffect } from 'react'
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
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './redux/reducers/rootReducer';
import { fetchEmployees } from './redux/reducers/data';

import { Provider, useSelector, useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const TopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading } = useSelector((state: RootState) => state.employees);
  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])
  let renderedList =
    loading !== 'idle' ? (
      <p>Loading...</p>
    ) : (
      employees !== undefined &&
      employees.map((employee) => (
        <div key={employee.id}>
          <p >Employee_id : {employee.id}</p>
          <p >Employee Name : {employee.employee_name}</p>
          <p >Employee Salary : {employee.employee_salary}</p>
          <p >Employee Age : {employee.employee_age}</p>
        </div>
      ))
    );

  return (
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
              {renderedList}
            </header>
          </div>
        </CssVarsProvider>
      </StyledEngineProvider>
    </div>
  );
}

function App() {

  const auth = useAuth();

  if (auth.isLoading) {
    return <h1>Loading ....</h1>;
  }
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
