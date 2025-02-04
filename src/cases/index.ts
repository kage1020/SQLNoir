import { Case } from "../types";
import { Search, Award, Database } from "lucide-react";
import missingRecords from "./missing-records";
import duplicateCustomer from "./duplicate-customer";
import salesAnomaly from "./sales-anomaly";
import missingIndex from "./missing-index";
import dataBreach from "./data-breach";
import legacyMigration from "./legacy-migration";
import cyberHeist from "./cyber-heist";
import laMurderCase from "./la-murder-case";

// Export all cases
export const cases: Record<string, Case[]> = {
  beginner: [missingRecords, duplicateCustomer, cyberHeist, laMurderCase],
  intermediate: [salesAnomaly, missingIndex],
  advanced: [dataBreach, legacyMigration],
};

// Export categories with metadata
export const categories = [
  {
    id: "beginner",
    title: "Beginner Cases",
    icon: Search,
    requiredXP: 0,
    description:
      "Perfect for SQL newcomers. Learn the basics of querying and data analysis.",
  },
  {
    id: "intermediate",
    title: "Intermediate Cases",
    icon: Database,
    requiredXP: 100,
    description:
      "For investigators with basic SQL knowledge. Tackle more complex queries and optimizations.",
  },
  {
    id: "advanced",
    title: "Advanced Cases",
    icon: Award,
    requiredXP: 300,
    description:
      "Expert-level cases requiring deep SQL knowledge and problem-solving skills.",
  },
];

// Helper to get case by ID
export function getCaseById(id: string): Case | undefined {
  return Object.values(cases)
    .flat()
    .find((c) => c.id === id);
}

// Export individual cases for direct imports
export {
  missingRecords,
  duplicateCustomer,
  salesAnomaly,
  missingIndex,
  dataBreach,
  legacyMigration,
  cyberHeist,
  laMurderCase,
};
