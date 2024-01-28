import bycrypt from "bcryptjs";
import { verifyEmailTemplate } from "../utils/helper/emailTemplate";
// import { IUser } from "./detect";
const hashPassword = async (password: string) => {
  const salt = await bycrypt.genSalt(10);
  return await bycrypt.hash(password, salt);
};

// const mailOption = (data: IUser) => {
//   const html = verifyEmailTemplate(data);
//   return {
//     from: "noreplay@maizedetection.np",
//     to: data.email,
//     subject: "Verify Maize Disease Detection System App",
//     html: html,
//   };
// };
export { hashPassword };
