import express, { Request, Response } from "express";
import { Database } from "sqlite";

const router = express.Router();

interface BulletPoint {
  id: number;
  experience_id: number;
  content: string;
  is_selected: boolean;
  order_num: number;
  created_at: string;
  updated_at: string;
  tags?: { id: number; name: string }[];
}

interface ExperienceWithBullets {
  id: number;
  user_id: number;
  company_name: string;
  position: string;
  location: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  created_at: string;
  updated_at: string;
  bullets: BulletPoint[];
}

interface FrontendExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: { content: string; tags: { id: number; name: string }[] }[];
  fromBank?: boolean;
}

interface FrontendExperienceSection {
  items: FrontendExperience[];
}

function transformToFrontendFormat(dbExperience: ExperienceWithBullets, fromBank: boolean = false): FrontendExperience {
  return {
    id: dbExperience.id.toString(),
    company: dbExperience.company_name,
    position: dbExperience.position,
    location: dbExperience.location,
    startDate: dbExperience.start_date,
    endDate: dbExperience.end_date || '',
    current: dbExperience.current,
    bullets: dbExperience.bullets.map(bullet => ({
      content: bullet.content,
      tags: bullet.tags || []
    })),
    fromBank
  };
}

async function fetchBulletTags(db: Database, bulletIds: number[]): Promise<Map<number, { id: number; name: string }[]>> {
  if (bulletIds.length === 0) return new Map();
  
  const placeholders = bulletIds.map(() => '?').join(',');
  const bulletTags = await db.all(
    `SELECT bt.bullet_id, t.id, t.name 
     FROM bullet_tag bt
     JOIN tag t ON bt.tag_id = t.id
     WHERE bt.bullet_id IN (${placeholders})
     ORDER BY t.name`,
    ...bulletIds
  );
  
  const tagsMap = new Map<number, { id: number; name: string }[]>();
  
  bulletTags.forEach(({ bullet_id, id, name }) => {
    if (!tagsMap.has(bullet_id)) {
      tagsMap.set(bullet_id, []);
    }
    // Create independent tag objects to prevent reference sharing
    tagsMap.get(bullet_id)!.push({ id: id, name: name });
  });
  
  return tagsMap;
}

