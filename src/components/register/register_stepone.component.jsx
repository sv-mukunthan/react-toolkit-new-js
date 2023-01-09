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
import { signUpScheam } from "utils/validator.utils";
import Models from "imports/models.imports";
import { useSetState } from "utils/functions.utils";
import { Alert, Select } from "imports/components.imports";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useMemo } from "react";
import { getList } from "country-list-with-dial-code-and-flag";

const RegisterStepOne = ({ onRegister, user }) => {
  const [state, setState] = useSetState({
    alert: false,
    alertMessage: "",
    alertType: "error",
    hidePassword: true,
  });
  const options = useMemo(() => {
    const list = getList();
    let countries = list.map((ls) => {
      return {
        title: ls.dial_code,
        value: ls.dial_code,
      };
    });
    return countries;
  }, []);

  const formik = useFormik({
    initialValues:
      Object.keys(user).length > 0
        ? user
        : {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            phone: "",
            country_code: "+1",
          },
    validationSchema: signUpScheam,
    onSubmit: async (values, actions) => {
      try {
        values.phone = values.phone.toString();
        onRegister(values);
        actions.setSubmitting(false);
      } catch (err) {
        actions.setSubmitting(false);
        setState({ alert: true, alertMessage: err });
      }
    },
  });

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
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4">
              Create Account
            </Typography>
            <Typography color="error" gutterBottom variant="body2">
              All fields are required *
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            fullWidth
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="First Name"
            margin="normal"
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            fullWidth
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Last Name"
            margin="normal"
            name="lastName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastName}
            variant="outlined"
          />
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
            error={Boolean(formik.touched.password && formik.errors.password)}
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
          <Box
            sx={{ mt: 2, mb: 1, flexFlow: 1, width: "100%", display: "flex" }}
          >
            <Select
              options={options}
              style={{ width: { xs: "30%", sm: "30%", md: "30%" } }}
              name="country_code"
              value={formik.values.country_code}
              onChange={(e) =>
                formik.setFieldValue("country_code", e.target.value)
              }
            />
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              sx={{ width: { xs: "70%", sm: "70%", md: "70%" }, ml: 2 }}
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone"
              margin="normal"
              name="phone"
              inputProps={{
                inputMode: "numeric",
              }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="number"
              value={formik.values.phone}
              variant="outlined"
            />
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
              Next
            </Button>
          </Box>
          <Typography color="textSecondary" variant="body1">
            Have an account?{" "}
            <Link
              component={NavLink}
              to="/auth/login"
              variant="subtitle1"
              underline="hover"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Container>
    </>
  );
};

export default RegisterStepOne;
