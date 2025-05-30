import express, { Request, Response } from "express";
import { Database } from "sqlite";
import {
  DatabaseEducation,
  FrontendEducationItem,
  FrontendEducationSection
} from "../types/education.js";

const router = express.Router();

function transformToFrontendFormat(dbEducation: DatabaseEducation): FrontendEducationItem {
  return {
    id: dbEducation.id.toString(),
    institution: dbEducation.institution,
    degree: dbEducation.degree,
    field: dbEducation.field,
    location: dbEducation.location,
    startDate: dbEducation.start_date,
    endDate: dbEducation.end_date,
    gpa: dbEducation.gpa || undefined,
    description: dbEducation.description || undefined
  };
}

export default function initEducationRoutes(db: Database) {
  router.get("/user/:userId/bank", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      const educations = await db.all(
        `SELECT 
          id, user_id, institution, degree, field, location, 
          start_date, end_date, gpa, description, created_at, updated_at
         FROM education 
         WHERE user_id = ? 
         ORDER BY start_date DESC`,
        userId
      );

      const frontendEducations = educations.map(transformToFrontendFormat);
      
      const response: FrontendEducationSection = {
        items: frontendEducations
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching user education for bank:", error);
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  router.get("/resume/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const educations = await db.all(
        `SELECT 
          e.id, e.user_id, e.institution, e.degree, e.field, e.location, 
          e.start_date, e.end_date, e.gpa, e.description, e.created_at, e.updated_at,
          re.order_num
         FROM education e
         INNER JOIN resume_education re ON e.id = re.education_id
         WHERE re.resume_id = ? 
         ORDER BY re.order_num ASC, e.start_date DESC`,
        resumeId
      );

      const frontendEducations = educations.map(transformToFrontendFormat);
      
      const response: FrontendEducationSection = {
        items: frontendEducations
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching resume education:", error);
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  router.get("/:educationId", async (req: Request, res: Response) => {
    try {
      const { educationId } = req.params;
      
      const education = await db.get(
        `SELECT 
          id, user_id, institution, degree, field, location, 
          start_date, end_date, gpa, description, created_at, updated_at
         FROM education 
         WHERE id = ?`,
        educationId
      );

      if (!education) {
        res.status(404).json({ error: "Education not found" });
        return;
      }

      const frontendEducation = transformToFrontendFormat(education);
      res.json(frontendEducation);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const {
        userId,
        resumeId,
        institution,
        degree,
        field,
        location,
        startDate,
        endDate,
        gpa,
        description,
        existingEducationId
      } = req.body;

      let educationId: number;

      if (existingEducationId) {
        educationId = existingEducationId;
        
        const existingLink = await db.get(
          `SELECT id FROM resume_education WHERE resume_id = ? AND education_id = ?`,
          resumeId,
          educationId
        );

        if (existingLink) {
          res.status(400).json({ error: "Education already added to this resume" });
          return;
        }
      } else {
        const result = await db.run(
          `INSERT INTO education (
            user_id, institution, degree, field, location, 
            start_date, end_date, gpa, description, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          userId,
          institution,
          degree,
          field,
          location,
          startDate,
          endDate,
          gpa || null,
          description || null,
          new Date().toISOString(),
          new Date().toISOString()
        );

        educationId = result.lastID!;
      }

      const maxOrderResult = await db.get(
        `SELECT MAX(order_num) as max_order FROM resume_education WHERE resume_id = ?`,
        resumeId
      );
      const nextOrder = (maxOrderResult?.max_order || 0) + 1;

      await db.run(
        `INSERT INTO resume_education (
          resume_id, education_id, order_num, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?)`,
        resumeId,
        educationId,
        nextOrder,
        new Date().toISOString(),
        new Date().toISOString()
      );

      res.status(201).json({
        message: "Education created and linked successfully",
        educationId
      });
    } catch (error) {
      console.error("Error creating/linking education:", error);
      res.status(500).json({ error: "Failed to create education" });
    }
  });

  router.put("/:educationId", async (req: Request, res: Response) => {
    try {
      const { educationId } = req.params;
      const {
        institution,
        degree,
        field,
        location,
        startDate,
        endDate,
        gpa,
        description
      } = req.body;

      await db.run(
        `UPDATE education SET 
          institution = ?, degree = ?, field = ?, location = ?, 
          start_date = ?, end_date = ?, gpa = ?, description = ?, updated_at = ?
         WHERE id = ?`,
        institution,
        degree,
        field,
        location,
        startDate,
        endDate,
        gpa || null,
        description || null,
        new Date().toISOString(),
        educationId
      );

      res.json({ message: "Education updated successfully" });
    } catch (error) {
      console.error("Error updating education:", error);
      res.status(500).json({ error: "Failed to update education" });
    }
  });

  router.delete("/resume/:resumeId/education/:educationId", async (req: Request, res: Response) => {
    try {
      const { resumeId, educationId } = req.params;

      await db.run(
        "DELETE FROM resume_education WHERE resume_id = ? AND education_id = ?", 
        resumeId, 
        educationId
      );

      res.json({ message: "Education removed from resume successfully" });
    } catch (error) {
      console.error("Error removing education from resume:", error);
      res.status(500).json({ error: "Failed to remove education from resume" });
    }
  });

  router.delete("/:educationId", async (req: Request, res: Response) => {
    try {
      const { educationId } = req.params;

      await db.run("DELETE FROM resume_education WHERE education_id = ?", educationId);
      
      await db.run("DELETE FROM education WHERE id = ?", educationId);

      res.json({ message: "Education deleted from bank successfully" });
    } catch (error) {
      console.error("Error deleting education from bank:", error);
      res.status(500).json({ error: "Failed to delete education from bank" });
    }
  });

  return router;
} 