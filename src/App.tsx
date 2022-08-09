import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";

import AppContainer from "./components/layout/AppContainer";
import Home from "./components/Home";
import Users from "./components/Users";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";

import Storage from "./services/storage";
import { useAppSelector, useAppDispatch } from "./services/hook";
import { loginWithToken } from "./components/auth/authSlice";

import theme from "./theme";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const token = Storage.get("access_token");

    if (token) {
      dispatch(loginWithToken(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderRoutes = () => {
    if (user) {
      return (
        <Routes>
          <Route path="/" element={<AppContainer />}>
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{renderRoutes()}</BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
