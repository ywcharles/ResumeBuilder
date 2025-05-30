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
          id, user_id, resume_id, institution, degree, field, location, 
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
          id, user_id, resume_id, institution, degree, field, location, 
          start_date, end_date, gpa, description, created_at, updated_at
         FROM education 
         WHERE resume_id = ? 
         ORDER BY start_date DESC`,
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
          id, user_id, resume_id, institution, degree, field, location, 
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
        description
      } = req.body;

      const result = await db.run(
        `INSERT INTO education (
          user_id, resume_id, institution, degree, field, location, 
          start_date, end_date, gpa, description, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        userId,
        resumeId,
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

      const educationId = result.lastID;

      res.status(201).json({
        message: "Education created successfully",
        educationId
      });
    } catch (error) {
      console.error("Error creating education:", error);
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

  router.delete("/:educationId", async (req: Request, res: Response) => {
    try {
      const { educationId } = req.params;

      await db.run("DELETE FROM education WHERE id = ?", educationId);

      res.json({ message: "Education deleted successfully" });
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ error: "Failed to delete education" });
    }
  });

  return router;
} 