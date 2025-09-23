import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
});

export const SignupSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
  mobile: Yup.string()
    .matches(/^[1-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  terms: Yup.boolean().oneOf([true], "Please accept the terms & conditions"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),

  confirm_password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .oneOf(
      [Yup.ref("password"), null],
      "New Passwords and Confirm Password must match"
    ),
});

export const ContactSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
  phone_number: Yup.string()
    .matches(/^[1-9]\d{9}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  subscribe: Yup.boolean(),
});

export const CheckoutSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
      "Enter a valid email address"
    ),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Must be a valid 6-digit pincode")
    .required("Pincode is required"),
  alt_phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
    .notRequired(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});
