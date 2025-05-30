export interface DatabaseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  linkedin_url?: string;
  created_at: string;
}

export interface DatabaseResumeHeader {
  id: number;
  resume_id: number;
  full_name: string;
  email: string;
  phone_number?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  show_phone: boolean;
  show_linkedin: boolean;
  show_github: boolean;
  show_website: boolean;
  show_full_urls: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  email: string;
  phone: string;
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

export interface UpdateHeaderRequest {
  fullName: string;
  title?: string;
  contact: Contact;
  showPhone: boolean;
  showLinkedIn: boolean;
  showGitHub: boolean;
  showWebsite?: boolean;
  showFullUrls: boolean;
} 