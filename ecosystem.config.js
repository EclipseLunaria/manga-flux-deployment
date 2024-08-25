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
        ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
      },
      env: {
        NODE_ENV: "development",
        ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
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
      env: {
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
        DB_HOST: process.env.CONTENT_DB_HOST,
        DB_PORT: process.env.CONTENT_DB_PORT,
        DB_USER: process.env.CONTENT_DB_USER,
        DB_PASS: process.env.CONTENT_DB_PASS,
        DB_NAME: process.env.CONTENT_DB_NAME,
      },
      env: {
        NODE_ENV: "development",
        DB_HOST: process.env.CONTENT_DB_HOST,
        DB_PORT: process.env.CONTENT_DB_PORT,
        DB_USER: process.env.CONTENT_DB_USER,
        DB_PASS: process.env.CONTENT_DB_PASS,
        DB_NAME: process.env.CONTENT_DB_NAME,
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
      },
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "authentication",
      script: "node_modules/.bin/ts-node",
      args: "./src/server.ts",
      cwd: "./services/authentication",
      watch: true, // Enable watch mode
      ignore_watch: ["node_modules"],
      env_production: {
        NODE_ENV: "production",
        DB_HOST: process.env.AUTH_DB_HOST,
        DB_PORT: process.env.AUTH_DB_PORT,
        DB_USER: process.env.AUTH_DB_USER,
        DB_PASS: process.env.AUTH_DB_PASS,
        DB_NAME: process.env.AUTH_DB_NAME,
        ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
        CLIENT_BASE_URL: "https://mangaflux.net",
        REDIRECT_URI: "http://localhost:5000/auth/mal/callback",
      },
      env: {
        NODE_ENV: "development",
        DB_HOST: process.env.AUTH_DB_HOST,
        DB_PORT: process.env.AUTH_DB_PORT,
        DB_USER: process.env.AUTH_DB_USER,
        DB_PASS: process.env.AUTH_DB_PASS,
        DB_NAME: process.env.AUTH_DB_NAME,
        ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
        CLIENT_BASE_URL: "http://localhost:6969",
        REDIRECT_URI: "http://localhost:5000/auth/mal/callback",
      },
    },
  ],
};
