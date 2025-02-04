import type { Case } from '../types';

const duplicateCustomer: Case = {
  id: 'case-002',
  title: 'The Duplicate Customer',
  difficulty: 1,
  description: 'Track down duplicate customer entries in the system.',
  xpReward: 75,
  completed: false,
  category: 'beginner',
  brief: 'Customer complaints about mixed-up orders have led to suspicion of duplicate records in our database. Your mission is to investigate potential duplicate customer entries and their impact on order processing.',
  objectives: [
    'Find all customers with similar names or details',
    'Identify orders associated with potential duplicates',
    'Create a report of affected transactions',
    'Prepare a cleanup strategy',
  ],
  solution: {
    answer: 'Acme Corp',
    successMessage: "Well done! You've successfully identified the duplicated company record.",
    explanation: "The company 'Acme Corp' was found in the database with slight variations in naming ('ACME Corporation'), leading to order confusion.",
  },
  schema: [
    `CREATE TABLE customers (
      customer_id TEXT PRIMARY KEY,
      company_name TEXT NOT NULL,
      contact_name TEXT,
      phone TEXT
    );`,
    `INSERT INTO customers VALUES
      ('DUPL1', 'Acme Corp', 'John Smith', '555-0123'),
      ('DUPL2', 'ACME Corporation', 'J. Smith', '555-0124'),
      ('UNIQ1', 'XYZ Industries', 'Jane Doe', '555-9999');`,
  ],
};

export default duplicateCustomer;