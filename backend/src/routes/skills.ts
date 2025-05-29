import express, { Request, Response } from "express";
import { Database } from "sqlite";
import { Skill, FrontendSkillsSection } from "../types/skills.js";

const router = express.Router();

export default function initSkillsRoutes(db: Database) {
  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const skills = await db.all(
        `SELECT id, user_id, resume_id, name, order_num, created_at, updated_at
         FROM skill 
         WHERE resume_id = ? 
         ORDER BY order_num ASC`,
        resumeId
      );

      const response: FrontendSkillsSection = {
        skills: skills.map(skill => skill.name)
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching resume skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  router.get("/user/:userId/bank", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      const skills = await db.all(
        `SELECT DISTINCT name
         FROM skill 
         WHERE user_id = ? 
         ORDER BY name ASC`,
        userId
      );

      const response: FrontendSkillsSection = {
        skills: skills.map(skill => skill.name)
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching user skills for bank:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  router.put("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { skills, userId } = req.body;

      if (!Array.isArray(skills)) {
        res.status(400).json({ error: "Skills must be an array" });
        return;
      }

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      await db.run("BEGIN TRANSACTION");

      try {
        await db.run(
          "DELETE FROM skill WHERE resume_id = ?",
          resumeId
        );

        for (let i = 0; i < skills.length; i++) {
          const skillName = skills[i].trim();
          if (skillName) {
            await db.run(
              `INSERT INTO skill (
                user_id, resume_id, name, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              userId,
              resumeId,
              skillName,
              i + 1,
              new Date().toISOString(),
              new Date().toISOString()
            );
          }
        }

        await db.run("COMMIT");

        const response: FrontendSkillsSection = {
          skills: skills.filter(skill => skill.trim() !== '')
        };

        res.json(response);
      } catch (error) {
        await db.run("ROLLBACK");
        throw error;
      }
    } catch (error) {
      console.error("Error updating resume skills:", error);
      res.status(500).json({ error: "Failed to update skills" });
    }
  });

  router.post("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { skill, userId } = req.body;

      if (!skill || !skill.trim()) {
        res.status(400).json({ error: "Skill name is required" });
        return;
      }

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      const maxOrderResult = await db.get(
        "SELECT MAX(order_num) as max_order FROM skill WHERE resume_id = ?",
        resumeId
      );
      const nextOrder = (maxOrderResult?.max_order || 0) + 1;

      const result = await db.run(
        `INSERT INTO skill (
          user_id, resume_id, name, order_num, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        userId,
        resumeId,
        skill.trim(),
        nextOrder,
        new Date().toISOString(),
        new Date().toISOString()
      );

      const newSkill: Skill = {
        id: result.lastID!,
        user_id: userId,
        resume_id: parseInt(resumeId),
        name: skill.trim(),
        order_num: nextOrder,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      res.status(201).json(newSkill);
    } catch (error) {
      console.error("Error adding skill:", error);
      res.status(500).json({ error: "Failed to add skill" });
    }
  });

  router.delete("/:skillId", async (req: Request, res: Response) => {
    try {
      const { skillId } = req.params;

      const result = await db.run(
        "DELETE FROM skill WHERE id = ?",
        skillId
      );

      if (result.changes === 0) {
        res.status(404).json({ error: "Skill not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ error: "Failed to delete skill" });
    }
  });

  return router;
} 