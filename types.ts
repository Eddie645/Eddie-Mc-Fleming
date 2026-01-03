
export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
  image?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}