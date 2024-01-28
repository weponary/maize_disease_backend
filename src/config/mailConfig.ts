export const mailConfig = {
  host: process.env.MAIL_HOST ?? "smtp.ethereal.email",
  port: Number(process.env.MAIL_PORT) ?? 587,
  user: process.env.MAIL_USER ?? "roxanne.gerlach57@ethereal.email",
  pass: process.env.MAIL_PASSWORD ?? "W98uq61ZHfj7GAbeuJ",
};
