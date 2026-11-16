export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  keyConcepts: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
  featured: boolean;
}

export interface SkillCategory {
  categoryTitle: string;
  categoryTag: string;
  skills: {
    name: string;
    description: string;
    level: "Intermediate" | "Core";
  }[];
}

export const PERSONAL_INFO = {
  name: "JENIT JENSON",
  displayName: "Jenit Jenson",
  monogram: "JJ",
  role: "FULL-STACK DEVELOPER",
  shortRole: "Full-Stack Developer",
  location: "KERALA, INDIA",
  coordinates: "10.7867° N, 76.2764° E",
  college: "Jyothi Engineering College",
  education: "B.Tech — Computer Science Engineering",
  currentYear: "Currently in 3rd Year",
  email: "jenitson46@gmail.com",
  github: "https://github.com/jenitjenson45-debug",
  linkedin: "https://www.linkedin.com/in/jenit-jenson-116a2b387",
  
  tagline: "THE ART OF BUILDING DIGITAL EXPERIENCES.",
  heroIntro: "HELLO, I'M JENIT JENSON.",
  heroStatement:
    "I build thoughtful digital experiences through clean engineering, creative design and modern web technologies.",
  heroVerticalText: "DESIGNING · DEVELOPING · CREATING",
  
  aboutHeading: "THE PERSON BEHIND THE PIXELS.",
  aboutParagraphs: [
    "Hi, I'm Jenit Jenson, a B.Tech Computer Science Engineering student at Jyothi Engineering College and an aspiring Full-Stack Developer.",
    "I enjoy transforming ideas into meaningful digital experiences, combining thoughtful UI/UX design with modern web technologies.",
    "My interests include full-stack development, interactive interfaces, creative web experiences and building practical technology solutions.",
  ],
  philosophy: "GOOD DESIGN ATTRACTS. GREAT ENGINEERING MAKES IT WORK.",
  
  projectsHeading: "SELECTED WORKS.",
  projectsSubheading: "Some ideas deserve to become more than just ideas.",
  
  skillsHeading: "TOOLS OF THE CRAFT.",
  skillsSubheading: "Technology is the medium. Building meaningful experiences is the goal.",
  skillsStatement: "ALWAYS LEARNING. ALWAYS BUILDING.",
  proficiencyLevel: "INTERMEDIATE",
  
  contactHeading: "LET'S BUILD SOMETHING MEANINGFUL.",
  contactStatement: "HAVE AN IDEA? LET'S MAKE IT REAL.",
  availabilityStatement: "OPEN TO INTERESTING PROJECTS, COLLABORATIONS AND OPPORTUNITIES.",
  
  footerTagline: "DESIGNED WITH INTENTION. BUILT WITH PURPOSE.",
  copyrightYear: 2026,
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "resqlink",
    number: "01",
    title: "ResQLink",
    subtitle: "Disaster Alert & Emergency Response Platform",
    category: "Disaster Management Platform",
    description:
      "A disaster alert and emergency response platform designed to help residents receive location-relevant warnings and improve coordination during emergencies.",
    keyConcepts: [
      "Location-based disaster alerts",
      "Resident notification system",
      "Administrative monitoring",
      "Emergency SOS functionality",
      "Rescue coordination",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
    ],
    liveUrl: "https://resqlink-citizen-portal.vercel.app/",
    githubUrl: "https://github.com/jenitjenson45-debug/_Resqlink-",
    image: "/images/hero-ref.jpg",
    featured: true,
  },
  {
    id: "resqmesh",
    number: "02",
    title: "ResQMesh",
    subtitle: "Offline-Verifiable Responder Identity Concept",
    category: "Emergency Response / Responder Verification",
    description:
      "An offline-verifiable responder identity concept designed to support trusted responder credentials and verification workflows.",
    keyConcepts: [
      "Offline-verifiable identity framework",
      "Trusted responder credential verification",
      "Decentralized responder authentication workflows",
      "Resilient field validation during communication loss",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Offline Verification",
      "Cryptographic Badges",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/austinjosephes/ResQMesh-DisasterManagement",
    image: "/images/full-ref.jpg",
    featured: true,
  },
  {
    id: "sentinel-ai",
    number: "03",
    title: "Sentinel AI",
    subtitle: "Cybersecurity Threat-Monitoring Concept",
    category: "Cybersecurity",
    description:
      "A cybersecurity threat-monitoring project concept focused on identifying, monitoring and presenting potential security threats.",
    keyConcepts: [
      "Threat vector identification & telemetry",
      "Potential security anomaly surveillance",
      "Structured threat diagnostics dashboard",
      "Incident logging and presentation flow",
    ],
    technologies: [
      "Python",
      "React",
      "Threat Telemetry",
      "Security Monitoring",
      "REST APIs",
    ],
    githubUrl: "https://github.com/jenitjenson45-debug",
    image: "/images/design-ref.jpg",
    featured: true,
  },
];

export const SKILLS_CATEGORIES: SkillCategory[] = [
  {
    categoryTitle: "FRONTEND DEVELOPMENT",
    categoryTag: "01 / CLIENT ARCHITECTURE",
    skills: [
      {
        name: "HTML",
        description: "Semantic document structure, accessibility standards, and SEO-friendly markup.",
        level: "Intermediate",
      },
      {
        name: "CSS",
        description: "Responsive layouts, Flexbox, Grid, custom properties, and fluid typography.",
        level: "Intermediate",
      },
      {
        name: "JavaScript",
        description: "Modern ES6+ syntax, asynchronous event loops, promises, and DOM manipulation.",
        level: "Intermediate",
      },
      {
        name: "React.js",
        description: "Component lifecycle, functional architecture, custom hooks, and state management.",
        level: "Intermediate",
      },
      {
        name: "Next.js",
        description: "App Router, server and client components, API routes, and optimized rendering.",
        level: "Intermediate",
      },
      {
        name: "TypeScript",
        description: "Static typing, interfaces, generic contracts, and scalable codebase reliability.",
        level: "Intermediate",
      },
    ],
  },
  {
    categoryTitle: "PROGRAMMING",
    categoryTag: "02 / SYSTEMS & LOGIC",
    skills: [
      {
        name: "C",
        description: "Core computer science fundamentals, memory management, pointers, and data structures.",
        level: "Intermediate",
      },
    ],
  },
  {
    categoryTitle: "DEVELOPMENT TOOLS",
    categoryTag: "03 / WORKFLOW & VERSIONING",
    skills: [
      {
        name: "Git",
        description: "Distributed version control, branching strategies, commit history, and staging.",
        level: "Intermediate",
      },
      {
        name: "GitHub",
        description: "Remote repository synchronization, code reviews, collaboration, and pull requests.",
        level: "Intermediate",
      },
    ],
  },
];
