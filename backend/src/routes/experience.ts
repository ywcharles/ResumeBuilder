import express, { Request, Response } from "express";
import { Database } from "sqlite";
import {
  ExperienceWithBullets,
  FrontendExperienceItem,
  FrontendExperienceSection
} from "../types/experience.js";

const router = express.Router();

function transformToFrontendFormat(dbExperience: ExperienceWithBullets): FrontendExperienceItem {
  return {
    id: dbExperience.id.toString(),
    company: dbExperience.company_name,
    position: dbExperience.position,
    location: dbExperience.location,
    startDate: dbExperience.start_date,
    endDate: dbExperience.end_date || '',
    current: !dbExperience.end_date,
    bullets: dbExperience.bullets
      .filter(bullet => bullet.content && bullet.content.trim())
      .map(bullet => bullet.content)
  };
}

export default function initExperienceRoutes(db: Database) {
  router.get("/user/:userId/bank", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      // Get all experiences for the user
      const experiences = await db.all(
        `SELECT 
          id, user_id, resume_id, company_name, position, location, 
          start_date, end_date, is_selected, created_at, updated_at
         FROM experience 
         WHERE user_id = ? 
         ORDER BY start_date DESC`,
        userId
      );

      // Get bullet points for each experience
      const experiencesWithBullets: ExperienceWithBullets[] = [];
      
      for (const experience of experiences) {
        const bullets = await db.all(
          `SELECT id, experience_id, content, is_selected, order_num, created_at, updated_at
           FROM bullet_point 
           WHERE experience_id = ? 
           ORDER BY order_num ASC`,
          experience.id
        );
        
        experiencesWithBullets.push({
          ...experience,
          bullets
        });
      }

      const frontendExperiences = experiencesWithBullets.map(transformToFrontendFormat);
      
      const response: FrontendExperienceSection = {
        items: frontendExperiences
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching user experiences for bank:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const experiences = await db.all(
        `SELECT 
          id, user_id, resume_id, company_name, position, location, 
          start_date, end_date, is_selected, created_at, updated_at
         FROM experience 
         WHERE resume_id = ? 
         ORDER BY start_date DESC`,
        resumeId
      );

      const experiencesWithBullets: ExperienceWithBullets[] = [];
      
      for (const experience of experiences) {
        const bullets = await db.all(
          `SELECT id, content, is_selected, order_num 
           FROM bullet_point 
           WHERE experience_id = ? 
           ORDER BY order_num ASC`,
          experience.id
        );
        
        experiencesWithBullets.push({
          ...experience,
          bullets
        });
      }

      res.json(experiencesWithBullets);
    } catch (error) {
      console.error("Error fetching resume experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  router.get("/:experienceId", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;
      
      const experience = await db.get(
        `SELECT 
          id, user_id, resume_id, company_name, position, location, 
          start_date, end_date, is_selected, created_at, updated_at
         FROM experience 
         WHERE id = ?`,
        experienceId
      );

      if (!experience) {
        res.status(404).json({ error: "Experience not found" });
        return;
      }

      const bullets = await db.all(
        `SELECT id, content, is_selected, order_num 
         FROM bullet_point 
         WHERE experience_id = ? 
         ORDER BY order_num ASC`,
        experienceId
      );

      const experienceWithBullets: ExperienceWithBullets = {
        ...experience,
        bullets
      };

      res.json(experienceWithBullets);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ error: "Failed to fetch experience" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const {
        userId,
        resumeId,
        companyName,
        position,
        location,
        startDate,
        endDate,
        bullets = []
      } = req.body;

      const result = await db.run(
        `INSERT INTO experience (
          user_id, resume_id, company_name, position, location, 
          start_date, end_date, is_selected, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        userId,
        resumeId,
        companyName,
        position,
        location,
        startDate,
        endDate || null,
        true,
        new Date().toISOString(),
        new Date().toISOString()
      );

      const experienceId = result.lastID;

      if (bullets.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          if (bullet.content && bullet.content.trim()) {
            await db.run(
              `INSERT INTO bullet_point (
                experience_id, content, is_selected, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              experienceId,
              bullet.content,
              bullet.is_selected !== undefined ? bullet.is_selected : true,
              i + 1,
              new Date().toISOString(),
              new Date().toISOString()
            );
          }
        }
      }

      res.status(201).json({
        message: "Experience created successfully",
        experienceId
      });
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(500).json({ error: "Failed to create experience" });
    }
  });

  router.put("/:experienceId", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;
      const {
        companyName,
        position,
        location,
        startDate,
        endDate,
        isSelected,
        bullets = []
      } = req.body;

      await db.run(
        `UPDATE experience SET 
          company_name = ?, position = ?, location = ?, start_date = ?, 
          end_date = ?, is_selected = ?, updated_at = ?
         WHERE id = ?`,
        companyName,
        position,
        location,
        startDate,
        endDate || null,
        isSelected,
        new Date().toISOString(),
        experienceId
      );

      await db.run("DELETE FROM bullet_point WHERE experience_id = ?", experienceId);

      if (bullets.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          if (bullet.content && bullet.content.trim()) {
            await db.run(
              `INSERT INTO bullet_point (
                experience_id, content, is_selected, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              experienceId,
              bullet.content,
              bullet.is_selected !== undefined ? bullet.is_selected : true,
              i + 1,
              new Date().toISOString(),
              new Date().toISOString()
            );
          }
        }
      }

      res.json({ message: "Experience updated successfully" });
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(500).json({ error: "Failed to update experience" });
    }
  });

  router.delete("/:experienceId", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;

      await db.run("DELETE FROM bullet_point WHERE experience_id = ?", experienceId);
      
      await db.run("DELETE FROM experience WHERE id = ?", experienceId);

      res.json({ message: "Experience deleted successfully" });
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ error: "Failed to delete experience" });
    }
  });

  router.patch("/:experienceId/toggle", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;
      const { isSelected } = req.body;

      await db.run(
        `UPDATE experience SET 
          is_selected = ?, updated_at = ?
         WHERE id = ?`,
        isSelected,
        new Date().toISOString(),
        experienceId
      );

      res.json({ message: "Experience selection updated successfully" });
    } catch (error) {
      console.error("Error updating experience selection:", error);
      res.status(500).json({ error: "Failed to update experience selection" });
    }
  });

  return router;
} 