# Manga Flux Deployment

## Installation

Install postgresql if not already installed

**Ubuntu**:

```sh
sudo apt install postgresql
```

**Initialize git submodules.**

```sh
git submodule init --recursive
git submodule update --recursive
```

Install project dependencies.

```sh
npm run install-deps
```

### **Create Databases**

**Create Database Tables**

**Create User**

**Add Extension**

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
