export type JobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT" | "FREELANCE";
export type ExperienceLevel = "FRESHER" | "JUNIOR" | "MID" | "SENIOR";

export type Job = {
  id: number;
  title: string;
  slug: string;
  companyName: string;
  companyLogo?:string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  descriptionHtml:string;
  salaryRange?: string | null;
  applyUrl: string;
  isRemote: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt:string;
};

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  INTERNSHIP: "Internship",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
};

export const EXP_LABEL: Record<ExperienceLevel, string> = {
  FRESHER: "Fresher",
  JUNIOR: "Junior",
  MID: "Mid",
  SENIOR: "Senior",
};
