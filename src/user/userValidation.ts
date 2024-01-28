import { z } from "zod";

const userSchema = z
  .object({
    firstName: z
      .string({
        required_error: "UserName is Requireds",
        invalid_type_error: "Username must be string",
      })
      .min(1, { message: "UserName Cannot Be Empty" }),
    lastName: z
      .string({
        required_error: "UserName is Requireds",
        invalid_type_error: "Username must be string",
      })
      .min(1, { message: "UserName Cannot Be Empty" }),

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
    }),
    email: z
      .string({
        required_error: "Email is Required",
        invalid_type_error: "Email must be string",
      })
      .email({
        message: "Invalid Email Format",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password And confirmPassword dose'nt match",
    path: ["password", "confirmPassword"], // path of error
  });

const changePasswordSchema = z.object({
  currentPassword: z.string({
    required_error: "Current Password",
  }),
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
  }),
});

export { userSchema, changePasswordSchema };
