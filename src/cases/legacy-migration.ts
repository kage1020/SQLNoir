import type { Case } from '../types';

const legacyMigration: Case = {
  id: 'case-006',
  title: 'The Legacy Migration',
  difficulty: 3,
  description: 'Plan and execute a complex database migration.',
  xpReward: 250,
  completed: false,
  category: 'advanced',
  brief: 'A legacy system needs to be migrated to a new schema that supports international characters. Your task is to identify the required changes and create a migration plan.',
  objectives: [
    'Analyze current schema',
    'Design migration strategy',
    'Handle data type conversions',
    'Ensure data integrity'
  ],
  solution: {
    answer: 'VARCHAR to NVARCHAR',
    successMessage: "Outstanding work! You've identified the critical data type conversion needed.",
    explanation: "The migration requires converting VARCHAR fields to NVARCHAR to properly support international characters in customer names and addresses."
  },
  schema: [
    `CREATE TABLE legacy_customers (
      customer_id INTEGER PRIMARY KEY,
      name VARCHAR(50),
      address VARCHAR(100),
      country VARCHAR(30)
    );`,
    `CREATE TABLE legacy_orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      product_name VARCHAR(50),
      FOREIGN KEY (customer_id) REFERENCES legacy_customers(customer_id)
    );`,
    `INSERT INTO legacy_customers VALUES
      (1, 'John Smith', '123 Main St', 'USA'),
      (2, 'María García', 'Calle Principal 456', 'Spain'),
      (3, '山田太郎', '東京都渋谷区', 'Japan');`,
    `INSERT INTO legacy_orders VALUES
      (1, 1, 'Widget'),
      (2, 2, 'Gadget'),
      (3, 3, 'Device');`
  ]
};

export default legacyMigration;