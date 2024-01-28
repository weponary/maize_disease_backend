export const databaseConfig = {
  databaseUser: process.env.POSTGRES_USER ?? "postgres.baqysrgxzjkatpbfpdaf",
  databasePassword: process.env.POSTGRES_PASSWORD ?? "Tcs6hHc8g9eKQEFv",
  databaseName: process.env.POSTGRES_DB ?? "postgres",
  databaseHost:
    process.env.POSTGRES_HOST ?? "aws-0-ap-southeast-1.pooler.supabase.com",
};
