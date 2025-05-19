-- Insert user information (user_id will be 3 based on previous inserts)
INSERT INTO user (first_name, last_name, email, password_hash, created_at, phone_number, linkedin_url)
VALUES (
  'Alan',
  'Wang',
  'alan.wang@drexel.edu',
  '$argon2id$v=19$m=65536,t=3,p=4$rvNMTtmkQn+GOEyf7Ca8hw$M5RA3jZrqlzpP2yXdmpXyiKwh9BbsKuKi8XehcIC8nk', -- password: 123
  CURRENT_TIMESTAMP,
  '267-317-5258',
  'https://www.linkedin.com/in/alan-wang-cs/'
);

-- Insert resume record (resume_id will be 4 based on previous inserts)
INSERT INTO resume (user_id, title, created_at, updated_at)
VALUES (
  3,
  'Computer Science Resume',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Insert relevant coursework
INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
VALUES
(4, 3, 'Artificial Intelligence', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Database Systems', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Systems Programming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Web Development', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Software Architecture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Data Structures', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Statistics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Discrete Math', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Linear Algebra', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert skills 
-- Note: Fixed order_num for database skills to continue sequence (was duplicate 1,2,3,4,5)
INSERT INTO skill (user_id, resume_id, name, order_num, created_at, updated_at)
VALUES
-- Programming Languages
(3, 4, 'C#', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Python', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'TypeScript', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Java', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Database skills (fixed order_num sequence)
(3, 4, 'PL/SQL', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'MySQL', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'SQLite', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Firebase', 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Supabase', 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert experiences
-- Note: Experience IDs will continue from the last ones (17 and 18 based on previous inserts)
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Raptor Defense Company', 'Software Engineer', '2024-11-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Holman', 'Fullstack Developer Co-Op', '2024-09-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert bullet points for experiences
-- Experience IDs are 17 and 18, and bullet_point IDs continue from previous inserts
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
-- Raptor Defense Company (experience_id 17)
(17, 'Develop a React Native mobile app that interfaces with the LR-2 Trojan autonomous landmine detection rover', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Implement session tracking to log and display rover activity, including GPS-tagged landmine detections', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Integrate Mapbox to provide satellite map visualization with interactive mine markers', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Deploy a distributed Arduino communication system enabling motor controls and real-time app communication', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Holman (experience_id 18)
(18, 'Created internal file upload tool using Blazor with file routing based on 10 file classifications', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Implemented ASP.Net web app interface allowing business users to add entries into a PL/SQL database', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Developed Blazor page to search, add, modify, and delete links in company directory', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Revamped the user interface and modernized 10 outdated .NET web apps', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert experiences for projects as regular experiences with company_name as 'Project'
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Project', 'RAG AI Chatbot', '2025-03-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Project', 'Wiki Game', '2024-06-01', '2024-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Project', 'CitySquats', '2023-09-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert bullet points for project experiences
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
-- RAG AI Chatbot (experience_id 19)
(19, 'Built a RAG-based AI chatbot with Next.js and TypeScript frontend, and Python FastAPI backend', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 'Enabled vectorized search using ChromaDB for document retrieval and Hugging Face embeddings', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 'Integrated WebSockets for communication and used Groq Cloud API for LLM inference', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Wiki Game (experience_id 20)
(20, 'Battle Royale Wikipedia-based game using Express and PostgreSQL for link navigation', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 'Server-sided rendered Wikipedia articles with custom backtracking to prevent cheating', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 'Utilized web sockets for real-time chatting in lobbies and live multiplayer', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- CitySquats (experience_id 21)
(21, 'Created a React web app enabling users to locate the nearest available restrooms', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(21, 'Utilized Refuge Restroom API and Google Maps API to display bathroom locations', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(21, 'Awarded Temple Owlhack''s "Best Accessibility Hack" out of 250+ participants', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert experiences for activities
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Society of Asian Scientists and Engineers', 'Technical Coordinator', '2023-07-01', '2024-07-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'CodePath', 'Technical Fellow', '2022-12-01', '2023-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert any new tags that don't exist yet
INSERT INTO tag (name)
VALUES 
('Real-time Systems');

-- Link tags to resume (resume_id is 4)
INSERT INTO resume_tag (tag_id, resume_id)
VALUES (2, 4), (3, 4), (5, 4), (6, 4), (7, 4);

-- Link tags to experiences
INSERT INTO experience_tag (tag_id, experience_id)
VALUES 
-- Raptor Defense (experience_id 17)
(4, 17), (9, 17), (12, 17), (13, 17),
-- Holman (experience_id 18)
(2, 18), (3, 18), (5, 18), (6, 18), (11, 18),
-- Projects
-- RAG AI Chatbot (experience_id 19)
(2, 19), (7, 19), (8, 19),
-- Wiki Game (experience_id 20)
(3, 20), (5, 20), (6, 20), (13, 20),
-- CitySquats (experience_id 21)
(2, 21), (6, 21), (8, 21), (11, 21);