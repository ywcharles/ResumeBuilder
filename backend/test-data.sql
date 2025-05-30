--NAVIN


INSERT INTO user (first_name, last_name, email, password_hash, created_at, phone_number, linkedin_url)
VALUES (
  'Navin',
  'George',
  'navin.george@example.com',
  '$argon2id$v=19$m=65536,t=3,p=4$rvNMTtmkQn+GOEyf7Ca8hw$M5RA3jZrqlzpP2yXdmpXyiKwh9BbsKuKi8XehcIC8nk', --password: 123
  CURRENT_TIMESTAMP,
  '123-456-7890',
  'https://www.linkedin.com/in/navin-george'
);

INSERT INTO resume (user_id, title, created_at, updated_at)
VALUES (
  1,
  'Software Developer Resume',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO resume_header (resume_id, full_name, email, phone_number, linkedin_url, show_phone, show_linkedin, show_github, show_website, show_full_urls, created_at, updated_at)
VALUES (
  1,
  'Navin George',
  'navin.george@example.com',
  '123-456-7890',
  'https://www.linkedin.com/in/navin-george',
  1,
  1,
  0,
  0,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO skill (user_id, resume_id, name, order_num, created_at, updated_at)
VALUES
(1, 1, 'C#', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Python', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Java', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'React', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'PostgreSQL', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
VALUES
(1, 1, 'Data Structures', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Database Systems', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Web Development', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO education (user_id, resume_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(1, 1, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2020-09', '2025-06', '3.7', "Dean's List for 4 terms.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(1, 1, 'Susquehanna International Group', 'Software Developer', 'Bala Cynwyd, PA', '2023-09-01', '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'The Stratagem Group', 'Software Engineer', 'Philadelphia, PA', '2022-09-01', '2023-08-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Berkley Technology Services', 'Automation Engineer', 'King of Prussia, PA', '2021-09-01', '2022-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
-- SIG
(1, 'Designed a scalable rule and answer engine using C# and .NET for data consistency.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Developed a Blazor UI for managing complex data mappings.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Built reusable library and web service to share logic across teams.', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Contributed to microservices migration using GraphQL.', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Stratagem
(2, 'Built full-stack solutions for satellite communication programs.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Developed UIs using React and backend APIs with Java.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Ensured near 100% test coverage for robust features.', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Berkley
(3, 'Automated workflows in ServiceNow using JavaScript.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Created custom catalog items for request automation.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Led cross-functional design and requirements meetings.', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tag (name)
VALUES ('Backend'), ('Frontend'), ('Full Stack'), ('Automation'), ('Microservices');

INSERT INTO resume_tag (tag_id, resume_id)
VALUES (1, 1), (2, 1), (3, 1);

INSERT INTO experience_tag (tag_id, experience_id)
VALUES (1, 1), (3, 1), (2, 2), (1, 2), (4, 3);

INSERT INTO bullet_tag (tag_id, bullet_id)
VALUES
-- SIG
(1, 1), 
(2, 2), 
(3, 3), 
(5, 4),  

-- Stratagem
(3, 5),
(2, 6),
(1, 7),

-- Berkley
(4, 8),
(4, 9),
(4, 10);

---------------------------------

--CHARLES
INSERT INTO user (first_name, last_name, email, password_hash, created_at, phone_number, linkedin_url)
VALUES (
  'Charles',
  'Wu',
  'charles@example.com',
  '$argon2id$v=19$m=65536,t=3,p=4$rvNMTtmkQn+GOEyf7Ca8hw$M5RA3jZrqlzpP2yXdmpXyiKwh9BbsKuKi8XehcIC8nk', --password: 123
  CURRENT_TIMESTAMP,
  '123-456-7890',
  'https://www.linkedin.com/in/charles-yuwu/'
);

INSERT INTO resume (user_id, title, created_at, updated_at)
VALUES (
  2,
  'Frontend Resume',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO resume (user_id, title, created_at, updated_at)
VALUES (
  2,
  'Data Resume',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO resume_header (resume_id, full_name, email, phone_number, linkedin_url, show_phone, show_linkedin, show_github, show_website, show_full_urls, created_at, updated_at)
VALUES (
  2,
  'Charles Wu',
  'charles.wu@drexel.edu',
  '123-456-7890',
  'https://www.linkedin.com/in/charles-yuwu/',
  1,
  1,
  0,
  0,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO resume_header (resume_id, full_name, email, phone_number, linkedin_url, show_phone, show_linkedin, show_github, show_website, show_full_urls, created_at, updated_at)
VALUES (
  3,
  'Charles Wu',
  'charles.wu@student.com',
  '123-456-7890',
  'https://www.linkedin.com/in/charles-yuwu/',
  1,
  1,
  0,
  0,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Skills for Frontend Resume
INSERT INTO skill (user_id, resume_id, name, order_num, created_at, updated_at)
VALUES
(2, 2, 'React', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'TypeScript', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Node.JS', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Tailwind CSS', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Material UI', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'HTML', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'CSS', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Skills for Data Resume
INSERT INTO skill (user_id, resume_id, name, order_num, created_at, updated_at)
VALUES
(2, 3, 'Node.JS', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Python', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Matlab', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'OpenCV', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Pandas', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Puppeteer', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'MySQL', 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Coursework
INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
VALUES
(2, 2, 'Human-Centered Design', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Software Architecture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Web Development', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Coursework for Data Resume
INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
VALUES
(3, 2, 'Computational Photography', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'Data Structures', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 2, 'Software Architecture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Education for Frontend Resume
INSERT INTO education (user_id, resume_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(2, 2, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2025-06', '3.8', 'Co-op Program. Focus on Human-Computer Interaction and Software Engineering.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Education for Data Resume
INSERT INTO education (user_id, resume_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(2, 3, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2025-06', '3.8', 'Co-op Program. Concentration in Data Science and Machine Learning.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Work Experience for Frontend Resume
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(2, 2, 'URBN', 'Talent Analytics Co-Op', 'Philadelphia, PA', '2024-09-30', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'University of Pennsylvania', 'Operations Analysis Co-op', 'Philadelphia, PA', '2023-04-04', '2023-09-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Work Experience for Data Resume
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(2, 3, 'URBN', 'Talent Analytics Co-Op', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'University of Pennsylvania', 'Operations Analysis Co-op', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Projects for Frontend Resume
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(2, 2, 'Project', 'AskVanguard', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Project', 'Quackademics', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Project', 'Pic-A-Recipe', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Projects for Data Resume
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(2, 3, 'Project', 'Vanguard AI Assistant', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Pic-A-Recipe', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Skills.FYI', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Expense Tracker', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'WebCam Rock-Paper-Scissor', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Paper Scanner', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Frontend Resume - URBN
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(4, 'Built a Python script to automate survey keyword extraction, cutting manual search time by 70%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Conducted mixed-method analysis on 6 employee surveys, uncovering HR insights for 30K employees', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Refactored 450+ hard-coded fields in BI queries into parameterized inputs, reducing update time by 96%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Created quarterly trend reports for 11 executives, enhancing cross-departmental visibility', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Frontend Resume - UPenn
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(5, 'Coded a word similarity algorithm to identify data entry errors, reducing operational mismatches by 87%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Uncovered 45 misplaced uniforms through inventory data, saving $2,250 in avoided replacement costs', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Frontend Resume - AskVanguard
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(6, 'Architected an AI assistant with React and Python API, enabling RESTful frontend-backend integration', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Led an Agile team of 5 developers, splitting applications into components to accelerate project delivery', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Containerized the project using Docker and deployed it on AWS EC2, simplifying the deployment pipeline', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Implemented persistent state utilizing Zustand, ensuring data retention across sessions', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Frontend Resume - Quackademics
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(7, 'Collaborated with 5 classmates to develop a study website, winning "Best Project" among 28 submissions', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Developed a speech-to-text note-taking page with React and Material UI, improving project accessibility', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Built a scalable tagging system with reusable components, reducing duplicate code across 4 pages', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Frontend Resume - Pic-A-Recipe
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(8, 'Led a team of four to build a recipe suggestions app, winning $395 in the Adulthood track at SASE-Hacks', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Designed a component-based cross-platform React Native app, allowing parallel development', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Integrated Foodvisor API and Gemini AI, identifying ingredients and fetching recipes in under 10 seconds', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - URBN
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(9, 'Resolved Cognos BI query errors in transfers employee reporting, improving data accuracy by 177%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Analyzed employee feedback with affinity diagrams, revealing 13 workplace satisfaction insights', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Calculated quarterly employee turnover using Excel pivot tables, analyzing data across four business units', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Automated key term search in surveys with Python and Pandas, reducing analysis time by 300%', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - UPenn
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(10, 'Developed a word similarity algorithm to identify mistyped data, reducing operational errors by 87%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Identified 45 misplaced uniforms through data analysis, saving $2,250 by avoiding unnecessary orders', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Programmed four Python scripts to process employee data, reducing analysis time by 50%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - Vanguard AI Assistant
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(11, 'Directed 6 developers in building an AI assistant, aligning spring plans with Vanguard requirements', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Developed a LangChain pipeline for three distinct AI agents, enabling specialized task execution', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Built a React web application and a Python API, enabling UI-backend interaction with a custom hook', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - Pic-A-Recipe
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(12, 'Led a team of four to build a recipe suggestions app, winning $395 in the Adulthood track at SASE-Hacks', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Built the skeleton for four mobile app pages using React Native and Expo for cross-platform support', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Integrated Foodvisor API and Gemini AI, identifying ingredients and fetching recipes within 10 seconds', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - Skills.FYI
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(13, 'Developed a web scraper with Puppeteer, extracting 100+ job descriptions to build a dataset for training', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Labeled 350+ data entries with Doccano, enhancing model training and improving skill recognition', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Trained an NLP model to identify skills given a job description, achieving 63% accuracy on test data', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - Expense Tracker
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(14, 'Coded a Python script to insert, store, and display expenses, accelerating budgeting by 300%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Leveraged a MySQL database to process 400 data entries, reducing data fetching time by 2 minutes', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Implemented five distinct ways of displaying the data, facilitating comprehensive analysis by 60%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - WebCam Rock-Paper-Scissor
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(15, 'Developed a Rock-Paper-Scissors game against the computer, utilizing hand recognition for input', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Achieved 87% precision in hand gesture recognition utilizing OpenCV and MediaPipe', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Data Resume - Paper Scanner
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(16, 'Developed a custom paper scanner using MATLAB, enabling document image processing and rectification', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Implemented edge detection and Hough transform, identifying object boundaries with 95% accuracy', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tag (name)
VALUES 
('Data'), 
('Data Science'), 
('Computer Vision'), 
('Machine Learning'),
('Mobile Development');

-- Tag associations for resumes
INSERT INTO resume_tag (tag_id, resume_id)
VALUES 
(6, 2),
(7, 2),
(8, 3),
(9, 3); 

-- Tag associations for experiences
-- Frontend Resume experiences
INSERT INTO experience_tag (tag_id, experience_id)
VALUES
-- For work experiences
(8, 3),
(6, 3),
(8, 4),

-- For projects
(6, 5),
(7, 5),
(6, 6),
(6, 7),
(11, 7);

-- Data Resume experiences
INSERT INTO experience_tag (tag_id, experience_id)
VALUES
-- For work experiences
(8, 8),
(8, 9),

-- For projects
(7, 10), 
(9, 10),
(11, 11), 
(10, 12),
(9, 12), 
(8, 13),
(10, 14),
(10, 15); 

-- Tag associations for bullet points
INSERT INTO bullet_tag (tag_id, bullet_id)
VALUES
-- Frontend Resume bullet points
(9, 16),
(8, 17),
(8, 18),
(8, 19),
(8, 20), 
(8, 21), 
(6, 22), 
(6, 26), 
(6, 27), 
(11, 28), 
(11, 29), 
(7, 30);

------------------------------
--ALAN

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

INSERT INTO resume_header (resume_id, full_name, email, phone_number, linkedin_url, github_url, show_phone, show_linkedin, show_github, show_website, show_full_urls, created_at, updated_at)
VALUES (
  4,
  'Alan Wang',
  'alan.wang@drexel.edu',
  '267-317-5258',
  'https://www.linkedin.com/in/alan-wang-cs/',
  'github.com/alanwang4523',
  1,
  1,
  1,
  0,
  0,
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

-- Education
INSERT INTO education (user_id, resume_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(3, 4, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2026-06', '3.9', 'Co-op Program. Concentration in Software Engineering and AI. Dean''s List for 4 terms.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Raptor Defense Company', 'Software Engineer', 'King of Prussia, PA', '2024-11-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Holman', 'Fullstack Developer Co-Op', 'King of Prussia, PA', '2024-09-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Project', 'RAG AI Chatbot', 'King of Prussia, PA', '2025-03-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Project', 'Wiki Game', 'King of Prussia, PA', '2024-06-01', '2024-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Project', 'CitySquats', 'King of Prussia, PA', '2023-09-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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
INSERT INTO experience (user_id, resume_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(3, 4, 'Society of Asian Scientists and Engineers', 'Technical Coordinator', 'King of Prussia, PA', '2023-07-01', '2024-07-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'CodePath', 'Technical Fellow', 'King of Prussia, PA', '2022-12-01', '2023-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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