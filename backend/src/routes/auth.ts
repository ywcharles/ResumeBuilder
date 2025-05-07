import express, { Request, Response } from "express";
import { Database } from "sqlite";

const router = express.Router();

export default function initAuthRoutes(db: Database) {
  router.post("/login", (req: Request, res: Response) => {
    // TODO: Implement login logic
    res.json({ message: "Login successful" });
  });
  
  return router;
}