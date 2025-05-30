import express, { Request, Response } from "express";
import { Database } from "sqlite";
import { DatabaseUser, DatabaseResumeHeader, HeaderSection, UpdateHeaderRequest } from "../types/header.js";

const router = express.Router();

export default function initHeaderRoutes(db: Database) {
  router.get("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      
      const resumeHeader = await db.get(
        "SELECT * FROM resume_header WHERE resume_id = ?",
        resumeId
      ) as DatabaseResumeHeader | undefined;
      
      if (!resumeHeader) {
        const resume = await db.get(
          "SELECT * FROM resume WHERE id = ?",
          resumeId
        );
        
        if (!resume) {
          res.status(404).json({ error: "Resume not found" });
          return;
        }
        
        const user = await db.get(
          "SELECT id, first_name, last_name, email, phone_number, linkedin_url FROM user WHERE id = ?",
          resume.user_id
        ) as DatabaseUser | undefined;
        
        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }
        
        // Create default header data from user
        const defaultHeaderData: HeaderSection = {
          fullName: `${user.first_name} ${user.last_name}`,
          title: "",
          contact: {
            email: user.email,
            phone: user.phone_number || "",
            linkedin: user.linkedin_url || "",
            github: "",
            website: ""
          },
          showPhone: !!user.phone_number,
          showLinkedIn: !!user.linkedin_url,
          showGitHub: false,
          showWebsite: false,
          showFullUrls: false
        };
        
        await db.run(
          `INSERT INTO resume_header (
            resume_id, full_name, email, phone_number, linkedin_url, 
            show_phone, show_linkedin, show_github, show_website, show_full_urls,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          resumeId,
          defaultHeaderData.fullName,
          defaultHeaderData.contact.email,
          defaultHeaderData.contact.phone || null,
          defaultHeaderData.contact.linkedin || null,
          defaultHeaderData.showPhone,
          defaultHeaderData.showLinkedIn,
          defaultHeaderData.showGitHub,
          defaultHeaderData.showWebsite,
          defaultHeaderData.showFullUrls,
          new Date().toISOString(),
          new Date().toISOString()
        );
        
        res.json(defaultHeaderData);
        return;
      }
      
      const headerData: HeaderSection = {
        fullName: resumeHeader.full_name,
        title: "",
        contact: {
          email: resumeHeader.email,
          phone: resumeHeader.phone_number || "",
          linkedin: resumeHeader.linkedin_url || "",
          github: resumeHeader.github_url || "",
          website: resumeHeader.website_url || ""
        },
        showPhone: resumeHeader.show_phone,
        showLinkedIn: resumeHeader.show_linkedin,
        showGitHub: resumeHeader.show_github,
        showWebsite: resumeHeader.show_website,
        showFullUrls: resumeHeader.show_full_urls
      };
      
      res.json(headerData);
    } catch (error) {
      console.error("Error fetching resume header data:", error);
      res.status(500).json({ error: "Failed to fetch resume header data" });
    }
  });

  router.put("/:resumeId", async (req: Request, res: Response) => {
    try {
      const { resumeId } = req.params;
      const { fullName, contact, showPhone, showLinkedIn, showGitHub, showWebsite, showFullUrls }: UpdateHeaderRequest = req.body;
      
      await db.run(
        `UPDATE resume_header SET 
          full_name = ?, 
          email = ?, 
          phone_number = ?, 
          linkedin_url = ?,
          github_url = ?,
          website_url = ?,
          show_phone = ?,
          show_linkedin = ?,
          show_github = ?,
          show_website = ?,
          show_full_urls = ?,
          updated_at = ?
        WHERE resume_id = ?`,
        fullName,
        contact.email,
        contact.phone || null,
        contact.linkedin || null,
        contact.github || null,
        contact.website || null,
        showPhone,
        showLinkedIn,
        showGitHub,
        showWebsite || false,
        showFullUrls,
        new Date().toISOString(),
        resumeId
      );
      
      res.json({ message: "Resume header data updated successfully" });
    } catch (error) {
      console.error("Error updating resume header data:", error);
      res.status(500).json({ error: "Failed to update resume header data" });
    }
  });

  return router;
} 