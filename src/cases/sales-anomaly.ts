import type { Case } from '../types';

const salesAnomaly: Case = {
  id: 'case-003',
  title: 'The Sales Anomaly',
  difficulty: 2,
  description: 'Investigate unusual patterns in sales data.',
  xpReward: 100,
  completed: false,
  category: 'intermediate',
  brief: 'Unusual sales patterns have been detected in the Q2 reports. The finance department needs your help to investigate potential data anomalies that could indicate either system errors or fraudulent activities.',
  objectives: [
    'Analyze sales trends across different regions',
    'Identify statistical outliers in order quantities',
    'Cross-reference with shipping records',
    'Generate a comprehensive analysis report'
  ],
  solution: {
    answer: 'Region 5',
    successMessage: "Outstanding detective work! You've pinpointed the region with anomalous sales patterns.",
    explanation: "Region 5 showed a 300% increase in order quantities compared to historical averages, indicating potential data entry errors or fraudulent activity."
  },
  schema: [
    `CREATE TABLE regions (
      region_id INTEGER PRIMARY KEY,
      region_name TEXT NOT NULL
    );`,
    `CREATE TABLE sales (
      sale_id INTEGER PRIMARY KEY,
      region_id INTEGER,
      sale_date TEXT,
      amount DECIMAL(10,2),
      quantity INTEGER,
      FOREIGN KEY (region_id) REFERENCES regions(region_id)
    );`,
    `INSERT INTO regions VALUES
      (1, 'North'),
      (2, 'South'),
      (3, 'East'),
      (4, 'West'),
      (5, 'Central');`,
    `INSERT INTO sales VALUES
      (1, 1, '2023-04-01', 1000.00, 10),
      (2, 2, '2023-04-01', 1200.00, 12),
      (3, 3, '2023-04-01', 800.00, 8),
      (4, 4, '2023-04-01', 1500.00, 15),
      (5, 5, '2023-04-01', 5000.00, 50);`
  ]
};

export default salesAnomaly;