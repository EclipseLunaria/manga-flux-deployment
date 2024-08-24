const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  apps: [
    {
      name: "gateway",
      script: "server.ts", // Specify the entry file
      interpreter: "npx", // Use 'npx' as the interpreter
      interpreterArgs: "ts-node", // Use 'ts-node' as an argument for the interpreter
      cwd: path.join(__dirname, "services/api-gateway/gateway"), // Ensure this path is correct
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"], // Ignore changes in node_modules
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
    {
      name: "series-info", // Name of the application
      script: "index.ts", // Specify the entry file
      interpreter: "npx", // Use 'npx' as the interpreter
      interpreterArgs: "ts-node", // Use 'ts-node' as an argument for the interpreter
      cwd: path.join(__dirname, "services/series-info/src"), // Ensure this path is correct
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"], // Ignore changes in node_modules
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
    {
      name: "database",
      script: "node_modules/.bin/ts-node",
      args: "./index.ts",
      cwd: "./services/database/src",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
    {
      name: "distribution",
      script: "index.ts", // Specify the entry file
      interpreter: "npx", // Use 'npx' as the interpreter
      interpreterArgs: "ts-node", // Use 'ts-node' as an argument for the interpreter
      cwd: path.join(__dirname, "services/distribution/src"), // Ensure this path is correct
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"], // Ignore changes in node_modules
      env_production: {
        NODE_ENV: "production",
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
      },
      env_development: {
        NODE_ENV: "development",
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
      },
    },
    {
      name: "authenticator",
      script: "node_modules/.bin/ts-node",
      args: "./src/server.ts",
      cwd: "./services/authentication",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
