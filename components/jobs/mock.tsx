import { Job } from "./jobsSchema";

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "MERN Stack Developer",
    slug: "mern-stack-developer",
    descriptionHtml: `
      <h2>About the role</h2>
      <p>We are looking for a MERN developer who can build production-ready features.</p>

      <h3>Responsibilities</h3>
      <ul>
        <li>Build APIs using Node.js + Express</li>
        <li>Develop UI in React + Next.js</li>
        <li>Work with MongoDB + Prisma</li>
      </ul>

      <h3>Requirements</h3>
      <ul>
        <li>Good JavaScript fundamentals</li>
        <li>Basic AWS knowledge is a plus</li>
        <li>Strong communication</li>
      </ul>

      <p><b>Note:</b> This is a job notification post. Please apply using the official link.</p>
    `,

    companyName: "SkillHub Labs",
    companyLogo: null,
    location: "Bengaluru, India",
    jobType: "FULL_TIME",
    experienceLevel: "JUNIOR",
    salaryRange: "₹6–10 LPA",
    applyUrl: "https://example.com/apply",
    isRemote: true,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 2,
    title: "Node.js Backend Intern",
    slug: "node-backend-intern",
    descriptionHtml: `
      <h2>Internship Overview</h2>
      <p>Great opportunity for freshers to start backend development with Node.js.</p>

      <h3>Skills</h3>
      <ul>
        <li>Node.js, Express</li>
        <li>MongoDB basics</li>
        <li>REST APIs</li>
      </ul>

      <p><b>Apply:</b> Use the official link.</p>
    `,

    companyName: "CloudNova",
    companyLogo: null,
    location: "Hyderabad, India",
    jobType: "INTERNSHIP",
    experienceLevel: "FRESHER",
    salaryRange: "₹15k–25k / month",
    applyUrl: "https://example.com/apply",
    isRemote: false,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
];