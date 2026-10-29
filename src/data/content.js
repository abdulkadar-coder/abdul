export const profile = {
  name: "Syed Abdul Kadar P",
  shortName: "Abdul Kadar",
  role: ["Cybersecurity", "Web Application Security", "Penetration Testing"],
  tagline:
    "I explore systems, break assumptions and validate real vulnerabilities — then write them up with clear impact and a working proof of concept.",
  summary:
    "Entry-level cybersecurity professional based in Chennai, focused on web application security, reconnaissance and vulnerability assessment.",
  email: "syedabdulkadar8@gmail.com",
  phone: "+91 70947 62770",
  phoneHref: "+917094762770",
  location: "Chennai, Tamil Nadu, India",
  availability: "Open to junior pentest / appsec roles",
  resume: "assets/resume/Syed-Abdul-Kadar-Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/abdulkadar-coder" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/syed-abdul-kadar-382522328",
    },
    { label: "TryHackMe", href: "https://tryhackme.com/p/abdulkadar4416" },
  ],
};

export const navItems = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "research", label: "Research", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "credentials", label: "Credentials", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

export const stats = [
  { value: 3, label: "Vulnerability reports" },
  { value: 4, label: "Internships" },
  { value: 6, label: "Projects shipped" },
];

export const aboutFacts = [
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Web app sec · pentesting · recon" },
  { label: "Status", value: "Available for opportunities", accent: true },
  { label: "Languages", value: "English, Tamil" },
];

export const aboutParagraphs = [
  "My workflow is simple: map the attack surface, test the assumptions a developer made, confirm the issue with a minimal proof of concept, and report it so the fix is obvious. I work with Burp Suite, Nmap, SQLMap and Metasploit on Kali Linux, and I document findings with reproduction steps and business impact rather than raw tool output.",
  "Outside of assessments I take part in bug bounty programs, build security tooling and compete in CTFs — including international rounds with Team P4X7. I'm currently looking for a junior role in penetration testing or application security.",
];

export const skills = [
  {
    index: "01",
    title: "Web Application Security",
    description:
      "Finding and proving issues in real applications, from input handling to broken access control.",
    tags: ["OWASP Top 10", "SQL Injection", "XSS", "IDOR", "AuthN / AuthZ", "API security"],
  },
  {
    index: "02",
    title: "Recon & Assessment",
    description:
      "Building the map before testing anything: assets, subdomains, services and exposed surfaces.",
    tags: [
      "Asset discovery",
      "Subdomain enumeration",
      "Network scanning",
      "Directory checks",
      "Info disclosure",
      "SSL/TLS misconfig",
    ],
  },
  {
    index: "03",
    title: "Security Tooling",
    description:
      "The daily drivers for interception, enumeration, exploitation and post-exploitation validation.",
    tags: ["Burp Suite", "Nmap", "SQLMap", "Metasploit", "Kali Linux", "OWASP"],
  },
  {
    index: "04",
    title: "Programming",
    description:
      "Writing the scripts, APIs and tools that support testing and automate the boring parts.",
    tags: ["Python", "Java", "JavaScript / TypeScript", "C", "REST APIs"],
  },
  {
    index: "05",
    title: "Systems & Platforms",
    description: "Comfortable across both worlds, with a preference for the terminal.",
    tags: ["Linux", "Windows", "Hyperledger Fabric", "Supabase / Postgres", "Git & GitHub"],
  },
  {
    index: "06",
    title: "Security Practice",
    description:
      "The non-glamorous half of security: documentation, triage and disclosure that gets taken seriously.",
    tags: [
      "Vulnerability assessment",
      "Bug bounty",
      "PoC development",
      "Responsible disclosure",
      "Report writing",
      "CVSS scoring",
    ],
  },
];

export const projects = [
  {
    id: "zerotrust",
    index: "01",
    featured: true,
    title: "ZeroTrust HRMS",
    subtitle: "Zero-trust employee data management system",
    description: [
      "A TypeScript REST API where authorization is re-checked on every request, not just at login. Documents are encrypted with AES-256-GCM using context-bound AAD and SHA-256 integrity checks, so only ciphertext ever reaches storage. An append-only, hash-linked audit chain records every sensitive action.",
      "The data layer runs on a four-organisation Hyperledger Fabric network, validated by 69 automated tests and 38 live checks.",
    ],
    tags: ["TypeScript", "JWT", "AES-256-GCM", "Hyperledger Fabric", "Zero trust"],
    categories: ["security", "fullstack"],
    link: "https://github.com/abdulkadar-coder/decentralizeddb",
    metrics: [
      { value: "69", label: "automated tests" },
      { value: "38", label: "live checks" },
      { value: "4-org", label: "Fabric network" },
    ],
  },
  {
    id: "ai-interview",
    index: "02",
    title: "AI Interview",
    subtitle: "Adaptive interview assessment platform",
    description: [
      "An AI-powered interview platform that conducts adaptive interviews through real-time voice interaction, evaluates responses and generates performance analytics for each candidate.",
    ],
    tags: ["AI", "Full stack", "Voice"],
    categories: ["ai", "fullstack"],
  },
  {
    id: "reconforge",
    index: "03",
    title: "ReconForge",
    subtitle: "Unified reconnaissance toolkit",
    description: [
      "A terminal-based toolkit that organises multiple reconnaissance and enumeration utilities into a single, repeatable workflow — so recon output stays consistent instead of scattered across one-off commands.",
    ],
    tags: ["Python", "Recon", "Automation"],
    categories: ["security"],
  },
  {
    id: "terms-analyzer",
    index: "04",
    title: "Terms Analyzer",
    subtitle: "Privacy policy risk scanner",
    description: [
      "A browser security extension that analyses website terms and privacy policies, flagging risky, misleading or concerning clauses before the user agrees to them.",
    ],
    tags: ["Browser extension", "NLP", "Privacy"],
    categories: ["ai", "security"],
  },
  {
    id: "web-sec-lab",
    index: "05",
    title: "Web Sec Lab",
    subtitle: "Documented offensive security research",
    description: [
      "A research project that applies offensive security and web application testing techniques to real targets, documenting methodology, evidence and remediation rather than just payloads.",
    ],
    tags: ["Offensive security", "Web testing", "Research"],
    categories: ["security"],
    link: "https://github.com/abdulkadar-coder/cybermart-lab-",
  },
  {
    id: "canteen",
    index: "06",
    title: "Canteen Portal",
    subtitle: "Full-stack food ordering platform",
    description: [
      "A canteen management platform with role-based access, real-time order tracking and dashboards for ordering, inventory and day-to-day operations.",
    ],
    tags: ["Full stack", "RBAC", "Dashboards"],
    categories: ["fullstack"],
    link: "https://github.com/abdulkadar-coder/foodmanagementweb",
  },
];

