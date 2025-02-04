import type { Case } from '../types';

const missingIndex: Case = {
  id: 'case-004',
  title: 'The Missing Index',
  difficulty: 2,
  description: 'Solve performance issues in the order processing system.',
  xpReward: 125,
  completed: false,
  category: 'intermediate',
  brief: 'The system is experiencing significant slowdowns during peak hours. Your task is to investigate the database performance and identify which missing index is causing full table scans.',
  objectives: [
    'Analyze query execution plans',
    'Identify missing indexes',
    'Optimize join operations',
    'Measure query performance improvements'
  ],
  solution: {
    answer: 'order_date',
    successMessage: "Brilliant work! You've identified the missing index that was causing performance issues.",
    explanation: "The lack of an index on the order_date column was causing full table scans on the orders table, significantly impacting query performance during peak hours."
  },
  schema: [
    `CREATE TABLE orders (
      order_id INTEGER PRIMARY KEY,
      customer_id TEXT,
      order_date TEXT,
      total_amount DECIMAL(10,2)
    );`,
    `CREATE TABLE order_items (
      item_id INTEGER PRIMARY KEY,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      price DECIMAL(10,2),
      FOREIGN KEY (order_id) REFERENCES orders(order_id)
    );`,
    `WITH RECURSIVE dates(date) AS (
      SELECT '2023-01-01'
      UNION ALL
      SELECT date(date, '+1 day')
      FROM dates
      LIMIT 365
    )
    INSERT INTO orders 
    SELECT 
      row_number() OVER () as order_id,
      'CUST' || (abs(random()) % 100) as customer_id,
      date as order_date,
      (abs(random()) % 1000) + 100 as total_amount
    FROM dates;`
  ]
};

export default missingIndex;