export default function initExperienceRoutes(db: Database) {
  // Get user's experience bank (all experiences not tied to specific resume)
  router.get("/user/:userId/bank", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      // Get all experiences for the user from their bank
      const experiences = await db.all(
        `SELECT 
          id, user_id, company_name, position, location, 
          start_date, end_date, created_at, updated_at
         FROM experience 
         WHERE user_id = ? 
         ORDER BY start_date DESC`,
        userId
      );

      // Get bullet points for each experience
      const experiencesWithBullets: ExperienceWithBullets[] = [];
      
      for (const experience of experiences) {
        const bullets = await db.all(
          `SELECT id, experience_id, content, order_num, created_at, updated_at
           FROM bullet_point 
           WHERE experience_id = ? 
           ORDER BY order_num ASC`,
          experience.id
        );
        
        // Fetch tags for all bullets in this experience
        const bulletIds = bullets.map(b => b.id);
        const tagsMap = await fetchBulletTags(db, bulletIds);
        
        experiencesWithBullets.push({
          ...experience,
          current: !experience.end_date,
          bullets: bullets.map(bullet => ({
            ...bullet,
            is_selected: true, // Default for bank items
            tags: tagsMap.get(bullet.id) || []
          }))
        });
      }

      const frontendExperiences = experiencesWithBullets.map(experience => transformToFrontendFormat(experience, false));
      
      const response: FrontendExperienceSection = {
        items: frontendExperiences
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching user experiences for bank:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  // Get experiences linked to a specific resume
  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      // Get experiences linked to this resume through resume_experience junction table
      const experiences = await db.all(
        `SELECT 
          e.id, e.user_id, e.company_name, e.position, e.location, 
          e.start_date, e.end_date, e.created_at, e.updated_at,
          re.order_num as resume_order
         FROM experience e
         JOIN resume_experience re ON e.id = re.experience_id
         WHERE re.resume_id = ? 
         ORDER BY re.order_num ASC`,
        resumeId
      );

      const experiencesWithBullets: ExperienceWithBullets[] = [];
      
      for (const experience of experiences) {
        // Get selected bullet points for this resume
        const bullets = await db.all(
          `SELECT bp.id, bp.experience_id, bp.content, bp.order_num, bp.created_at, bp.updated_at,
                  reb.is_selected, reb.order_num as resume_bullet_order
           FROM bullet_point bp
           JOIN resume_experience re ON bp.experience_id = re.experience_id
           LEFT JOIN resume_experience_bullet reb ON bp.id = reb.bullet_point_id AND re.id = reb.resume_experience_id
           WHERE bp.experience_id = ? AND re.resume_id = ?
           ORDER BY COALESCE(reb.order_num, bp.order_num) ASC`,
          experience.id, resumeId
        );
        
        // Fetch tags for all bullets in this experience
        const bulletIds = bullets.map(b => b.id);
        const tagsMap = await fetchBulletTags(db, bulletIds);
        
        experiencesWithBullets.push({
          ...experience,
          current: !experience.end_date,
          bullets: bullets.map(bullet => ({
            ...bullet,
            is_selected: bullet.is_selected !== null ? bullet.is_selected : true,
            tags: tagsMap.get(bullet.id) || []
          }))
        });
      }

      const frontendExperiences = experiencesWithBullets.map(experience => transformToFrontendFormat(experience, true));
      
      const response: FrontendExperienceSection = {
        items: frontendExperiences
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching resume experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  // Create new experience in user's bank and optionally link to resume
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

      // Insert experience into user's bank (no resume_id)
      const result = await db.run(
        `INSERT INTO experience (
          user_id, company_name, position, location, 
          start_date, end_date, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        userId,
        companyName,
        position,
        location,
        startDate,
        endDate || null,
        new Date().toISOString(),
        new Date().toISOString()
      );

      const experienceId = result.lastID;

      // Insert bullet points
      if (bullets.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          if (bullet.content && bullet.content.trim()) {
            const bulletResult = await db.run(
              `INSERT INTO bullet_point (
                experience_id, content, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?)`,
              experienceId,
              bullet.content,
              i + 1,
              new Date().toISOString(),
              new Date().toISOString()
            );

            // Insert bullet tags if provided
            if (bullet.tags && bullet.tags.length > 0) {
              for (const tag of bullet.tags) {
                await db.run(
                  `INSERT OR IGNORE INTO bullet_tag (tag_id, bullet_id) VALUES (?, ?)`,
                  tag.id,
                  bulletResult.lastID
                );
              }
            }
          }
        }
      }

      // If resumeId provided, link to resume
      if (resumeId) {
        // Get next order number for this resume
        const maxOrderResult = await db.get(
          "SELECT MAX(order_num) as maxOrder FROM resume_experience WHERE resume_id = ?",
          resumeId
        );
        const nextOrder = (maxOrderResult?.maxOrder || 0) + 1;

        // Link experience to resume
        const resumeExperienceResult = await db.run(
          `INSERT INTO resume_experience (
            resume_id, experience_id, order_num, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?)`,
          resumeId,
          experienceId,
          nextOrder,
          new Date().toISOString(),
          new Date().toISOString()
        );

        // Link all bullet points to resume (selected by default)
        if (bullets.length > 0) {
          const bulletPoints = await db.all(
            "SELECT id FROM bullet_point WHERE experience_id = ? ORDER BY order_num",
            experienceId
          );

          for (let i = 0; i < bulletPoints.length; i++) {
            await db.run(
              `INSERT INTO resume_experience_bullet (
                resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?)`,
              resumeExperienceResult.lastID,
              bulletPoints[i].id,
              true,
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

  // Add existing experience from bank to resume
  router.post("/resume/:resumeId/add/:experienceId", async (req: Request, res: Response) => {
    try {
      const { resumeId, experienceId } = req.params;

      // Check if experience is already linked to this resume
      const existing = await db.get(
        "SELECT id FROM resume_experience WHERE resume_id = ? AND experience_id = ?",
        resumeId, experienceId
      );

      if (existing) {
        res.status(400).json({ error: "Experience already linked to this resume" });
        return;
      }

      // Get next order number for this resume
      const maxOrderResult = await db.get(
        "SELECT MAX(order_num) as maxOrder FROM resume_experience WHERE resume_id = ?",
        resumeId
      );
      const nextOrder = (maxOrderResult?.maxOrder || 0) + 1;

      // Link experience to resume
      const resumeExperienceResult = await db.run(
        `INSERT INTO resume_experience (
          resume_id, experience_id, order_num, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?)`,
        resumeId,
        experienceId,
        nextOrder,
        new Date().toISOString(),
        new Date().toISOString()
      );

      // Link all bullet points to resume (selected by default)
      const bulletPoints = await db.all(
        "SELECT id FROM bullet_point WHERE experience_id = ? ORDER BY order_num",
        experienceId
      );

      for (let i = 0; i < bulletPoints.length; i++) {
        await db.run(
          `INSERT INTO resume_experience_bullet (
            resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?)`,
          resumeExperienceResult.lastID,
          bulletPoints[i].id,
          true,
          i + 1,
          new Date().toISOString(),
          new Date().toISOString()
        );
      }

      res.json({ message: "Experience added to resume successfully" });
    } catch (error) {
      console.error("Error adding experience to resume:", error);
      res.status(500).json({ error: "Failed to add experience to resume" });
    }
  });

  // Update experience in user's bank
  router.put("/:experienceId", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;
      const {
        companyName,
        position,
        location,
        startDate,
        endDate,
        bullets = []
      } = req.body;

      // Update experience
      await db.run(
        `UPDATE experience SET 
          company_name = ?, position = ?, location = ?, start_date = ?, 
          end_date = ?, updated_at = ?
         WHERE id = ?`,
        companyName,
        position,
        location,
        startDate,
        endDate || null,
        new Date().toISOString(),
        experienceId
      );

      // Delete old bullet points and their tags
      await db.run("DELETE FROM bullet_tag WHERE bullet_id IN (SELECT id FROM bullet_point WHERE experience_id = ?)", experienceId);
      await db.run("DELETE FROM bullet_point WHERE experience_id = ?", experienceId);

      if (bullets.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          if (bullet.content && bullet.content.trim()) {
            // Insert bullet point
            const bulletResult = await db.run(
              `INSERT INTO bullet_point (
                experience_id, content, order_num, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?)`,
              experienceId,
              bullet.content,
              i + 1,
              new Date().toISOString(),
              new Date().toISOString()
            );

            // Insert bullet tags if provided
            if (bullet.tags && bullet.tags.length > 0) {
              for (const tag of bullet.tags) {
                await db.run(
                  `INSERT OR IGNORE INTO bullet_tag (tag_id, bullet_id) VALUES (?, ?)`,
                  tag.id,
                  bulletResult.lastID
                );
              }
            }
          }
        }
      }

      res.json({ message: "Experience updated successfully" });
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(500).json({ error: "Failed to update experience" });
    }
  });

  // Remove experience from resume (but keep in user's bank)
  router.delete("/resume/:resumeId/experience/:experienceId", async (req: Request, res: Response) => {
    try {
      const { resumeId, experienceId } = req.params;

      // Remove from resume_experience_bullet first
      await db.run(
        `DELETE FROM resume_experience_bullet 
         WHERE resume_experience_id IN (
           SELECT id FROM resume_experience 
           WHERE resume_id = ? AND experience_id = ?
         )`,
        resumeId, experienceId
      );

      // Remove from resume_experience
      await db.run(
        "DELETE FROM resume_experience WHERE resume_id = ? AND experience_id = ?",
        resumeId, experienceId
      );

      res.json({ message: "Experience removed from resume successfully" });
    } catch (error) {
      console.error("Error removing experience from resume:", error);
      res.status(500).json({ error: "Failed to remove experience from resume" });
    }
  });

  // Delete experience completely from user's bank
  router.delete("/:experienceId", async (req: Request, res: Response) => {
    try {
      const { experienceId } = req.params;

      // Remove from resume_experience_bullet first
      await db.run(
        `DELETE FROM resume_experience_bullet 
         WHERE resume_experience_id IN (
           SELECT id FROM resume_experience WHERE experience_id = ?
         )`,
        experienceId
      );

      // Remove from resume_experience
      await db.run("DELETE FROM resume_experience WHERE experience_id = ?", experienceId);

      // Remove bullet points
      await db.run("DELETE FROM bullet_point WHERE experience_id = ?", experienceId);
      
      // Remove experience from bank
      await db.run("DELETE FROM experience WHERE id = ?", experienceId);

      res.json({ message: "Experience deleted successfully" });
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ error: "Failed to delete experience" });
    }
  });

  return router;
} 