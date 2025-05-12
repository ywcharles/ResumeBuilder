export interface ResumeItem {
    id: string;
    type: 'experience' | 'education' | 'skill' | 'project' | 'certification';
    content: unknown;
  }
  
  export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }
  
  export interface Skill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }
  
  export interface Project {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }
  
  export interface Certification {
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }