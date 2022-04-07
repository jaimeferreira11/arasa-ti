import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "../components/home/HomeScreen";
import { LoginScreen } from "../components/login/LoginScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startChecking } from "../actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { checking, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (!checking) {
    try {
      let loader = document.getElementById("loader-wrapper");
      loader.remove();
    } catch (error) {}
  }

  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute
              isAuthenticated={!!token} // para convertir de string a boolean true
            >
              <LoginScreen />
            </PublicRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={!!token}>
              <HomeScreen />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
