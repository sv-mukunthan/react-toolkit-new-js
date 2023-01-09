import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { loginSchema } from "utils/validator.utils";
import { useSetState } from "utils/functions.utils";
import { Alert } from "imports/components.imports";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Assets from "imports/assets.imports";
import { useAuth } from "utils/useAuthContext";

const Login = () => {
  const [state, setState] = useSetState({
    alert: false,
    alertMessage: "",
    alertType: "error",
    hidePassword: true,
  });
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        console.log("values", values);
        await login(values);
        actions.setSubmitting(false);
      } catch (err) {
        actions.setSubmitting(false);
        setState({ alert: true, alertMessage: err });
      }
    },
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Container
          maxWidth="100%"
          style={{
            padding: 0,
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
              display: {
                xs: "none",
                md: "flex",
                sm: "none",
                justifyContent: "center",
                alignItems: "center",
              },
              bgcolor: "lightgray",
            }}
            minHeight="100%"
          >
            <Box sx={{ width: "100%" }} textAlign="center">
              <img
                alt="solo_secure_logo"
                src={Assets.SoloSecureLogo}
                style={{
                  width: "35%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              px: 3,
              width: { sx: "100%", sm: "100%", md: "60%", lg: "50%" },
              display: {
                sm: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: { sx: "100%", sm: "60%", md: "65%", lg: "55%" },
                display: { sm: "block" },
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit(e);
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    my: 4,
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                  textAlign="center"
                >
                  <img
                    alt="solo_secure_logo"
                    src={Assets.SoloSecureLogo}
                    style={{
                      width: "60%",
                      height: "50%",
                    }}
                  />
                </Box>
                {state.alert && (
                  <Alert
                    message={state.alertMessage}
                    open={state.alert}
                    type={state.alertType}
                    close={() => setState({ alert: false })}
                  />
                )}
                <Box sx={{ my: 3 }}>
                  <Typography color="textPrimary" variant="h4">
                    Sign in to your account
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enter your registered email
                  </Typography> */}
                </Box>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  id="outlined-adornment-password"
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setState({ hidePassword: !state.hidePassword })
                          }
                          edge="end"
                        >
                          {state.hidePassword ? (
                            <Visibility color="red" />
                          ) : (
                            <VisibilityOff color="red" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={state.hidePassword ? "password" : "text"}
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  textAlign={"center"}
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    component={NavLink}
                    to="/auth/signup"
                    // variant="subtitle1"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Signup
                  </Link>
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  textAlign={"center"}
                >
                  Forgot your password?{" "}
                  <Link
                    component={NavLink}
                    to="/auth/forgot_password"
                    // variant="subtitle1"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Click here
                  </Link>
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  textAlign={"center"}
                >
                  Email not verified?{" "}
                  <Link
                    component={NavLink}
                    to="/auth/verify_email"
                    // variant="subtitle1"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Verify here
                  </Link>
                </Typography>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
