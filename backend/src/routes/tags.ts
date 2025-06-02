import express, { Request, Response } from "express";
import { Database } from "sqlite";

const router = express.Router();

interface Tag {
  id: number;
  name: string;
}

export default function initTagsRoutes(db: Database) {
  // Get all available tags
  router.get("/", async (req: Request, res: Response) => {
    try {
      const tags = await db.all(
        `SELECT id, name FROM tag ORDER BY name ASC`
      );
      
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  // Create a new tag if it doesn't exist
  router.post("/", async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        res.status(400).json({ error: "Tag name is required" });
        return;
      }

      const tagName = name.trim();
      
      // Check if tag already exists
      const existingTag = await db.get(
        `SELECT id, name FROM tag WHERE name = ? COLLATE NOCASE`,
        tagName
      );
      
      if (existingTag) {
        res.json(existingTag);
        return;
      }
      
      // Create new tag
      const result = await db.run(
        `INSERT INTO tag (name) VALUES (?)`,
        tagName
      );
      
      const newTag = {
        id: result.lastID,
        name: tagName
      };
      
      res.status(201).json(newTag);
    } catch (error) {
      console.error("Error creating tag:", error);
      res.status(500).json({ error: "Failed to create tag" });
    }
  });

  return router;
} 