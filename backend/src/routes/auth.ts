import express, { Request, Response } from "express";
import { Database } from "sqlite";
import * as argon2 from "argon2";

const router = express.Router();

export default function initAuthRoutes(db: Database) {
  router.post("/register", async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password, phoneNumber, linkedinUrl } = req.body;
      
      const existingUser = await db.get("SELECT * FROM user WHERE email = ?", email);
      if (existingUser) {
        res.status(400).json({ error: "User with this email already exists" });
        return;
      }
      
      const passwordHash = await argon2.hash(password);
      
      const result = await db.run(
        `INSERT INTO user (
          first_name, 
          last_name, 
          email, 
          password_hash, 
          created_at, 
          phone_number, 
          linkedin_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        firstName,
        lastName,
        email,
        passwordHash,
        new Date().toISOString(),
        phoneNumber || null,
        linkedinUrl || null
      );
      
      res.status(201).json({ 
        message: "User registered successfully",
        userId: result.lastID 
      });
      return;
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
      return;
    }
  });

  router.post("/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      const user = await db.get("SELECT * FROM user WHERE email = ?", email);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      
      const passwordValid = await argon2.verify(user.password_hash, password);
      if (!passwordValid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      
      const { password_hash, ...userData } = user;
      
      res.json({ 
        message: "Login successful",
        user: userData
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
      return;
    }
  });
  
  return router;
}