import express from 'express';
import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";
import * as url from "url";
import path, { parse } from "path";
import initAuthRoutes from './routes/auth.js';
import initExperienceRoutes from './routes/experience.js';
import initHeaderRoutes from './routes/header.js';
import initSkillsRoutes from './routes/skills.js';
import initEducationRoutes from './routes/education.js';
import cors from 'cors';

let __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbfile = path.resolve(__dirname, "..", "database.db");
let db = await sqlite.open({
  filename: dbfile,
  driver: sqlite3.Database,
});

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Initialize routes
app.use("/auth", initAuthRoutes(db));
app.use("/api/experiences", initExperienceRoutes(db));
app.use("/api/header", initHeaderRoutes(db));
app.use("/api/skills", initSkillsRoutes(db));
app.use("/api/education", initEducationRoutes(db));

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
