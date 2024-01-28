const { Client } = require("pg");

const client = new Client({
  user: "postgres.baqysrgxzjkatpbfpdaf",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: "Tcs6hHc8g9eKQEFv",
  port: 5432,
});

return client;

// Connect to the PostgreSQL server
client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err);
  });

// Example query
client.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Error executing query:", err);
  } else {
    console.log("Result of the query:", result.rows);
  }

  // Close the connection
  client.end();
});
