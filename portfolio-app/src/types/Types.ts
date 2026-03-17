export interface Skill {
    id: string;
    name: string;
    category: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    timeFrame: string;
    status: string;
    description: string;
}

export interface Certification {
    id: string;
    name: string;
    issued: string;
}

export interface Assignment {
    name: string;
    dates: string;
    task: string;
}

export interface Experience {
    id: string;
    slug: string;
    company: string;
    position: string;
    timeFrame: string;
    description: string | null;
    assignments: Assignment[];
}

export interface ProjectView {
    label: string;
    image: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    github: string | null;
    liveUrl: string | null;
    features: string[];
    views: ProjectView[];
}

export interface PortfolioProfile {
    skills: Skill[];
    projects: Project[];
    education: Education[];
    certifications: Certification[];
    experience: Experience[];
}

export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}