-- NAVIN
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

INSERT INTO skill (user_id, name, created_at, updated_at)
VALUES
(1, 'C#', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Python', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Java', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'React', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'PostgreSQL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_skill (resume_id, skill_id, order_num, created_at, updated_at)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO coursework (resume_id, user_id, name, created_at, updated_at)
VALUES
(1, 1, 'Data Structures', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Database Systems', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Web Development', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO education (user_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(1, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2020-09', '2025-06', '3.7', "Dean's List for 4 terms.", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_education (resume_id, education_id, order_num, created_at, updated_at)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO experience (user_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(1, 'Susquehanna International Group', 'Software Developer', 'Bala Cynwyd, PA', '2023-09-01', '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'The Stratagem Group', 'Software Engineer', 'Philadelphia, PA', '2022-09-01', '2023-08-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Berkley Technology Services', 'Automation Engineer', 'King of Prussia, PA', '2021-09-01', '2022-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience (resume_id, experience_id, order_num, created_at, updated_at)
VALUES
(1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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

INSERT INTO resume_experience_bullet (resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at)
VALUES
-- SIG bullets (resume_experience_id = 1)
(1, 1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Stratagem bullets (resume_experience_id = 2)
(2, 5, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 7, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Berkley bullets (resume_experience_id = 3)
(3, 8, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 9, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 10, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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

-- CHARLES
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

INSERT INTO skill (user_id, name, created_at, updated_at)
VALUES
-- Frontend skills
(2, 'React', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'TypeScript', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Node.JS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Tailwind CSS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Material UI', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'HTML', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'CSS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data skills
(2, 'Python', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Matlab', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'OpenCV', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Pandas', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Puppeteer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'MySQL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_skill (resume_id, skill_id, order_num, created_at, updated_at)
VALUES
(2, 6, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- React
(2, 7, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- TypeScript
(2, 8, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Node.JS
(2, 9, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Tailwind CSS
(2, 10, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Material UI
(2, 11, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- HTML
(2, 12, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- CSS

INSERT INTO resume_skill (resume_id, skill_id, order_num, created_at, updated_at)
VALUES
(3, 8, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Node.JS
(3, 13, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Python
(3, 14, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Matlab
(3, 15, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- OpenCV
(3, 16, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Pandas
(3, 17, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Puppeteer
(3, 18, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- MySQL

-- Coursework for Frontend Resume
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

INSERT INTO education (user_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(2, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2025-06', '3.8', 'Co-op Program. Focus on Human-Computer Interaction and Software Engineering.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2025-06', '3.8', 'Co-op Program. Concentration in Data Science and Machine Learning.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_education (resume_id, education_id, order_num, created_at, updated_at)
VALUES
(2, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Frontend Resume
(3, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Data Resume

INSERT INTO experience (user_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(2, 'URBN', 'Talent Analytics Co-Op', 'Philadelphia, PA', '2024-09-30', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'University of Pennsylvania', 'Operations Analysis Co-op', 'Philadelphia, PA', '2023-04-04', '2023-09-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Projects for both resumes
(2, 'Project', 'AskVanguard', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Quackademics', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Pic-A-Recipe', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Vanguard AI Assistant', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Skills.FYI', 'Philadelphia, PA', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Expense Tracker', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'WebCam Rock-Paper-Scissor', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Project', 'Paper Scanner', 'Philadelphia, PA', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience (resume_id, experience_id, order_num, created_at, updated_at)
VALUES
-- Frontend Resume (resume_id = 2)
(2, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- URBN
(2, 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- UPenn
(2, 6, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- AskVanguard
(2, 7, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Quackademics
(2, 8, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Pic-A-Recipe

INSERT INTO resume_experience (resume_id, experience_id, order_num, created_at, updated_at)
VALUES
-- Data Resume (resume_id = 3)
(3, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- URBN
(3, 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- UPenn
(3, 9, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Vanguard AI Assistant
(3, 8, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Pic-A-Recipe
(3, 10, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Skills.FYI
(3, 11, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Expense Tracker
(3, 12, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- WebCam Rock-Paper-Scissor
(3, 13, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Paper Scanner

-- Bullet Points for URBN
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(4, 'Built a Python script to automate survey keyword extraction, cutting manual search time by 70%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Conducted mixed-method analysis on 6 employee surveys, uncovering HR insights for 30K employees', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Refactored 450+ hard-coded fields in BI queries into parameterized inputs, reducing update time by 96%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Created quarterly trend reports for 11 executives, enhancing cross-departmental visibility', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for UPenn
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(5, 'Coded a word similarity algorithm to identify data entry errors, reducing operational mismatches by 87%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Uncovered 45 misplaced uniforms through inventory data, saving $2,250 in avoided replacement costs', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Programmed four Python scripts to process employee data, reducing analysis time by 50%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for AskVanguard
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(6, 'Architected an AI assistant with React and Python API, enabling RESTful frontend-backend integration', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Led an Agile team of 5 developers, splitting applications into components to accelerate project delivery', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Containerized the project using Docker and deployed it on AWS EC2, simplifying the deployment pipeline', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Implemented persistent state utilizing Zustand, ensuring data retention across sessions', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Quackademics
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(7, 'Collaborated with 5 classmates to develop a study website, winning "Best Project" among 28 submissions', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Developed a speech-to-text note-taking page with React and Material UI, improving project accessibility', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Built a scalable tagging system with reusable components, reducing duplicate code across 4 pages', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Pic-A-Recipe
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(8, 'Led a team of four to build a recipe suggestions app, winning $395 in the Adulthood track at SASE-Hacks', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Built the skeleton for four mobile app pages using React Native and Expo for cross-platform support', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Integrated Foodvisor API and Gemini AI, identifying ingredients and fetching recipes within 10 seconds', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Vanguard AI Assistant
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(9, 'Directed 6 developers in building an AI assistant, aligning spring plans with Vanguard requirements', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Developed a LangChain pipeline for three distinct AI agents, enabling specialized task execution', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Built a React web application and a Python API, enabling UI-backend interaction with a custom hook', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Skills.FYI
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(10, 'Developed a web scraper with Puppeteer, extracting 100+ job descriptions to build a dataset for training', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Labeled 350+ data entries with Doccano, enhancing model training and improving skill recognition', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Trained an NLP model to identify skills given a job description, achieving 63% accuracy on test data', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Expense Tracker
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(11, 'Coded a Python script to insert, store, and display expenses, accelerating budgeting by 300%', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Leveraged a MySQL database to process 400 data entries, reducing data fetching time by 2 minutes', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'Implemented five distinct ways of displaying the data, facilitating comprehensive analysis by 60%', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for WebCam Rock-Paper-Scissor
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(12, 'Developed a Rock-Paper-Scissors game against the computer, utilizing hand recognition for input', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Achieved 87% precision in hand gesture recognition utilizing OpenCV and MediaPipe', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bullet Points for Paper Scanner
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
(13, 'Developed a custom paper scanner using MATLAB, enabling document image processing and rectification', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Implemented edge detection and Hough transform, identifying object boundaries with 95% accuracy', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience_bullet (resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at)
VALUES
-- Frontend Resume URBN bullets (resume_experience_id = 4)
(4, 14, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 15, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 16, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 17, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Frontend Resume UPenn bullets (resume_experience_id = 5)
(5, 18, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 19, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Frontend Resume AskVanguard bullets (resume_experience_id = 6)
(6, 22, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 23, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 24, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 25, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Frontend Resume Quackademics bullets (resume_experience_id = 7)
(7, 26, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 27, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 28, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Frontend Resume Pic-A-Recipe bullets (resume_experience_id = 8)
(8, 29, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 30, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 31, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience_bullet (resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at)
VALUES
-- Data Resume URBN bullets (resume_experience_id = 9)
(9, 14, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 15, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 16, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 17, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume UPenn bullets (resume_experience_id = 10)
(10, 18, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 19, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 20, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume Vanguard AI bullets (resume_experience_id = 11)
(11, 32, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 33, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 34, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume Pic-A-Recipe bullets (resume_experience_id = 12)
(12, 35, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 36, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 37, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume Skills.FYI bullets (resume_experience_id = 13)
(13, 38, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 39, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 40, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume Expense Tracker bullets (resume_experience_id = 14)
(14, 41, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 42, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 43, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume WebCam RPS bullets (resume_experience_id = 15)
(15, 44, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 45, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Data Resume Paper Scanner bullets (resume_experience_id = 16)
(16, 46, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 47, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Add new tags
INSERT INTO tag (name)
VALUES 
('Data'), 
('Data Science'), 
('Computer Vision'), 
('Machine Learning'),
('Mobile Development');

-- Tag associations for Charles's resumes
INSERT INTO resume_tag (tag_id, resume_id)
VALUES 
(2, 2), -- Frontend tag for Frontend Resume
(6, 3), -- Data tag for Data Resume
(7, 3); -- Data Science tag for Data Resume

-- Tag associations for Charles's experiences
INSERT INTO experience_tag (tag_id, experience_id)
VALUES
-- URBN
(6, 4), (7, 4),
-- UPenn
(6, 5), (7, 5),
-- AskVanguard
(2, 6), (1, 6),
-- Quackademics
(2, 7),
-- Pic-A-Recipe
(10, 8),
-- Vanguard AI Assistant
(8, 9), (1, 9),
-- Skills.FYI
(7, 10), (8, 10),
-- Expense Tracker
(6, 11), (1, 11),
-- WebCam RPS
(8, 12), (9, 12),
-- Paper Scanner
(8, 13), (9, 13);

-- Tag associations for Charles's bullet points
INSERT INTO bullet_tag (tag_id, bullet_id)
VALUES
-- URBN bullets
(6, 14), (7, 15), (6, 16), (6, 17),
-- UPenn bullets
(6, 18), (6, 19), (6, 20),
-- AskVanguard bullets
(2, 22), (1, 23), (1, 24), (2, 25),
-- Quackademics bullets
(2, 26), (2, 27), (2, 28),
-- Pic-A-Recipe bullets (Frontend)
(10, 29), (10, 30), (10, 31),
-- Vanguard AI Assistant bullets
(8, 32), (8, 33), (1, 34),
-- Pic-A-Recipe bullets (Data)
(10, 35), (10, 36), (10, 37),
-- Skills.FYI bullets
(7, 38), (8, 39), (8, 40),
-- Expense Tracker bullets
(6, 41), (6, 42), (6, 43),
-- WebCam RPS bullets
(8, 44), (9, 45),
-- Paper Scanner bullets
(8, 46), (9, 47);

------------------------------
-- ALAN

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

INSERT INTO education (user_id, institution, degree, field, location, start_date, end_date, gpa, description, created_at, updated_at)
VALUES
(3, 'Drexel University', 'Bachelor of Science', 'Computer Science', 'Philadelphia, PA', '2021-09', '2026-06', '3.9', 'Co-op Program. Concentration in Software Engineering and AI. Dean''s List for 4 terms.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_education (resume_id, education_id, order_num, created_at, updated_at)
VALUES
(4, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO skill (user_id, name, created_at, updated_at)
VALUES
-- Programming Languages
(3, 'C#', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Python', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'TypeScript', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Java', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Database skills
(3, 'PL/SQL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'MySQL', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'SQLite', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Firebase', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Supabase', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_skill (resume_id, skill_id, order_num, created_at, updated_at)
VALUES
(4, 19, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- C#
(4, 20, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Python
(4, 21, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- TypeScript
(4, 22, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Java
(4, 23, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- PL/SQL
(4, 24, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- MySQL
(4, 25, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- SQLite
(4, 26, 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Firebase
(4, 27, 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- Supabase

INSERT INTO experience (user_id, company_name, position, location, start_date, end_date, created_at, updated_at)
VALUES
(3, 'Raptor Defense Company', 'Software Engineer', 'King of Prussia, PA', '2024-11-01', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Holman', 'Fullstack Developer Co-Op', 'King of Prussia, PA', '2024-09-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Projects
(3, 'Project', 'RAG AI Chatbot', 'King of Prussia, PA', '2025-03-01', '2025-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Project', 'Wiki Game', 'King of Prussia, PA', '2024-06-01', '2024-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Project', 'CitySquats', 'King of Prussia, PA', '2023-09-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Activities
(3, 'Society of Asian Scientists and Engineers', 'Technical Coordinator', 'King of Prussia, PA', '2023-07-01', '2024-07-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'CodePath', 'Technical Fellow', 'King of Prussia, PA', '2022-12-01', '2023-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience (resume_id, experience_id, order_num, created_at, updated_at)
VALUES
-- Alan's Resume (resume_id = 4)
(4, 14, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Raptor Defense
(4, 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Holman
(4, 16, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- RAG AI Chatbot
(4, 17, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- Wiki Game
(4, 18, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- CitySquats
(4, 19, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), -- SASE
(4, 20, 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- CodePath

-- Insert bullet points for Alan's experiences
INSERT INTO bullet_point (experience_id, content, order_num, created_at, updated_at)
VALUES
-- Raptor Defense Company (experience_id 14)
(14, 'Develop a React Native mobile app that interfaces with the LR-2 Trojan autonomous landmine detection rover', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Implement session tracking to log and display rover activity, including GPS-tagged landmine detections', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Integrate Mapbox to provide satellite map visualization with interactive mine markers', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Deploy a distributed Arduino communication system enabling motor controls and real-time app communication', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Holman (experience_id 15)
(15, 'Created internal file upload tool using Blazor with file routing based on 10 file classifications', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Implemented ASP.Net web app interface allowing business users to add entries into a PL/SQL database', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Developed Blazor page to search, add, modify, and delete links in company directory', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Revamped the user interface and modernized 10 outdated .NET web apps', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- RAG AI Chatbot (experience_id 16)
(16, 'Built a RAG-based AI chatbot with Next.js and TypeScript frontend, and Python FastAPI backend', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Enabled vectorized search using ChromaDB for document retrieval and Hugging Face embeddings', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Integrated WebSockets for communication and used Groq Cloud API for LLM inference', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Wiki Game (experience_id 17)
(17, 'Battle Royale Wikipedia-based game using Express and PostgreSQL for link navigation', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Server-sided rendered Wikipedia articles with custom backtracking to prevent cheating', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Utilized web sockets for real-time chatting in lobbies and live multiplayer', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- CitySquats (experience_id 18)
(18, 'Created a React web app enabling users to locate the nearest available restrooms', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Utilized Refuge Restroom API and Google Maps API to display bathroom locations', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Awarded Temple Owlhack''s "Best Accessibility Hack" out of 250+ participants', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO resume_experience_bullet (resume_experience_id, bullet_point_id, is_selected, order_num, created_at, updated_at)
VALUES
-- Raptor Defense bullets (resume_experience_id = 17)
(17, 48, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 49, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 50, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 51, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Holman bullets (resume_experience_id = 18)
(18, 52, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 53, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 54, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 55, 1, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- RAG AI Chatbot bullets (resume_experience_id = 19)
(19, 56, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 57, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 58, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- Wiki Game bullets (resume_experience_id = 20)
(20, 59, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 60, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 61, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- CitySquats bullets (resume_experience_id = 21)
(21, 62, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(21, 63, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(21, 64, 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert any new tags that don't exist yet
INSERT INTO tag (name)
VALUES 
('Real-time Systems');

-- Link tags to Alan's resume (resume_id is 4)
INSERT INTO resume_tag (tag_id, resume_id)
VALUES (2, 4), (3, 4), (5, 4), (6, 4), (7, 4);

-- Link tags to Alan's experiences
INSERT INTO experience_tag (tag_id, experience_id)
VALUES 
-- Raptor Defense (experience_id 14)
(4, 14), (9, 14), (10, 14), (11, 14),
-- Holman (experience_id 15)
(2, 15), (3, 15), (5, 15), (6, 15),
-- RAG AI Chatbot (experience_id 16)
(2, 16), (7, 16), (8, 16),
-- Wiki Game (experience_id 17)
(3, 17), (5, 17), (6, 17), (11, 17),
-- CitySquats (experience_id 18)
(2, 18), (6, 18), (8, 18);

-- Link tags to Alan's bullet points
INSERT INTO bullet_tag (tag_id, bullet_id)
VALUES
-- Raptor Defense bullets
(10, 48), (4, 49), (10, 50), (4, 51),
-- Holman bullets
(2, 52), (5, 53), (2, 54), (2, 55),
-- RAG AI Chatbot bullets
(2, 56), (7, 57), (8, 58),
-- Wiki Game bullets
(3, 59), (3, 60), (11, 61),
-- CitySquats bullets
(2, 62), (8, 63), (2, 64);