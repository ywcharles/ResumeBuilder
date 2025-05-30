import express, { Request, Response } from "express";
import { Database } from "sqlite";
import { Skill, FrontendSkillsSection } from "../types/skills.js";

const router = express.Router();

export default function initSkillsRoutes(db: Database) {
  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const skills = await db.all(
        `SELECT s.id, s.user_id, s.name, s.created_at, s.updated_at, rs.order_num
         FROM skill s
         INNER JOIN resume_skill rs ON s.id = rs.skill_id
         WHERE rs.resume_id = ? 
         ORDER BY rs.order_num ASC`,
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
        `SELECT id, user_id, name, created_at, updated_at
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
          "DELETE FROM resume_skill WHERE resume_id = ?",
          resumeId
        );

        for (let i = 0; i < skills.length; i++) {
          const skillName = skills[i].trim();
          if (skillName) {
            let existingSkill = await db.get(
              "SELECT id FROM skill WHERE user_id = ? AND name = ?",
              userId,
              skillName
            );

            let skillId: number;

            if (existingSkill) {
              skillId = existingSkill.id;
            } else {
              const result = await db.run(
                `INSERT INTO skill (
                  user_id, name, created_at, updated_at
                ) VALUES (?, ?, ?, ?)`,
                userId,
                skillName,
                new Date().toISOString(),
                new Date().toISOString()
              );
              skillId = result.lastID!;
            }

            await db.run(
              `INSERT INTO resume_skill (
                resume_id, skill_id, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?)`,
              resumeId,
              skillId,
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
      const { skill, userId, existingSkillId } = req.body;

      if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
      }

      let skillId: number;

      if (existingSkillId) {
        skillId = existingSkillId;
        
        const existingLink = await db.get(
          `SELECT id FROM resume_skill WHERE resume_id = ? AND skill_id = ?`,
          resumeId,
          skillId
        );

        if (existingLink) {
          res.status(400).json({ error: "Skill already added to this resume" });
          return;
        }
      } else {
        if (!skill || !skill.trim()) {
          res.status(400).json({ error: "Skill name is required" });
          return;
        }

        const existingSkill = await db.get(
          "SELECT id FROM skill WHERE user_id = ? AND name = ?",
          userId,
          skill.trim()
        );

        if (existingSkill) {
          skillId = existingSkill.id;
        } else {
          const result = await db.run(
            `INSERT INTO skill (
              user_id, name, created_at, updated_at
            ) VALUES (?, ?, ?, ?)`,
            userId,
            skill.trim(),
            new Date().toISOString(),
            new Date().toISOString()
          );
          skillId = result.lastID!;
        }
      }

      const maxOrderResult = await db.get(
        "SELECT MAX(order_num) as max_order FROM resume_skill WHERE resume_id = ?",
        resumeId
      );
      const nextOrder = (maxOrderResult?.max_order || 0) + 1;

      await db.run(
        `INSERT INTO resume_skill (
          resume_id, skill_id, order_num, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?)`,
        resumeId,
        skillId,
        nextOrder,
        new Date().toISOString(),
        new Date().toISOString()
      );

      res.status(201).json({
        message: "Skill added successfully",
        skillId
      });
    } catch (error) {
      console.error("Error adding skill:", error);
      res.status(500).json({ error: "Failed to add skill" });
    }
  });

  router.delete("/resume/:resumeId/skill/:skillId", async (req: Request, res: Response) => {
    try {
      const { resumeId, skillId } = req.params;

      await db.run(
        "DELETE FROM resume_skill WHERE resume_id = ? AND skill_id = ?", 
        resumeId, 
        skillId
      );

      res.json({ message: "Skill removed from resume successfully" });
    } catch (error) {
      console.error("Error removing skill from resume:", error);
      res.status(500).json({ error: "Failed to remove skill from resume" });
    }
  });

  router.delete("/:skillId", async (req: Request, res: Response) => {
    try {
      const { skillId } = req.params;

      await db.run("DELETE FROM resume_skill WHERE skill_id = ?", skillId);
      
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
      console.error("Error deleting skill from bank:", error);
      res.status(500).json({ error: "Failed to delete skill from bank" });
    }
  });

  return router;
} 