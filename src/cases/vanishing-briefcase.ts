import type { Case } from "../types";

/**
 * The Case of the Vanishing Briefcase
 * ------------------------------------
 * In the neon-lit streets of 1985, a briefcase containing sensitive documents
 * has mysteriously vanished from the Blue Note Lounge. A lone witness reported
 * seeing a man in a trench coat with a distinctive scar on his left cheek fleeing the scene.
 * Your task is to follow the clues: retrieve the crime scene details, narrow down the suspect list,
 * and confirm the culprit through their interview transcript.
 */
const vanishingBriefcaseCase: Case = {
  id: "case-001",
  title: "The Vanishing Briefcase",
  difficulty: 1, // Easy (3 steps)
  description:
    "A briefcase containing sensitive documents has vanished from the Blue Note Lounge. Follow the clues to identify the thief.",
  xpReward: 50,
  completed: false,
  category: "beginner",
  brief:
    "Set in the gritty 1980s, a valuable briefcase has disappeared from the Blue Note Lounge. A witness reported that a man in a trench coat with a scar on his left cheek was seen fleeing the scene. Investigate the crime scene, review the list of suspects, and examine interview transcripts to reveal the culprit.",
  objectives: [
    "Retrieve the crime scene details to gather the key clue.",
    "Identify the suspect whose profile matches the witness description.",
    "Verify the suspect using their interview transcript.",
  ],
  solution: {
    answer: "Vincent Malone",
    successMessage:
      "Congratulations, detective! You have successfully identified Vincent Malone as the culprit.",
    explanation: `First, you retrieved the crime scene details from the 'crime_scene' table which mentioned a man in a trench coat with a scar on his left cheek. Next, querying the 'suspects' table narrowed the field down to three individuals. Finally, examining the 'interviews' table confirmed that only Vincent Malone's transcript aligned with the evidence, revealing him as the thief.`,
  },
  // Database schema and initial data
  schema: [
    // Create and populate the crime_scene table
    `CREATE TABLE crime_scene (
      id INTEGER PRIMARY KEY,
      date INTEGER,
      type TEXT,
      location TEXT,
      description TEXT
    );`,
    `INSERT INTO crime_scene (id, date, type, location, description) VALUES
      (1, 19851120, 'theft', 'Blue Note Lounge', 'A briefcase containing sensitive documents vanished. A witness reported a man in a trench coat with a scar on his left cheek fleeing the scene.')
    ;`,

    // Create and populate the suspects table
    `CREATE TABLE suspects (
      id INTEGER PRIMARY KEY,
      name TEXT,
      attire TEXT,
      scar TEXT
    );`,
    `INSERT INTO suspects (id, name, attire, scar) VALUES
      (1, 'Vincent Malone', 'trench coat', 'left cheek'),
      (2, 'Tony DeMarco', 'suit', 'none'),
      (3, 'Frankie Lombardi', 'trench coat', 'none')
    ;`,

    // Create and populate the interviews table
    `CREATE TABLE interviews (
      suspect_id INTEGER,
      transcript TEXT,
      FOREIGN KEY(suspect_id) REFERENCES suspects(id)
    );`,
    `INSERT INTO interviews (suspect_id, transcript) VALUES
      (1, 'I got a scar on my left cheek from a bar fight long ago, but I wasn’t anywhere near the lounge that night.'),
      (2, 'I was tied up at a business meeting all evening. I wouldn’t risk a theft on my watch.'),
      (3, 'I was just passing by; I have no connection with any theft.')
    ;`,
  ],
};

export default vanishingBriefcaseCase;
