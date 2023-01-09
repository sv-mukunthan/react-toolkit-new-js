import { lazy } from "react";
import { ChartBar as ChartBarIcon } from "assets/icons/chart-bar";

// Roles
const { Roles } = require("./constant.utils");

// screens
const Signup = lazy(() => import("screens/auth/signup/signup.screen"));
const Login = lazy(() => import("screens/auth/login/login.screen"));
const Home = lazy(() => import("screens/home/home.screen"));
const ForgotPassword = lazy(() =>
  import("screens/auth/forgot_password/forgot_password.screen")
);
const ResetPassword = lazy(() =>
  import("screens/auth/reset_password/reset_password.screen")
);
const VerifyEmail = lazy(() =>
  import("screens/auth/verify_email/verify_email.screen")
);

export const privateRoutes = [
  {
    path: "/",
    title: "Dashboard",
    element: Home,
    permissions: [Roles.SUPER_ADMIN, Roles.CORPORATE_USER],
    icon: <ChartBarIcon fontSize="small" />,
  },
];

export const authRoutes = [
  {
    path: "signup",
    title: "Signup",
    element: Signup,
  },
  {
    element: Login,
    path: "login",
    title: "Login",
  },
  {
    path: "forgot_password",
    title: "Forgot Password",
    element: ForgotPassword,
  },
  {
    path: "reset_password",
    title: "Reset Password",
    element: ResetPassword,
  },
  {
    element: VerifyEmail,
    path: "verify_email",
    title: "Verify Email",
  },
];

export const privateRouteWithoutMain = [
  {
    element: () => (
      <div>
        <h1>TEST</h1>
      </div>
    ),
    path: "test",
    permissions: [Roles.CORPORATE_USER],
  },
];
