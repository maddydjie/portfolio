export type StoryBeat = {
  when: string;
  text: string;
  rail: "clinical" | "technical";
};

export const STORY_LABEL = "PATH";

export const STORY_CLOSER = "Normal was never the assignment.";

export const STORY_BEATS: StoryBeat[] = [
  {
    when: "2021",
    text: "Cracked NEET.",
    rail: "clinical",
  },
  {
    when: "Sep 2021",
    text: "Started IIT Madras BS Data Science alongside MBBS.",
    rail: "technical",
  },
  {
    when: "Sep 2025",
    text: "IAF Sydney — space medicine; widened the frame.",
    rail: "clinical",
  },
  {
    when: "2025",
    text: "Landed a clinical ML role.",
    rail: "technical",
  },
];

export const CLINICAL_BEATS = STORY_BEATS.filter((b) => b.rail === "clinical");
export const TECHNICAL_BEATS = STORY_BEATS.filter((b) => b.rail === "technical");
