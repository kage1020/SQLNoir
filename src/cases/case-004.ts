import type { Case } from "../types";

const midnightMasqueradeMurderCase: Case = {
  id: "case-004",
  title: "The Midnight Masquerade Murder",
  difficulty: 5,
  description:
    "Leonard Pierce was murdered at a Coconut Grove masked ball. Follow the clues to reveal the true murderer.",
  xpReward: 300,
  completed: false,
  isNew: false,
  category: "advanced",
  brief: `On October 31, 1987, at a Coconut Grove mansion masked ball, Leonard Pierce was found dead in the garden. Can you piece together all the clues to expose the true murderer?`,
  objectives: ["Reveal the true murderer of this complex case."],
  solution: {
    answer: "Marco Santos",
    successMessage:
      "Outstanding detective work! The evidence conclusively shows that Marco Santos is the true murderer.",
    explanation: `You began by retrieving the crime scene record and examining witness statements, which mentioned a hotel booking at The Grand Regency (room 707 on 19871030).
Filtering hotel check-ins by these clues returned multiple entries.
A JOIN with surveillance records narrowed the field to one key entry that noted a subject yelling on a phone ("I'm gonna kill him!").
Reviewing phone records, you found a call to Victor DiMarco containing the phrase "Why did you kill him, bro? You should have let the carpenter do his job!"
Identifying the recipient of that call and interviewing him revealed that he was not the killer but hinted that the true murderer is a carpenter driving a Lamborghini.
Joining the vehicle registry with the person table (filtering for occupation "Carpenter" and car model "Lamborghini") yielded one candidate.
A final interview with that candidate resulted in a confession.
Thus, the true murderer is Marco Santos.`,
  },
};

export default midnightMasqueradeMurderCase;
