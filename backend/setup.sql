CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(20) NOT NULL,
  created_at TIMESTAMP,
  phone_number VARCHAR(15),
  linkedin_url VARCHAR(100)
);

CREATE TABLE resume (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE resume_header (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resume_id INTEGER NOT NULL UNIQUE,
  full_name VARCHAR(100),
  email VARCHAR(100),
  phone_number VARCHAR(15),
  linkedin_url VARCHAR(100),
  github_url VARCHAR(100),
  website_url VARCHAR(100),
  show_phone BOOLEAN DEFAULT 0,
  show_linkedin BOOLEAN DEFAULT 0,
  show_github BOOLEAN DEFAULT 0,
  show_website BOOLEAN DEFAULT 0,
  show_full_urls BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resume(id)
);

CREATE TABLE skill (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  resume_id INTEGER NOT NULL,
  name VARCHAR(20),
  order_num INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (resume_id) REFERENCES resume(id)
);

CREATE TABLE coursework (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resume_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  name VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resume(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  resume_id INTEGER NOT NULL,
  institution VARCHAR(100) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  field VARCHAR(100),
  location VARCHAR(100),
  start_date VARCHAR(10),
  end_date VARCHAR(10),
  gpa VARCHAR(10),
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (resume_id) REFERENCES resume(id)
);

CREATE TABLE experience (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  resume_id INTEGER NOT NULL,
  company_name VARCHAR(50),
  position VARCHAR(50),
  location VARCHAR(50),
  is_selected BOOLEAN DEFAULT 1,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (resume_id) REFERENCES resume(id)
);

CREATE TABLE bullet_point (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience_id INTEGER NOT NULL,
  content VARCHAR(150),
  is_selected BOOLEAN DEFAULT 1,
  order_num INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (experience_id) REFERENCES experience(id)
);

CREATE TABLE tag (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE resume_tag (
  tag_id INTEGER NOT NULL,
  resume_id INTEGER NOT NULL,
  PRIMARY KEY (tag_id, resume_id),
  FOREIGN KEY (tag_id) REFERENCES tag(id),
  FOREIGN KEY (resume_id) REFERENCES resume(id)
);

CREATE TABLE experience_tag (
  tag_id INTEGER NOT NULL,
  experience_id INTEGER NOT NULL,
  PRIMARY KEY (tag_id, experience_id),
  FOREIGN KEY (tag_id) REFERENCES tag(id),
  FOREIGN KEY (experience_id) REFERENCES experience(id)
);

CREATE TABLE bullet_tag (
  tag_id INTEGER NOT NULL,
  bullet_id INTEGER NOT NULL,
  PRIMARY KEY (tag_id, bullet_id),
  FOREIGN KEY (tag_id) REFERENCES tag(id),
  FOREIGN KEY (bullet_id) REFERENCES bullet_point(id)
);