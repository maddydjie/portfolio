export type EducationEntry = {
  id: string;
  degree: string;
  school: string;
  proof?: string;
  detail: string;
  logo: {
    src: string;
    alt: string;
  };
};

/** Dual degree run in parallel - the structural fact under the career. */
export const EDUCATION = {
  eyebrow: "EDUCATION",
  headline: "Two degrees. One timeline.",
  note: "MBBS at Andhra Medical College and the IIT Madras BS in Data Science, overlapping for years. Wards and exams on one rail, data science on the other.",
  entries: [
    {
      id: "mbbs",
      degree: "MBBS",
      school: "Andhra Medical College",
      proof: "Distinction, Year 2",
      detail: "Bedside clinical training. The healthcare base under every model since.",
      logo: {
        src: "/logos/amc.png",
        alt: "Andhra Medical College crest",
      },
    },
    {
      id: "iitm",
      degree: "BS Data Science",
      school: "IIT Madras",
      proof: "Degree in Data Science and Applications",
      detail: "Built the technical half of the dual track while still in medical school.",
      logo: {
        src: "/logos/iitm.png",
        alt: "IIT Madras logo",
      },
    },
  ] satisfies EducationEntry[],
} as const;
