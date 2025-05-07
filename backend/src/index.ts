import express from 'express';
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import * as url from "url";
import path, { parse } from "path";
import initAuthRoutes from './routes/auth.js';

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbfile = path.resolve(__dirname, "..", "database.db");
let db = await sqlite.open({
  filename: dbfile,
  driver: sqlite3.Database,
});

const app = express();
const PORT = 3001;

app.use(express.json());

// Initialize routes
app.use("/auth", initAuthRoutes(db));

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
