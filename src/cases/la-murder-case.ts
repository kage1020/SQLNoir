import type { Case } from "../types";

/**
 * LA Noir Murder Mystery – "The Case of the Midnight Caller"
 *
 * In the neon-lit backstreets of Los Angeles, a prominent film director is found dead.
 * Detective Sam Carter is called to untangle a web of deceit, where every clue is
 * hidden among the shadows. Evidence spread across multiple interconnected tables – from
 * suspect records and crime scenes to cryptic witness statements – ultimately points to one man.
 *
 * Your mission: piece together the evidence, follow the clues, and determine the true culprit.
 */
const laMurderCase: Case = {
  id: "la-noir-murder-case",
  title: "The Case of the Midnight Caller",
  difficulty: 3,
  description:
    "A twisted tale of murder in the shadowy backstreets of Los Angeles, where every clue is a step deeper into a labyrinth of deceit.",
  xpReward: 150,
  completed: false,
  category: "intermediate",
  brief: `On a cold November night in 1995, Los Angeles was shaken by the murder of a renowned film director.
  Detective Sam Carter finds himself amid a tangled maze of suspects, each with secrets they’d rather keep hidden.
  The clues are scattered across disparate records – from the suspects' registry to the crime scenes and the witness statements.
  A distinct pattern emerges: a cryptic note, a mismatched receipt, and a fingerprint that don’t fit the narrative of the innocent.
  All evidence converges on one elusive figure whose story doesn’t add up. Uncover the layers of deception and expose the true killer.`,
  objectives: [
    "Review the suspects in the suspects table.",
    "Examine the evidence records for clues linking suspects to the crime scenes.",
    "Analyze witness statements for corroborative details.",
    "Join data across tables to deduce the murderer’s identity.",
  ],
  solution: {
    answer: "Vincent Romano",
    successMessage:
      "Excellent work, Detective! Your queries have unveiled the truth – Vincent Romano is the culprit behind the murder.",
    explanation: `The investigation required multiple steps:
  1. Querying the suspects table reveals several individuals with potential motives.
  2. Cross-referencing the evidence table shows that the fingerprint, a mysterious note ("The sun sets only for Vincent"), and a signed receipt all point to suspect ID 3.
  3. Further validation comes from witness statements, where multiple witnesses mention sightings and conversations implicating Vincent Romano.
  By joining these clues from different tables, you determined that only Vincent Romano connects all the dots, conclusively solving the case.`,
  },
  // Database schema and initial data
  schema: [
    // Create the suspects table
    `CREATE TABLE suspects (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        occupation TEXT,
        alibi TEXT
      );`,
    // Insert suspect records (noise rows can be added later)
    `INSERT INTO suspects (id, name, occupation, alibi) VALUES
        (1, 'Mickey Doyle', 'Business Partner', 'At the jazz club until late'),
        (2, 'Samantha Price', 'Ex-Wife', 'Visiting a friend across town'),
        (3, 'Vincent Romano', 'Film Producer', 'Claimed to be in a meeting, though evidence contradicts this'),
        (4, 'Gina Lavoie', 'Femme Fatale', 'Seen at a cocktail party in the West End'),
        (5, 'Arthur Belmont', 'Nightclub Owner', 'Operating his club during the time of the murder');`,

    // Create the scenes table
    `CREATE TABLE scenes (
        id INTEGER PRIMARY KEY,
        location TEXT NOT NULL,
        time TEXT,
        description TEXT
      );`,
    // Insert scene records
    `INSERT INTO scenes (id, location, time, description) VALUES
        (1, 'Downtown Alley', '1995-11-15 23:00', 'A dark, narrow alley illuminated only by flickering neon signs'),
        (2, 'Neon Club', '1995-11-15 22:00', 'A bustling nightclub filled with secrets and shadows'),
        (3, 'Victim''s Office', '1995-11-15 20:00', 'A high-rise office overlooking the city, scene of the fatal confrontation');`,

    // Create the evidence table
    `CREATE TABLE evidence (
        id INTEGER PRIMARY KEY,
        evidence_type TEXT,
        description TEXT,
        suspect_id INTEGER,
        scene_id INTEGER,
        FOREIGN KEY (suspect_id) REFERENCES suspects(id),
        FOREIGN KEY (scene_id) REFERENCES scenes(id)
      );`,
    // Insert evidence records
    `INSERT INTO evidence (id, evidence_type, description, suspect_id, scene_id) VALUES
        (1, 'Fingerprint', 'A distinct fingerprint found on the murder weapon matching suspect ID 3', 3, 3),
        (2, 'Note', 'A cryptic note reading "The sun sets only for Vincent"', 3, 1),
        (3, 'Receipt', 'A receipt for a late-night meeting, signed by Vincent Romano', 3, 2),
        (4, 'Photograph', 'A blurry image capturing a shadowy figure near the victim', NULL, 2),
        (5, 'Weapon', 'The recovered pistol, verified by ballistics to be used in the murder', NULL, 1);`,

    // Create the witnesses table
    `CREATE TABLE witnesses (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        statement TEXT,
        scene_id INTEGER,
        FOREIGN KEY (scene_id) REFERENCES scenes(id)
      );`,
    // Insert witness records
    `INSERT INTO witnesses (id, name, statement, scene_id) VALUES
        (1, 'Officer Martinez', 'I saw a man with a distinctive collar hurrying away from the alley.', 1),
        (2, 'Jenny Caldwell', 'The note mentioning Vincent was the only concrete clue I found at the office.', 3),
        (3, 'Old Joe', 'I overheard a hushed conversation about a secret meeting with Vincent near the club.', 2);`,
  ],
};

export default laMurderCase;
