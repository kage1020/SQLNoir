import { Case } from "../types";
import { Search, Award, Database } from "lucide-react";
import vanishingBriefcaseCase from "./vanishing-briefcase";

// Export all cases
export const cases: Record<string, Case[]> = {
  beginner: [vanishingBriefcaseCase],
  intermediate: [],
  advanced: [],
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
export { vanishingBriefcaseCase };
