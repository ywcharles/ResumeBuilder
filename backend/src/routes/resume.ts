import express, { Request, Response } from "express";
import { Database } from "sqlite";

const router = express.Router();

export default function initResumeRoutes(db: Database) {
  router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      const resumes = await db.all(
        `SELECT id, user_id, title, created_at, updated_at 
         FROM resume 
         WHERE user_id = ? 
         ORDER BY updated_at DESC`,
        userId
      );

      res.json(resumes);
    } catch (error) {
      console.error("Error fetching user resumes:", error);
      res.status(500).json({ error: "Failed to fetch resumes" });
    }
  });

  router.get("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const resume = await db.get(
        `SELECT id, user_id, title, created_at, updated_at 
         FROM resume 
         WHERE id = ?`,
        resumeId
      );

      if (!resume) {
        res.status(404).json({ error: "Resume not found" });
        return;
      }

      res.json(resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
      res.status(500).json({ error: "Failed to fetch resume" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { userId, title } = req.body;

      if (!userId || !title) {
        res.status(400).json({ error: "User ID and title are required" });
        return;
      }

      const result = await db.run(
        `INSERT INTO resume (user_id, title, created_at, updated_at) 
         VALUES (?, ?, ?, ?)`,
        userId,
        title,
        new Date().toISOString(),
        new Date().toISOString()
      );

      const resumeId = result.lastID;

      res.status(201).json({
        id: resumeId,
        user_id: userId,
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(500).json({ error: "Failed to create resume" });
    }
  });

  router.put("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { title } = req.body;

      if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
      }

      const result = await db.run(
        `UPDATE resume SET title = ?, updated_at = ? WHERE id = ?`,
        title,
        new Date().toISOString(),
        resumeId
      );

      if (result.changes === 0) {
        res.status(404).json({ error: "Resume not found" });
        return;
      }

      res.json({ message: "Resume updated successfully" });
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(500).json({ error: "Failed to update resume" });
    }
  });

  router.delete("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;

      await db.run("BEGIN TRANSACTION");

      try {
        await db.run("DELETE FROM resume_header WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM skill WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM coursework WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM education WHERE resume_id = ?", resumeId);
        
        await db.run(`
          DELETE FROM bullet_point 
          WHERE experience_id IN (
            SELECT id FROM experience WHERE resume_id = ?
          )
        `, resumeId);
        
        await db.run("DELETE FROM experience WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM resume_tag WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM resume WHERE id = ?", resumeId);

        await db.run("COMMIT");

        res.status(204).send();
      } catch (error) {
        await db.run("ROLLBACK");
        throw error;
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      res.status(500).json({ error: "Failed to delete resume" });
    }
  });

  router.post("/:resumeId/duplicate", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { title } = req.body;

      const originalResume = await db.get(
        "SELECT * FROM resume WHERE id = ?",
        resumeId
      );

      if (!originalResume) {
        res.status(404).json({ error: "Original resume not found" });
        return;
      }

      await db.run("BEGIN TRANSACTION");

      try {
        const newResumeResult = await db.run(
          `INSERT INTO resume (user_id, title, created_at, updated_at) 
           VALUES (?, ?, ?, ?)`,
          originalResume.user_id,
          title || `${originalResume.title} (Copy)`,
          new Date().toISOString(),
          new Date().toISOString()
        );

        const newResumeId = newResumeResult.lastID;

        const header = await db.get("SELECT * FROM resume_header WHERE resume_id = ?", resumeId);
        if (header) {
          await db.run(`
            INSERT INTO resume_header (
              resume_id, full_name, email, phone_number, linkedin_url, 
              github_url, website_url, show_phone, show_linkedin, 
              show_github, show_website, show_full_urls, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, 
            newResumeId, header.full_name, header.email, header.phone_number,
            header.linkedin_url, header.github_url, header.website_url,
            header.show_phone, header.show_linkedin, header.show_github,
            header.show_website, header.show_full_urls,
            new Date().toISOString(), new Date().toISOString()
          );
        }

        const skills = await db.all("SELECT * FROM skill WHERE resume_id = ?", resumeId);
        for (const skill of skills) {
          await db.run(`
            INSERT INTO skill (user_id, resume_id, name, order_num, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
          `, 
            skill.user_id, newResumeId, skill.name, skill.order_num,
            new Date().toISOString(), new Date().toISOString()
          );
        }

        const educations = await db.all("SELECT * FROM education WHERE resume_id = ?", resumeId);
        for (const edu of educations) {
          await db.run(`
            INSERT INTO education (
              user_id, resume_id, institution, degree, field, location,
              start_date, end_date, gpa, description, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
            edu.user_id, newResumeId, edu.institution, edu.degree, edu.field,
            edu.location, edu.start_date, edu.end_date, edu.gpa, edu.description,
            new Date().toISOString(), new Date().toISOString()
          );
        }

        const experiences = await db.all("SELECT * FROM experience WHERE resume_id = ?", resumeId);
        for (const exp of experiences) {
          const newExpResult = await db.run(`
            INSERT INTO experience (
              user_id, resume_id, company_name, position, location,
              is_selected, start_date, end_date, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
            exp.user_id, newResumeId, exp.company_name, exp.position, exp.location,
            exp.is_selected, exp.start_date, exp.end_date,
            new Date().toISOString(), new Date().toISOString()
          );

          const newExpId = newExpResult.lastID;

          const bullets = await db.all("SELECT * FROM bullet_point WHERE experience_id = ?", exp.id);
          for (const bullet of bullets) {
            await db.run(`
              INSERT INTO bullet_point (
                experience_id, content, is_selected, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)
            `,
              newExpId, bullet.content, bullet.is_selected, bullet.order_num,
              new Date().toISOString(), new Date().toISOString()
            );
          }
        }

        await db.run("COMMIT");

        res.status(201).json({
          id: newResumeId,
          user_id: originalResume.user_id,
          title: title || `${originalResume.title} (Copy)`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } catch (error) {
        await db.run("ROLLBACK");
        throw error;
      }
    } catch (error) {
      console.error("Error duplicating resume:", error);
      res.status(500).json({ error: "Failed to duplicate resume" });
    }
  });

  return router;
} 