import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RegisterStepOne from "components/register/register_stepone.component";
import { useSetState } from "utils/functions.utils";
import RegisterStepThree from "components/verify_otp/verify_otp.component";
import { useNavigate } from "react-router-dom";
import Assets from "imports/assets.imports";
import { createStyles, makeStyles } from "@mui/styles";

const steps = [
  {
    title: "Create Account",
  },
  {
    title: "Verification",
  },
];

const useStyle = makeStyles((theme) =>
  createStyles({
    stepLable: {
      fontSize: "1.1rem",
    },
  })
);

const Register = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = useSetState({
    user: {},
  });
  const classes = useStyle();

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onRegister = (values) => {
    setState({ user: values });
    handleNext();
  };

  const gotoLogin = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          width: "100%",
        }}
        height="100vh"
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
            height: "100%",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflowY: "scroll",
              overflowX: "hidden",
              boxSizing: "border-box",
            }}
            height="100%"
          >
            <Box
              sx={{
                padding: "10px 0",
                width: { sx: "100%", sm: "60%", md: "65%", lg: "60%" },
                display: { sm: "block" },
                maxHeight: "100%",
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
              <Stepper activeStep={activeStep} sx={{ pt: 5 }}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label.title} {...stepProps}>
                      <StepLabel
                        classes={{ label: classes.stepLable }}
                        {...labelProps}
                      >
                        {label.title}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ textAlign: "center", my: 3 }} variant="h4">
                    Account Registration Completed!
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="button"
                      variant="contained"
                      onClick={gotoLogin}
                    >
                      Click here to login
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 ? (
                    <RegisterStepOne
                      onRegister={onRegister}
                      user={state.user}
                    />
                  ) : (
                    <RegisterStepThree
                      user={state.user}
                      onSignUp={handleNext}
                    />
                  )}
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
