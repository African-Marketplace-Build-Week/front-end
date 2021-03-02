import * as yup from "yup";

const validationForm = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be 5 characters long")
    .required("Username is required, please fill out."),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least one letter and one number"
    ),
  country: yup.string().required("Please choose your country"),
  user_info: yup.string(),
});

export default validationForm;
