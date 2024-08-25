# Manga Flux Deployment

Manga Flux deployment repository enabling simple backend configuration and deployment.

# Setup

## Prerequisites

### Postgres

**Debian/Ubuntu**

```sh
sudo apt install postgres
```

### PM2

```sh
npm install -g pm2
```

## Installation

### Install Microservice Dependencies

```sh
# Pulls latest version of the microservices
git submodule init
git submodule update
# install packages from main directory and services
npm install
npm run install-deps
```

## **Initialize Databases**

### [Install Postgres](https://www.w3schools.com/postgresql/postgresql_install.php)

### Automatic Setup

#### **Linux**

Sets up environment variables and initializes databases

```sh
./setupEnv.sh
```

### Manual Setup

Log in to your postgres instance and execute the following commands

**Create Database Tables**

```sql
CREATE DATABASE {AUTH_DB_NAME};
CREATE DATABASE {CONTENT_DB_NAME};
```

**Create User**

```sql
CREATE USER {AUTH_DB_USER} WITH LOGIN;
ALTER USER {AUTH_DB_USER} WITH PASSWORD '{AUTH_DB_PASS}';
CREATE USER {CONTENT_DB_USER} WITH LOGIN;
ALTER USER {CONTENT_DB_USER} WITH PASSWORD '{CONTENT_DB_PASS}';
```

**Add Extension**

For each database:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
