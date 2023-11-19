import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your Email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
  passwordConfirm: Yup.string()
    .min(6)
    .required("Please enter your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email ID"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email ID is required"),
});

export const resetYourPassword = Yup.object({
  password: Yup.string().min(6).required("Please enter your new password!"),
  passwordConfirm: Yup.string()
    .min(6)
    .required("Please confirm your new password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const emailSenderSchema = Yup.object({
  from: Yup.string().email().required("Please enter your email ID"),
});
