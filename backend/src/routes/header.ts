import express, { Request, Response } from "express";
import { Database } from "sqlite";
import { DatabaseUser, HeaderSection, UpdateHeaderRequest } from "../types/header.js";

const router = express.Router();

export default function initHeaderRoutes(db: Database) {
  router.get("/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      
      const user = await db.get(
        "SELECT id, first_name, last_name, email, phone_number, linkedin_url FROM user WHERE id = ?",
        userId
      ) as DatabaseUser | undefined;
      
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      
      const headerData: HeaderSection = {
        fullName: `${user.first_name} ${user.last_name}`,
        title: "", // Can be added to user table later if needed
        contact: {
          email: user.email,
          phone: user.phone_number || "",
          linkedin: user.linkedin_url || "",
          github: "", // Can be added to user table later if needed
          website: "" // Can be added to user table later if needed
        },
        showPhone: !!user.phone_number,
        showLinkedIn: !!user.linkedin_url,
        showGitHub: false, // Default to false since not in user table yet
        showFullUrls: false // Default to false
      };
      
      res.json(headerData);
    } catch (error) {
      console.error("Error fetching user header data:", error);
      res.status(500).json({ error: "Failed to fetch user header data" });
    }
  });

  router.put("/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { fullName, contact }: UpdateHeaderRequest = req.body;
      
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      await db.run(
        `UPDATE user SET 
          first_name = ?, 
          last_name = ?, 
          email = ?, 
          phone_number = ?, 
          linkedin_url = ?
        WHERE id = ?`,
        firstName,
        lastName,
        contact.email,
        contact.phone || null,
        contact.linkedin || null,
        userId
      );
      
      res.json({ message: "User header data updated successfully" });
    } catch (error) {
      console.error("Error updating user header data:", error);
      res.status(500).json({ error: "Failed to update user header data" });
    }
  });

  return router;
} 