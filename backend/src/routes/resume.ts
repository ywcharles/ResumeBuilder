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
        updated_at: new Date().toISOString(),
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

  // FIXED DELETE FUNCTION
  router.delete("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;

      await db.run("BEGIN TRANSACTION");

      try {
        // Delete junction table records (these have resume_id)
        await db.run("DELETE FROM resume_header WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM coursework WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM resume_skill WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM resume_education WHERE resume_id = ?", resumeId);
        await db.run("DELETE FROM resume_tag WHERE resume_id = ?", resumeId);

        // Delete resume experience bullets
        await db.run(
          `DELETE FROM resume_experience_bullet 
           WHERE resume_experience_id IN (
             SELECT id FROM resume_experience WHERE resume_id = ?
           )`,
          resumeId
        );

        // Delete resume experiences
        await db.run("DELETE FROM resume_experience WHERE resume_id = ?", resumeId);

        // Finally delete the resume itself
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

  // FIXED DUPLICATE FUNCTION
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
        // Create new resume
        const newResumeResult = await db.run(
          `INSERT INTO resume (user_id, title, created_at, updated_at) 
           VALUES (?, ?, ?, ?)`,
          originalResume.user_id,
          title || `${originalResume.title} (Copy)`,
          new Date().toISOString(),
          new Date().toISOString()
        );

        const newResumeId = newResumeResult.lastID;

        // Copy resume header
        const header = await db.get(
          "SELECT * FROM resume_header WHERE resume_id = ?",
          resumeId
        );
        
        if (header) {
          await db.run(
            `INSERT INTO resume_header (
              resume_id, full_name, email, phone_number, linkedin_url, 
              github_url, website_url, show_phone, show_linkedin, 
              show_github, show_website, show_full_urls, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            newResumeId,
            header.full_name,
            header.email,
            header.phone_number,
            header.linkedin_url,
            header.github_url,
            header.website_url,
            header.show_phone,
            header.show_linkedin,
            header.show_github,
            header.show_website,
            header.show_full_urls,
            new Date().toISOString(),
            new Date().toISOString()
          );
        }

        // Copy skills (get skills through junction table)
        const resumeSkills = await db.all(
          `SELECT s.*, rs.order_num 
           FROM skill s
           JOIN resume_skill rs ON s.id = rs.skill_id
           WHERE rs.resume_id = ?`,
          resumeId
        );

        for (const skill of resumeSkills) {
          await db.run(
            `INSERT INTO resume_skill (resume_id, skill_id, order_num, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?)`,
            newResumeId,
            skill.id,
            skill.order_num,
            new Date().toISOString(),
            new Date().toISOString()
          );
        }

        // Copy education (get education through junction table)
        const resumeEducations = await db.all(
          `SELECT e.*, re.order_num 
           FROM education e
           JOIN resume_education re ON e.id = re.education_id
           WHERE re.resume_id = ?`,
          resumeId
        );

        for (const edu of resumeEducations) {
          await db.run(
            `INSERT INTO resume_education (resume_id, education_id, order_num, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?)`,
            newResumeId,
            edu.id,
            edu.order_num,
            new Date().toISOString(),
            new Date().toISOString()
          );
        }

        // Copy coursework
        const coursework = await db.all(
          "SELECT * FROM coursework WHERE resume_id = ?",
          resumeId
        );

        for (const course of coursework) {
          await db.run(
            `INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?)`,
            newResumeId,
            course.user_id,
            course.name,
            new Date().toISOString(),
            new Date().toISOString()
          );
        }

        // Copy experiences and bullets (this part was mostly correct)
        const experiences = await db.all(
          `SELECT e.*, re.order_num as resume_order
           FROM experience e
           JOIN resume_experience re ON e.id = re.experience_id
           WHERE re.resume_id = ?`,
          resumeId
        );

        for (const exp of experiences) {
          const newResumeExpResult = await db.run(
            `INSERT INTO resume_experience (
              resume_id, experience_id, order_num, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?)`,
            newResumeId,
            exp.id,
            exp.resume_order,
            new Date().toISOString(),
            new Date().toISOString()
          );

          const newResumeExpId = newResumeExpResult.lastID;

          const selectedBullets = await db.all(
            `SELECT bp.*, reb.is_selected, reb.order_num as resume_order
             FROM bullet_point bp
             JOIN resume_experience_bullet reb ON bp.id = reb.bullet_point_id
             JOIN resume_experience re ON reb.resume_experience_id = re.id
             WHERE re.resume_id = ? AND re.experience_id = ?`,
            resumeId,
            exp.id
          );

          for (const bullet of selectedBullets) {
            await db.run(
              `INSERT INTO resume_experience_bullet (
                resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              newResumeExpId,
              bullet.id,
              bullet.is_selected,
              bullet.resume_order,
              new Date().toISOString(),
              new Date().toISOString()
            );
          }
        }
        await db.run("COMMIT");

        res.status(201).json({
          id: newResumeId,
          user_id: originalResume.user_id,
          title: title || `${originalResume.title} (Copy)`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
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