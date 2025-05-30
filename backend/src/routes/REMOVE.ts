import express, { Request, Response } from "express";
import { Database } from "sqlite";

const router = express.Router();

export default function initExperienceRoutes(db: Database) {
  router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const experiences = await db.all(`
        SELECT 
          e.id,
          e.company_name,
          e.description,
          e.location,
          e.start_date,
          e.end_date,
          e.is_selected
        FROM experience e
        WHERE e.user_id = ?
        ORDER BY e.start_date DESC
      `, userId);
      
      const experiencesWithBullets = await Promise.all(
        experiences.map(async (experience) => {
          const bulletPoints = await db.all(`
            SELECT content, is_selected, order_num
            FROM bullet_point
            WHERE experience_id = ?
            ORDER BY order_num ASC
          `, experience.id);
          
          return {
            ...experience,
            bulletPoints: bulletPoints.map(bp => bp.content)
          };
        })
      );
      
      res.json(experiencesWithBullets);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const experiences = await db.all(`
        SELECT 
          e.id,
          e.company_name,
          e.description,
          e.location,
          e.start_date,
          e.end_date,
          e.is_selected
        FROM experience e
        WHERE e.resume_id = ? AND e.is_selected = 1
        ORDER BY e.start_date DESC
      `, resumeId);
      
      const experiencesWithBullets = await Promise.all(
        experiences.map(async (experience) => {
          const bulletPoints = await db.all(`
            SELECT content, is_selected, order_num
            FROM bullet_point
            WHERE experience_id = ? AND is_selected = 1
            ORDER BY order_num ASC
          `, experience.id);
          
          return {
            ...experience,
            bulletPoints: bulletPoints.map(bp => bp.content)
          };
        })
      );
      
      res.json(experiencesWithBullets);
    } catch (error) {
      console.error("Error fetching resume experiences:", error);
      res.status(500).json({ error: "Failed to fetch resume experiences" });
    }
  });

  // Add a new experience
//   router.post("/", async (req: Request, res: Response) => {
//     try {
//       const { 
//         userId, 
//         resumeId, 
//         companyName, 
//         description, 
//         location, 
//         startDate, 
//         endDate,
//         bulletPoints = []
//       } = req.body;
      
//       // Insert experience
//       const experienceResult = await db.run(`
//         INSERT INTO experience (
//           user_id, 
//           resume_id, 
//           company_name, 
//           description, 
//           location, 
//           start_date, 
//           end_date,
//           created_at,
//           updated_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `, 
//         userId,
//         resumeId,
//         companyName,
//         description,
//         location,
//         startDate,
//         endDate,
//         new Date().toISOString(),
//         new Date().toISOString()
//       );
      
//       const experienceId = experienceResult.lastID;
      
//       // Insert bullet points if provided
//       if (bulletPoints.length > 0) {
//         for (let i = 0; i < bulletPoints.length; i++) {
//           await db.run(`
//             INSERT INTO bullet_point (
//               experience_id,
//               content,
//               order_num,
//               created_at,
//               updated_at
//             ) VALUES (?, ?, ?, ?, ?)
//           `,
//             experienceId,
//             bulletPoints[i],
//             i + 1,
//             new Date().toISOString(),
//             new Date().toISOString()
//           );
//         }
//       }
      
//       res.status(201).json({
//         message: "Experience created successfully",
//         experienceId
//       });
//     } catch (error) {
//       console.error("Error creating experience:", error);
//       res.status(500).json({ error: "Failed to create experience" });
//     }
//   });

  return router;
}