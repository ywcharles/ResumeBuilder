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

INSERT INTO experience (user_id, resume_id, company_name, description, start_date, end_date, created_at, updated_at)
VALUES
(1, 1, 'Susquehanna International Group', 'Software Developer', '2023-09-01', '2024-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'The Stratagem Group', 'Software Engineer', '2022-09-01', '2023-08-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Berkley Technology Services', 'Automation Engineer', '2021-09-01', '2022-03-31', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

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