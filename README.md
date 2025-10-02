# Book Club Full‑Stack Application

This repository contains a minimal full‑stack application that manages authors and books for a small book club. The project is designed for clarity, maintainability and a pleasant developer experience. The stack consists of:

- **PostgreSQL** as the database, orchestrated via Docker Compose.
- **Fastify** with **TypeScript** on the backend for a high‑performance API. Fastify emphasises speed, built‑in JSON schema validation and a modular plugin architecture.
- **Prisma** as a migration and data access layer. Prisma’s schema‑first approach generates a type‑safe client from your data model, providing an intuitive and predictable API.
- **React** and **Tailwind CSS** on the frontend. Tailwind is a utility‑first framework that allows you to compose UIs from pre‑defined classes, reducing the need for custom CSS and speeding up developmen.

## Prerequisites

- **Docker Compose** – used to start the PostgreSQL service.
- **Node.js ≥ 18** and **npm** or **yarn**.
- The repository assumes you’re running the backend and frontend on your local machine (the database runs in Docker). Ensure port 5432 is free for PostgreSQL, port 3001 for the API and port 5173 for the frontend dev server.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rofirezkin/book-club-fullstack.git
cd book-club-fullstack
```

### 2. Start PostgreSQL

Use Docker Compose to start a local Postgres instance. The `docker-compose.yml` file defines a `bookclub` database with a default user and password. Data is persisted in the `backend/postgres-data` volume.

```bash
docker compose up -d db
```

### 3. Configure the backend

Move into the backend folder before running commands:

```bash
cd backend
```

1. Install dependencies and generate the Prisma client:

   ```bash
   npm install
   # Generate the type‑safe Prisma client
   npm run generate
   ```

2. Run migrations to create the `authors` and `books` tables:

   ```bash
   # In development you can use migrate:dev which creates a migration and applies it
   npm run migrate:dev
   ```

3. Seed the database with sample authors and books:

   ```bash
   npm run seed
   ```

4. Start the API server:

   ```bash
   npm run dev
   # The server listens on http://localhost:3001
   ```

   The API exposes the following endpoints under `/authors` and `/books`:

   | Endpoint       | Method | Description                                 |
   | -------------- | ------ | ------------------------------------------- |
   | `/authors`     | GET    | List all authors                            |
   | `/authors/:id` | GET    | Get a single author                         |
   | `/authors`     | POST   | Create an author (name is required)         |
   | `/authors/:id` | PUT    | Update an author’s name or bio              |
   | `/authors/:id` | DELETE | Delete an author                            |
   | `/books`       | GET    | List all books with their authors           |
   | `/books/:id`   | GET    | Get a single book                           |
   | `/books`       | POST   | Create a book (title and authorId required) |
   | `/books/:id`   | PUT    | Update a book                               |
   | `/books/:id`   | DELETE | Delete a book                               |

   Validation is defined via JSON schemas to ensure required fields are present and to return helpful 400/404 responses.

### 4. Configure the frontend

1. In a new terminal, install the frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   # Open http://localhost:5173 in your browser
   ```
