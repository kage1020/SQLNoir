import type { Case } from "../types";

/**
 * The Midnight Masquerade Murder
 *
 * On October 31, 1987, during a lavish masked ball at a Miami mansion in Coconut Grove,
 * the body of wealthy entrepreneur Leonard Pierce was discovered in the garden.
 * The autopsy revealed a fatal stab wound and a silver cufflink engraved with a dragon emblem
 * was found near the victim.
 *
 * Two witnesses provided cryptic clues:
 *  • One witness said, "I saw a dark-suited figure with a striking red tie near the garden."
 *  • Another reported, "I overheard someone mention a booking at The Grand Regency, room 707, on October 30, 1987."
 *
 * Following these clues, your investigation must span multiple levels:
 *  1. Retrieve the crime scene and autopsy details.
 *  2. Search the person records to locate individuals connected to the case.
 *  3. Extract witness statements for those two distinct clues.
 *  4. Filter hotel check-ins by the exact booking date—yielding many entries.
 *  5. Join with surveillance records (which note attire) to narrow down the pool to three suspects.
 *  6. Examine phone records for corroborating communications.
 *  7. Analyze CCTV footage for visual evidence.
 *  8. Finally, interrogate the final three suspects in a series of interviews.
 *
 * The final interviews deliver the ultimate confession.
 * Only by integrating all these disparate pieces of evidence will you uncover that
 * Victor DiMarco—the elusive art dealer known as "The Viper"—is the murderer.
 *
 * This is the hardest case possible—prepare for advanced SQL techniques including JOINs,
 * wildcard filtering, and multi-table deductions.
 */
const midnightMasqueradeMurderCase: Case = {
  id: "case-004",
  title: "The Midnight Masquerade Murder",
  difficulty: 5, // Hardest difficulty
  description:
    "Unravel the layered mystery of a masked ball murder in Coconut Grove, Miami.",
  xpReward: 500,
  completed: false,
  category: "advanced",
  brief: `On October 31, 1987, during a lavish masked ball at a Miami mansion, 
Leonard Pierce was found dead in the garden. A silver cufflink with a dragon emblem was discovered at the scene.
Two witnesses reported seeing a dark-suited figure with a red tie and overheard a mention of a hotel booking 
at The Grand Regency, room 707, on October 30, 1987. 
Your task is to piece together evidence from 9 interconnected tables—crime scene details, autopsy reports, person records, 
witness statements, hotel check-ins, surveillance records, phone logs, CCTV footage, and final interviews—to expose the murderer.`,
  objectives: [
    "Step 1: Retrieve the crime scene record by filtering by date and location.",
    "Step 2: Review the autopsy report to capture key evidence details.",
    "Step 3: Search the person table for individuals connected to the case.",
    "Step 4: Extract witness statements to obtain two distinct clues.",
    "Step 5: Filter hotel check-ins by the exact booking date (October 30, 1987).",
    "Step 6: Join with surveillance records to narrow the pool using attire (red tie).",
    "Step 7: Examine phone records for corroborating communications.",
    "Step 8: Analyze CCTV footage for visual evidence matching the clues.",
    "Step 9: Conduct final interviews with the narrowed suspects to secure a confession.",
  ],
  solution: {
    answer: "Victor DiMarco",
    successMessage:
      "Outstanding work, detective! Victor DiMarco has confessed to the murder.",
    explanation: `You began by retrieving the crime scene record (table: crime_scene) detailing the masked ball 
and the discovery of Leonard Pierce’s body. The autopsy report (table: autopsy_report) confirmed his time of death and 
revealed a silver cufflink with a dragon emblem as crucial evidence.
Next, the person table (table: person) provided a list of potential individuals, while witness statements (table: witness_statements)
delivered two key clues: a dark-suited figure with a red tie and a hotel booking at The Grand Regency, room 707, on October 30, 1987.
Filtering the hotel_checkins table by the booking date returned many entries—but by joining with surveillance_records (which noted attire), 
only three records remained. Phone records (table: phone_records) and CCTV footage (table: cctv_footage) further corroborated suspicious activity.
Finally, the final_interviews table captured the confession of Victor DiMarco, conclusively identifying him as the murderer.`,
  },
};

export default midnightMasqueradeMurderCase;
