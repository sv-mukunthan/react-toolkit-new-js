import * as Yup from "yup";
const passwordPattern =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
const phoneWith10Digits = /^\d{10}$/;
const stringWithoutSpace = /^\S+$/;
const stringAllowSpecial = /^[a-zA-Z0-9][a-zA-Z0-9\s!-\/:-@*()[-`{-~]*$/;
const stringWithoutSpecial = /^[a-zA-Z0-9]+$/;
const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const signUpScheam = Yup.object({
  firstName: Yup.string()
    .max(255)
    .required("First name is required")
    .matches(stringAllowSpecial, "Please enter valid first name"),
  lastName: Yup.string()
    .max(255)
    .required("Last name is required")
    .matches(stringAllowSpecial, "Please enter valid last name"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .max(18)
    .required("Password is required")
    .matches(
      passwordPattern,
      "Password must contain at least Minimum 8 characters, One Upper Case Character, one Lower Case character, one digit, one symbol/special character '@$!%*#?&^_-'"
    ),
  country_code: Yup.string().required("Country code is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(phoneWith10Digits, "Please enter valid phone number"),
  // .test("Test", "Please enter valid phone number.", function (value) {
  //   const parent = this.parent;
  //   let number = "+" + parent.country_code + value;
  //   return matchIsValidTel(number);
  // }),
});

export const otpSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const emailSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

export const verifySchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .min(6, "OTP must be atleast 6 characters."),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

export const resetPasswordScheam = Yup.object({
  password: Yup.string()
    .max(18)
    .required("Password is required")
    .matches(
      passwordPattern,
      "Password must contain at least Minimum 8 characters, One Upper Case Character, one Lower Case character, one digit, one symbol/special character '@$!%*#?&^_-'"
    ),
  confirm_password: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
