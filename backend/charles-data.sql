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

-- Work Experience for Frontend Resume
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(2, 2, 'URBN', 'Talent Analytics Co-Op', '2024-09-30', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'University of Pennsylvania', 'Operations Analysis Co-op', '2023-04-04', '2023-09-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Work Experience for Data Resume
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(2, 3, 'URBN', 'Talent Analytics Co-Op', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'University of Pennsylvania', 'Operations Analysis Co-op', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Projects for Frontend Resume
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(2, 2, 'Project', 'AskVanguard', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Project', 'Quackademics', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Project', 'Pic-A-Recipe', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Projects for Data Resume
INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(2, 3, 'Project', 'Vanguard AI Assistant', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Pic-A-Recipe', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Skills.FYI', '2024-10-01', '2025-03-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Expense Tracker', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'WebCam Rock-Paper-Scissor', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Project', 'Paper Scanner', '2023-04-01', '2023-09-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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