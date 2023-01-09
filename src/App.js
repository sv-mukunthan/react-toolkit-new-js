import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "layout/auth.layout";
import React, { lazy, Suspense, useEffect } from "react";
import { PrivateLayout } from "layout/private.layout";
import { useSelector } from "react-redux";
import { getAllowedRoutes } from "utils/functions.utils";
import {
  privateRoutes,
  authRoutes,
  privateRouteWithoutMain,
} from "utils/routes.utils";
import Loader from "components/loader/loader";
import uuid from "react-uuid";
import { useLocalStorage } from "utils/useLocalStorage";
const NotFound = lazy(() => import("screens/page_404/page_404"));

function App() {
  const user = useSelector((state) => state.user.userDetails);
  const [token, setToken] = useLocalStorage("token");
  const allowedRoutes = getAllowedRoutes(privateRoutes, ["CORPORATE_USER"]);
  const allowesRoutesWithoutMain = getAllowedRoutes(privateRouteWithoutMain, [
    "CORPORATE_USER",
  ]);

  useEffect(() => {
    if (token) {
      console.log("User logged in");
    } else {
      console.log("User Not looged in");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        {authRoutes.map((router, index) => {
          const { path, element: Component } = router;
          return (
            <Route
              index={path === "/login"}
              key={uuid()}
              path={path}
              element={
                <Suspense fallback={<Loader auth={true} />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
        <Route
          path={"*"}
          element={
            <Suspense fallback={<Loader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/"
        element={<PrivateLayout sidebar router={allowedRoutes} />}
      >
        {allowedRoutes.map((router, index) => {
          const { path, element: Component } = router;
          return (
            <Route
              key={uuid()}
              index={path === "/" ? true : false}
              path={path !== "/" ? path : ""}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route path="/" element={<PrivateLayout router={allowedRoutes} />}>
        {allowesRoutesWithoutMain.map((router, index) => {
          const { path, element: Component } = router;
          return (
            <Route
              key={uuid()}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Route>
      <Route
        path={"*"}
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
