import type { Case } from "../types";

/**
 * The Miami Marina Murder
 *
 * August 14, 1986. A body was found near the docks of Coral Bay Marina.
 * Two potential suspects were last seen near the scene. One is known to live on a certain street,
 * and the other has a name ending in a specific way.
 *
 * Step 1: Identify the crime scene.
 * Step 2: Find both suspects based on the clues provided.
 * Step 3: Interview the suspects and obtain two separate clues.
 * Step 4: Use the first clue to filter hotel check-ins by exact date.
 * Step 5: Use the second clue to further filter hotel check-ins using a JOIN (reducing to 3 possible suspects).
 * Step 6: Find and interrogate all 3 suspects.
 * Step 7: Find the final confession.
 */
const miamiMarinaMurderCase: Case = {
  id: "case-003",
  title: "The Miami Marina Murder",
  difficulty: 2, // Intermediate (multi-step, breadcrumb-style clues)
  description:
    "A body was found at Coral Bay Marina. Two potential suspects were last seen near the scene.",
  xpReward: 200,
  completed: false,
  category: "intermediate",
  brief: `August 14, 1986. A body was found floating near the docks of Coral Bay Marina. Your job detective is to find the murderer and bring them to justice.
This case might require the use of JOINs, wildcard searches, and logical deduction. Get to work, detective.`,
  objectives: [
    "Find the murderer. ( Start by finding the crime scene and go from there )",
  ],
  solution: {
    answer: "Thomas Brown",
    successMessage:
      "Great detective work! Thomas Brown has confessed to the crime.",
    explanation: `The investigation started with two suspects from the crime scene, one living on Ocean Drive and the other with a name ending in "ez".
After interviewing them, hotel check-ins were filtered using two separate clues—first by date, then further refined using surveillance records.
Only three people matched both filters.
An interview with each of them revealed their role in the case, and after pressing further, Thomas Brown confessed to the crime.`,
  },
};

export default miamiMarinaMurderCase;
