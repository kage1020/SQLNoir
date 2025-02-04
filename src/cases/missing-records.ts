import type { Case } from '../types';

const missingRecords: Case = {
  id: 'case-001',
  title: 'The Missing Records',
  difficulty: 1,
  description: 'Investigate a simple case of missing data using SELECT queries.',
  xpReward: 50,
  completed: false,
  category: 'beginner',
  brief: 'Several critical customer orders have gone missing from the Northwind database. Your task is to track down these missing records and identify any patterns that might explain their disappearance.',
  objectives: [
    'Find all orders from March-April 1998 that have NULL values in critical fields',
    'Identify customers who placed these orders using JOIN operations',
    'Cross-reference with the employees who were responsible for these orders',
    'Generate a report showing all affected orders and their current status',
  ],
  solution: {
    answer: 'VINET',
    successMessage: "Excellent work, Detective! You've identified the customer with missing shipment records.",
    explanation: "The customer VINET had orders with NULL ship dates, indicating a potential issue in the shipping process. This discovery will help the logistics team address the backlog.",
  },
  schema: [
    `CREATE TABLE customers (
      customer_id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_name TEXT
    );`,
    `CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY,
      customer_id TEXT,
      order_date TEXT,
      ship_date TEXT,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );`,
    `INSERT INTO customers VALUES
      ('VINET', 'Vins et alcools Chevalier', 'Paul Henriot'),
      ('TOMSP', 'Toms Spezialitäten', 'Karin Josephs'),
      ('HANAR', 'Hanari Carnes', 'Mario Pontes');`,
    `INSERT INTO orders VALUES
      (10248, 'VINET', '1996-07-04', NULL),
      (10249, 'TOMSP', '1996-07-05', '1996-07-10'),
      (10250, 'HANAR', '1996-07-08', NULL);`,
  ],
};

export default missingRecords;