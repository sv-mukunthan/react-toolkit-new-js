import { useFormik } from "formik";
import { Box, Button, Container, Typography } from "@mui/material";
import { otpSchema } from "utils/validator.utils";
import Models from "imports/models.imports";
import { useSetState } from "utils/functions.utils";
import { Alert } from "imports/components.imports";
import OtpInput from "react-otp-input";
import "./verify_otp.component.scss";
import { useRef } from "react";
import Countdown from "react-countdown";

const RegisterStepThree = ({ onSignUp, user }) => {
  const [state, setState] = useSetState({
    alert: false,
    alertMessage: "",
    alertType: "error",
    hidePassword: true,
    resending: false,
    date: Date.now(),
  });
  const countRef = useRef();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values, actions) => {
      try {
        values.email = user.email;
        actions.setSubmitting(false);
        onSignUp(values);
      } catch (err) {
        actions.setSubmitting(false);
        console.log("error", err);
        setState({ alert: true, alertMessage: err, alertType: "error" });
      }
    },
  });

  const resendVerification = async () => {
    try {
      setState({ resending: true });
      const userData = await Models.auth.resendVerification({
        email: user.email,
      });
      setState({
        alert: true,
        alertMessage: userData.message,
        alertType: "success",
        date: Date.now(),
        resending: false,
      });
      setTimeout(() => countRef.current?.start(), 1000);
    } catch (err) {
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
          onClick={resendVerification}
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
      <Container sx={{ pt: 2, pb: 5 }}>
        {state.alert && (
          <Alert
            message={state.alertMessage}
            open={state.alert}
            type={state.alertType}
            close={() => setState({ alert: false })}
          />
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          <Box sx={{ my: 3, textAlign: "center" }}>
            <Typography color="textPrimary" variant="h4">
              Account Verification
            </Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Enter your OTP that send to your registered email
            </Typography>
          </Box>
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
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Verify OTP
            </Button>
          </Box>
          <Countdown
            ref={countRef}
            autoStart={true}
            date={
              state.date + parseInt(process.env.REACT_APP_TIMER_SECONDS) * 1000
            }
            renderer={resendButton}
          />
        </form>
      </Container>
    </>
  );
};

export default RegisterStepThree;
