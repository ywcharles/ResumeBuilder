export interface DatabaseUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  linkedin_url?: string;
  created_at: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface HeaderSection {
  fullName: string;
  title?: string;
  contact: Contact;
  showPhone: boolean;
  showLinkedIn: boolean;
  showGitHub: boolean;
  showFullUrls: boolean;
}

export interface UpdateHeaderRequest {
  fullName: string;
  title?: string;
  contact: Contact;
  showPhone: boolean;
  showLinkedIn: boolean;
  showGitHub: boolean;
  showFullUrls: boolean;
} 