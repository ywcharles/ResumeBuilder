export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  content: any;
  isVisible: boolean;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  phone_number?: string;
  linkedin_url?: string;
}

export enum SectionType {
  HEADER = 'header',
  SUMMARY = 'summary',
  EXPERIENCE = 'experience',
  EDUCATION = 'education',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CERTIFICATIONS = 'certifications',
  LANGUAGES = 'languages',
  INTERESTS = 'interests',
  CUSTOM = 'custom'
}

export interface Contact {
  email: string;
  phone: string;
  // location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface HeaderSection {
  fullName: string;
  title?: string;
  contact: Contact;
  showPhone: boolean;
  showLinkedIn: boolean;
  showGitHub: boolean;
  showWebsite?: boolean;
  showFullUrls: boolean;
}

export interface SummarySection {
  text: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: { content: string; tags: { id: number; name: string }[] }[];
  fromBank?: boolean;
}

export interface ExperienceSection {
  items: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface EducationSection {
  items: EducationItem[];
}

export interface SkillsSection {
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProjectsSection {
  items: ProjectItem[];
}

export interface CertificationsSection {
  items: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    expires?: string;
    url?: string;
  }[];
}

export interface CustomSection {
  title: string;
  content: string;
}