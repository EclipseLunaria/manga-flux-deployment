import pg, { Client } from "pg";
import { exit } from "process";
const prompt = require("prompt-sync")({ sigint: true });

const dbExists = async (name: string, client: Client) => {
  return (
    (
      await client.query(
        "SELECT count(*) from pg_database where datname='$1'",
        [name]
      )
    ).rows.length === 1
  );
};

(async () => {
  console.log("Intializing Databases");
  const host = prompt("Enter db host (localhost): ", "localhost") || undefined;
  const port = prompt("Enter db port (5432): ", "5432") || undefined;
  const name = prompt("Enter db Name (postgres): ", "postgres") || undefined;
  const user = prompt("Enter db user (postgres): ", "postgres") || undefined;
  const password =
    prompt("Enter user password (password): ", "password") || undefined;
  const authDbName = prompt(
    "Enter Auth db name (manga_flux_auth): ",
    "manga_flux_auth"
  );
  console.log(host, port, name, user, password);
  const client = new pg.Client({
    user: user,
    database: name,
    password: password,
    port: port,
    host: host,
  });
  client.connect((error: Error) => {
    console.log("Unable to connect to postgres: ", error);
    exit(1);
  });

  console.log(await dbExists(authDbName, client));
})();
