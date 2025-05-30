import { create } from 'zustand';
import { 
  ResumeSection, 
  SectionType, 
  HeaderSection,
  SummarySection,
  ExperienceSection,
  EducationSection,
  SkillsSection
} from '../types';
import { generateId } from '../utils/utils';

interface ResumeState {
  sections: ResumeSection[];
  activeSection: string | null;
  currentResumeId: number | null;
  setCurrentResumeId: (id: number) => void;
  setActiveSection: (id: string | null) => void;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, data: Partial<ResumeSection>) => void;
  updateSectionContent: (id: string, content: any) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  toggleSectionVisibility: (id: string) => void;
}

const defaultHeaderSection: HeaderSection = {
  fullName: 'Your Name', //should be first_name + last_name
  // title: 'Professional Title',
  contact: {
    email: 'your.email@example.com',
    phone: '(123) 456-7890',
    // location: 'City, State',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername',
    website: 'yourwebsite.com'
  },
  showPhone: true,
  showLinkedIn: true,
  showGitHub: true,
  showWebsite: false,
  showFullUrls: false
};

// const defaultSummarySection: SummarySection = {
//   text: 'Experienced professional with a track record of success in...'
// };

const defaultExperienceSection: ExperienceSection = {
  items: []
};

const defaultEducationSection: EducationSection = {
  items: []
};

const defaultSkillsSection: SkillsSection = {
  skills: []
};

const initialSections: ResumeSection[] = [
  {
    id: generateId(),
    type: SectionType.HEADER,
    title: 'Contact Information',
    content: defaultHeaderSection,
    isVisible: true
  },
  // {
  //   id: generateId(),
  //   type: SectionType.SUMMARY,
  //   title: 'Professional Summary',
  //   content: defaultSummarySection,
  //   isVisible: true
  // },
  {
    id: generateId(),
    type: SectionType.EXPERIENCE,
    title: 'Work Experience',
    content: defaultExperienceSection,
    isVisible: true
  },
  {
    id: generateId(),
    type: SectionType.EDUCATION,
    title: 'Education',
    content: defaultEducationSection,
    isVisible: true
  },
  {
    id: generateId(),
    type: SectionType.SKILLS,
    title: 'Skills',
    content: defaultSkillsSection,
    isVisible: true
  }
];

export const useResumeStore = create<ResumeState>((set) => ({
  sections: initialSections,
  activeSection: null,
  currentResumeId: null,
  
  setCurrentResumeId: (id) => set({ currentResumeId: id }),
  
  setActiveSection: (id) => set({ activeSection: id }),
  
  addSection: (type) => set((state) => {
    const newSection: ResumeSection = {
      id: generateId(),
      type,
      title: getDefaultTitleForType(type),
      content: getDefaultContentForType(type),
      isVisible: true
    };
    
    return { sections: [...state.sections, newSection] };
  }),
  
  removeSection: (id) => set((state) => ({
    sections: state.sections.filter(section => section.id !== id),
    activeSection: state.activeSection === id ? null : state.activeSection
  })),
  
  updateSection: (id, data) => set((state) => ({
    sections: state.sections.map(section => 
      section.id === id ? { ...section, ...data } : section
    )
  })),
  
  updateSectionContent: (id, content) => set((state) => ({
    sections: state.sections.map(section => 
      section.id === id ? { ...section, content } : section
    )
  })),
  
  reorderSections: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.sections);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    return { sections: result };
  }),
  
  toggleSectionVisibility: (id) => set((state) => ({
    sections: state.sections.map(section => 
      section.id === id ? { ...section, isVisible: !section.isVisible } : section
    )
  }))
}));

function getDefaultTitleForType(type: SectionType): string {
  switch (type) {
    case SectionType.HEADER: return 'Contact Information';
    // case SectionType.SUMMARY: return 'Professional Summary';
    case SectionType.EXPERIENCE: return 'Work Experience';
    case SectionType.EDUCATION: return 'Education';
    case SectionType.SKILLS: return 'Skills';
    case SectionType.PROJECTS: return 'Projects';
    case SectionType.CERTIFICATIONS: return 'Certifications';
    case SectionType.LANGUAGES: return 'Languages';
    case SectionType.INTERESTS: return 'Interests';
    case SectionType.CUSTOM: return 'Custom Section';
    default: return 'New Section';
  }
}

function getDefaultContentForType(type: SectionType): any {
  switch (type) {
    case SectionType.HEADER: return defaultHeaderSection;
    // case SectionType.SUMMARY: return defaultSummarySection;
    case SectionType.EXPERIENCE: return defaultExperienceSection;
    case SectionType.EDUCATION: return defaultEducationSection;
    case SectionType.SKILLS: return defaultSkillsSection;
    case SectionType.PROJECTS: return { items: [] };
    case SectionType.CERTIFICATIONS: return { items: [] };
    case SectionType.LANGUAGES: return { items: [] };
    case SectionType.INTERESTS: return { items: [] };
    case SectionType.CUSTOM: return { title: 'Custom Section', content: '' };
    default: return {};
  }
}