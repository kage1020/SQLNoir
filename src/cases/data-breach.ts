import type { Case } from '../types';

const dataBreach: Case = {
  id: 'case-005',
  title: 'The Data Breach',
  difficulty: 3,
  description: 'Investigate and prevent unauthorized data access.',
  xpReward: 200,
  completed: false,
  category: 'advanced',
  brief: 'Suspicious activity has been detected in our customer data access patterns. Security logs show unusual query patterns that might indicate a potential SQL injection attack.',
  objectives: [
    'Audit user access logs',
    'Identify potential security vulnerabilities',
    'Implement data access controls',
    'Create security recommendations'
  ],
  solution: {
    answer: 'SQL Injection',
    successMessage: "Excellent investigation! You've uncovered the security vulnerability.",
    explanation: "The breach was caused by SQL injection vulnerabilities in the legacy login system, allowing unauthorized access to customer data."
  },
  schema: [
    `CREATE TABLE users (
      user_id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      access_level INTEGER
    );`,
    `CREATE TABLE access_logs (
      log_id INTEGER PRIMARY KEY,
      user_id INTEGER,
      access_time TEXT,
      query_pattern TEXT,
      ip_address TEXT,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    `INSERT INTO users VALUES
      (1, 'admin', 3),
      (2, 'user1', 1),
      (3, 'user2', 1);`,
    `INSERT INTO access_logs VALUES
      (1, 1, '2023-04-01 10:00:00', 'SELECT * FROM customers', '192.168.1.100'),
      (2, 2, '2023-04-01 10:05:00', 'SELECT * FROM customers WHERE id = 1', '192.168.1.101'),
      (3, 2, '2023-04-01 10:10:00', "SELECT * FROM customers WHERE id = '1'' OR ''1''=''1", '192.168.1.101');`
  ]
};

export default dataBreach;