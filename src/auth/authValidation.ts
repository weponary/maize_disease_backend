import { z } from "zod";

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is rsequired",
  }),
  password: z.string({
    required_error: "Password is required",
  }),
});

const forgetPasswordSechema = z.object({
  email: z
    .string({
      required_error: "Email is Required",
      invalid_type_error: "Email must be String",
    })
    .email({ message: "Invalid email format" }),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Password is Required",
        invalid_type_error: "Password must be string",
      })
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    confirmPassword: z.string({
      required_error: "ConfirmPassword is required",
      invalid_type_error: "ConfirmPassword must be string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password And confirmPassword dose'nt match",
    path: ["password", "confirmPassword"], // path of error
  });
export { resetPasswordSchema, forgetPasswordSechema, loginSchema };