export const research = [
  {
    id: "carenium",
    number: "01",
    severity: "critical",
    severityLabel: "Critical",
    title: "Carenium — KYC & passport data exposure",
    meta: "Supabase anon key in production JS · permissive RLS · public storage bucket · CVSS 9.1",
    idLabel: "Disclosed",
    short: "Carenium Healthcare — anonymous KYC & passport data disclosure",
  },
  {
    id: "dekco",
    number: "02",
    severity: "critical",
    severityLabel: "Critical",
    title: "Dekco — unauthenticated Orthanc PACS admin API",
    meta: "Patient PHI + raw DICOM exposed · writable server · CWE-285",
    idLabel: "#73328074",
    short: "Dekco — unauthenticated Orthanc PACS admin API exposes patient PHI",
  },
  {
    id: "vibinex",
    number: "03",
    severity: "high",
    severityLabel: "High",
    title: "Vibinex — unauthenticated SQL injection & DB write",
    meta: "Unparameterised UPDATE · no auth on /api/dpu/aliases · CWE-89",
    idLabel: "#80036429",
    short: "Vibinex — unauthenticated SQL injection and database write",
  },
];

export const experience = [
  {
    period: "Oct 2025 — Present",
    type: "Virtual internship",
    role: "Cybersecurity & Web Application Security Intern",
    org: "NullClass",
    bullets: [
      "Test web applications for OWASP Top 10 vulnerabilities, including SQL injection, XSS, IDOR and broken access control.",
      "Take part in bug bounty programs and document each finding with reproduction steps, impact and proof of concept.",
      "Review triage feedback to understand how reports are validated and improve responsible disclosure practice.",
    ],
  },
  {
    period: "Sep 2026",
    type: "8-week program",
    role: "Web Exploit Hunting & Bug Bounty Intern",
    org: "EduSkills",
    bullets: [
      "Completed an eight-week program covering bug bounty fundamentals, lab setup, reconnaissance and information leakage.",
      "Practised SSL/TLS and cookie security checks, scanning, enumeration and web exploitation, finishing with a capstone project.",
    ],
  },
  {
    period: "Internship",
    type: "Network security",
    role: "Network Security Intern",
    org: "Extazee Software",
    bullets: [
      "Learned core network security concepts and built a foundation in network assessment and spotting potential weaknesses.",
    ],
  },
  {
    period: "Internship",
    type: "Project based",
    role: "Cybersecurity Project Intern",
    org: "DG Interns Hub",
    bullets: [
      "Completed project-based cybersecurity tasks that applied security concepts to practical, real-world problems.",
    ],
  },
];

export const credentials = [
  {
    year: "2025",
    title: "Cybersecurity & Web Application Penetration Testing",
    issuer: "NullClass",
    tag: "Certification",
  },
  {
    year: "2025",
    title: "Python Programming",
    issuer: "CodeTantra · Feb — Jun 2025",
    tag: "Certification",
  },
  {
    year: "2025",
    title: "Web Application Development",
    issuer: "Star Systems · Mar 2025",
    tag: "Certification",
  },
  {
    year: "2024",
    title: "Cyber Security for Beginners",
    issuer: "TCS · Nov 2024",
    tag: "Certification",
  },
  {
    year: "Training",
    title: "WiFi Penetration Testing",
    issuer: "Wireless network assessment, weak encryption and misconfiguration testing.",
    tag: "Additional",
  },
  {
    year: "Training",
    title: "Cyber Simulation",
    issuer: "Hands-on simulated cyber scenarios and incident response exercises.",
    tag: "Additional",
  },
];

export const competitions = [
  {
    badge: "International CTF",
    title: "Into the Void 2.0",
    meta: "Chennai Institute of Technology · Team P4X7",
  },
  {
    badge: "Hackathon",
    title: "Hackathon 2025",
    meta: "National Cyber Security Research Council · IIT Madras",
  },
  {
    badge: "CTF",
    title: "ByteBeat 2025",
    meta: "SRM Institute of Science and Technology",
  },
];

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "security", label: "Security" },
  { value: "fullstack", label: "Full stack" },
  { value: "ai", label: "AI" },
];

export const marqueeItems = [
  "Burp Suite",
  "Nmap",
  "SQLMap",
  "Metasploit",
  "Kali Linux",
  "OWASP Top 10",
  "Reconnaissance",
  "Responsible Disclosure",
  "Web App Security",
  "CTF",
];
