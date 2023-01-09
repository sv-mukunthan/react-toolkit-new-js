import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { resetPasswordScheam } from "utils/validator.utils";
import Models from "imports/models.imports";
import { useSetState } from "utils/functions.utils";
import { Alert } from "imports/components.imports";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Assets from "imports/assets.imports";
import "components/verify_otp/verify_otp.component.scss";
import { useSelector } from "react-redux";
import { setForgotDetails } from "utils/redux.utils";

const ResetPassword = () => {
  const [state, setState] = useSetState({
    alert: false,
    alertMessage: "",
    alertType: "error",
    hidePassword: true,
    resend: true,
    initiated: false,
    hideConfirmPassword: true,
  });
  const navigate = useNavigate();
  const forgotDetails = useSelector((state) => state.user.forgotDetail);

  const setNewPassword = async (values, actions) => {
    try {
      values.hash = forgotDetails.forgot_password_hash;
      const user = await Models.auth.resetPassword(values);
      setForgotDetails({});
      setState({
        alert: true,
        alertMessage: user.message,
        alertType: "success",
        initiated: true,
        email: values.email,
      });
      actions.setSubmitting(false);
      actions.resetForm();
      await setTimeout(async () => navigate("/auth/login"), 2000);
    } catch (err) {
      actions.setSubmitting(false);
      setState({ alert: true, alertMessage: err, alertType: "error" });
    }
  };

  const formik = useFormik({
    initialValues: { password: "", confirm_password: "" },
    validationSchema: resetPasswordScheam,
    onSubmit: setNewPassword,
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
                    Set your new password here
                  </Typography>
                </Box>
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
                <TextField
                  id="outlined-adornment-password"
                  error={Boolean(
                    formik.touched.confirm_password &&
                      formik.errors.confirm_password
                  )}
                  fullWidth
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                  label="Confirm Password"
                  margin="normal"
                  name="confirm_password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setState({
                              hideConfirmPassword: !state.hideConfirmPassword,
                            })
                          }
                          edge="end"
                        >
                          {state.hideConfirmPassword ? (
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
                  type={state.hideConfirmPassword ? "password" : "text"}
                  value={formik.values.confirm_password}
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
                    Set New Password
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ResetPassword;
