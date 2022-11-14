import * as yup from "yup";

//User validation
export const SignInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

//Registration validation
export const SignUpSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});
