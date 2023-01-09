import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { emailSchema, verifySchema } from "utils/validator.utils";
import Models from "imports/models.imports";
import { useSetState } from "utils/functions.utils";
import { Alert } from "imports/components.imports";
import { NavLink, useNavigate } from "react-router-dom";
import Assets from "imports/assets.imports";
import OtpInput from "react-otp-input";
import "components/verify_otp/verify_otp.component.scss";
import { setForgotDetails } from "utils/redux.utils";
import Countdown from "react-countdown";
import { useRef } from "react";

const ForgotPassword = () => {
  const [state, setState] = useSetState({
    alert: false,
    alertMessage: "",
    alertType: "error",
    hidePassword: true,
    resend: true,
    initiated: false,
    date: Date.now(),
    resending: false,
  });
  const navigate = useNavigate();
  const countRef = useRef();

  const forgotPassword = async (values, actions) => {
    try {
      const user = await Models.auth.forgotPassword(values);
      actions.setSubmitting(false);
      setState({
        alert: true,
        alertMessage: user.message,
        alertType: "success",
        initiated: true,
        email: values.email,
        date: Date.now(),
      });
    } catch (err) {
      actions.setSubmitting(false);
      setState({ alert: true, alertMessage: err, alertType: "error" });
    }
  };

  const verifyOtp = async (values, actions) => {
    try {
      const user = await Models.auth.verifyOtp(values);
      setForgotDetails({ ...user.data, email: values.email });
      actions.setSubmitting(false);
      setState({
        alert: true,
        alertMessage: user.message,
        alertType: "success",
        initiated: true,
        email: values.email,
      });

      navigate("/auth/reset_password");
    } catch (err) {
      actions.setSubmitting(false);
      console.log("error", err);
      setState({ alert: true, alertMessage: err, alertType: "error" });
    }
  };

  const formik = useFormik({
    initialValues: state.initiated
      ? { email: state.email, otp: "" }
      : {
          email: "",
        },
    validationSchema: state.initiated ? verifySchema : emailSchema,
    onSubmit: state.initiated ? verifyOtp : forgotPassword,
  });

  const resendOtp = async () => {
    try {
      setState({ resending: true });
      const user = await Models.auth.forgotPassword({ email: state.email });
      setState({
        alert: true,
        alertMessage: user.message,
        alertType: "success",
        date: Date.now(),
        resending: false,
      });
      setTimeout(() => countRef.current?.start(), 1000);
    } catch (err) {
      console.log("resend failed", err);
      setState({
        alert: true,
        alertMessage: err,
        alertType: "error",
        resending: false,
      });
    }
  };

  const resendButton = ({ hours, minutes, seconds, completed }) => {
    return (
      <Box sx={{ py: 2 }}>
        <Button
          color="primary"
          disabled={!completed || state.resending}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={resendOtp}
        >
          {!completed
            ? `Resend OTP in 0${minutes}:${
                seconds.toString().length > 1 ? seconds : "0" + seconds
              }`
            : "Resend OTP"}
        </Button>
      </Box>
    );
  };
  
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
                    Forgot password
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
                  disabled={state.initiated}
                />
                {state.initiated && (
                  <Box
                    sx={{
                      my: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <OtpInput
                      value={formik.values.otp}
                      onChange={(otp) => formik.setFieldValue("otp", otp)}
                      numInputs={6}
                      inputStyle="otp_input_box"
                      isInputNum={true}
                    />
                    {formik.touched.otp && formik.errors.otp && (
                      <div className="error_message">{formik.errors.otp}</div>
                    )}
                  </Box>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {state.initiated ? "Verify OTP" : "Send OTP"}
                  </Button>
                </Box>
                {state.initiated && (
                  <Countdown
                    ref={countRef}
                    autoStart={true}
                    date={
                      state.date +
                      parseInt(process.env.REACT_APP_TIMER_SECONDS) * 1000
                    }
                    renderer={resendButton}
                  />
                )}
                <Typography color="textSecondary" variant="body1">
                  Go to{" "}
                  <Link
                    component={NavLink}
                    to="/auth/login"
                    // variant="subtitle1"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Login
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

export default ForgotPassword;
