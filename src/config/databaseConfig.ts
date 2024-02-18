export const databaseConfig = {
  databaseUser: process.env.POSTGRES_USER ?? "postgres.ipncvxkfahdqwpsxxlbr",
  databasePassword: process.env.POSTGRES_PASSWORD ?? "maizedisease9870",
  databaseName: process.env.POSTGRES_DB ?? "postgres",
  databaseHost:
    process.env.POSTGRES_HOST ?? "aws-0-ap-southeast-1.pooler.supabase.com",
};
