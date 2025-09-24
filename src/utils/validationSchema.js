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

export const UpdateAddressSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Must be a valid 6-digit pincode")
    .required("Pincode is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
});

export const UpdatePasswordSchema = Yup.object({
  old_password: Yup.string()
    .min(6, "Old password must be at least 6 characters")
    .required("Old password is required"),
  new_password: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("New password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const AccountDetailsSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
});

export const SignUpModalSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number, and one special character"
    ),
  terms: Yup.boolean().oneOf([true], "Please accept the terms & conditions"),
});

export const CancelOrderSchema = Yup.object({
  reject_reason_select: Yup.string()
    .required("Please select a reason")
    .test(
      "reason-not-empty",
      "Please select a valid reason",
      (value) => value && value.trim() !== ""
    ),
  reject_reason_input: Yup.string().when("reject_reason_select", {
    is: "Other",
    then: (schema) =>
      schema
        .trim()
        .required("Please specify your reason")
        .min(1, "Reason cannot be empty"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
});
