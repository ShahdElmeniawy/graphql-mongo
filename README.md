# GraphQL API with MongoDB

A GraphQL API built with Apollo Server 4 and MongoDB (Mongoose)

---

## Download Project

### clone project

```bash
git clone https://github.com/ShahdElmeniawy/graphql-mongo.git
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Add `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/graphql_db
PORT=3200
```

### 3. Seed the database

```bash
npm run seed
```

### 4. Start the server

```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

Server runs at: `http://localhost:3200`

---
