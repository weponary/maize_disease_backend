import { resetPasswordEmailTemplate } from "../utils/helper/emailTemplate";

const resetPasswordEmailOption = (user: any, token: any) => {
  const html = resetPasswordEmailTemplate(user, token);

  return {
    from: "noreplay@funolympic",
    to: user.email,
    subject: "Reset Password For Fun Olymic",
    html: html,
  };
};

export { resetPasswordEmailOption };
