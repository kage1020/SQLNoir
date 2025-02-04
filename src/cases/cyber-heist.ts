import type { Case } from "../types";

const cyberHeist: Case = {
  id: "case-006",
  title: "The Cyber Heist",
  difficulty: 4, // A challenging case
  description:
    "A notorious hacker has stolen millions in cryptocurrency. Can you track them down?",
  xpReward: 250,
  completed: false,
  category: "advanced",
  brief: `A major cryptocurrency exchange has been hacked, and millions in Bitcoin have been transferred to an unknown wallet.
          The exchange's security team has traced suspicious activities in their logs, and it's up to you to find out who did it.
          You'll need to search through transaction records, login logs, IP addresses, and aliases to uncover the hacker's real identity.`,
  objectives: [
    "Identify the hacker’s username.",
    "Find their real name and location.",
    "Determine how they accessed the system.",
    "Find out where the stolen money was sent.",
  ],
  solution: {
    answer: "ALEX TORRES",
    successMessage:
      "Great job! You have identified the hacker: Alex Torres, a former employee with admin access!",
    explanation: `Alex Torres used stolen admin credentials to bypass the exchange's security and execute fraudulent transactions.
                  By analyzing login logs, transaction histories, and employee records, you uncovered their identity and tracked the stolen funds.`,
  },
  schema: [
    // Table: Users
    `CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      real_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT UNIQUE,
      role TEXT NOT NULL
    );`,
    `INSERT INTO users (username, real_name, email, phone, role) VALUES
      ('john_doe', 'John Doe', 'john@example.com', '123-456-7890', 'user'),
      ('h4ck3rm4n', 'Alex Torres', 'alex.torres@cryptofirm.com', '987-654-3210', 'admin'),
      ('janedoe22', 'Jane Doe', 'jane@example.com', '456-789-1230', 'user');`,

    // Table: Logins
    `CREATE TABLE logins (
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      login_time DATETIME NOT NULL,
      ip_address TEXT NOT NULL,
      device TEXT NOT NULL
    );`,
    `INSERT INTO logins (username, login_time, ip_address, device) VALUES
      ('john_doe', '2024-02-01 10:05:23', '192.168.1.5', 'Windows-PC'),
      ('h4ck3rm4n', '2024-02-01 02:47:12', '88.202.44.12', 'Linux-Terminal'),
      ('janedoe22', '2024-02-01 12:35:45', '192.168.1.6', 'MacBook-Pro');`,

    // Table: Transactions
    `CREATE TABLE transactions (
      id INTEGER PRIMARY KEY,
      sender TEXT NOT NULL,
      recipient TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL,
      timestamp DATETIME NOT NULL
    );`,
    `INSERT INTO transactions (sender, recipient, amount, currency, timestamp) VALUES
      ('john_doe', 'wallet_abc123', 0.5, 'BTC', '2024-02-01 10:30:00'),
      ('h4ck3rm4n', 'wallet_xyz987', 5.0, 'BTC', '2024-02-01 03:00:00'),
      ('janedoe22', 'wallet_lmn456', 1.2, 'BTC', '2024-02-01 13:00:00');`,

    // Table: IP_Logs
    `CREATE TABLE ip_logs (
      id INTEGER PRIMARY KEY,
      ip_address TEXT NOT NULL,
      username TEXT NOT NULL,
      timestamp DATETIME NOT NULL,
      action TEXT NOT NULL
    );`,
    `INSERT INTO ip_logs (ip_address, username, timestamp, action) VALUES
      ('88.202.44.12', 'h4ck3rm4n', '2024-02-01 02:50:00', 'Login Success'),
      ('88.202.44.12', 'h4ck3rm4n', '2024-02-01 02:55:30', 'Accessed Admin Panel'),
      ('192.168.1.5', 'john_doe', '2024-02-01 10:10:00', 'Login Success');`,

    // Table: Wallets
    `CREATE TABLE wallets (
      id INTEGER PRIMARY KEY,
      wallet_id TEXT UNIQUE NOT NULL,
      owner TEXT NOT NULL,
      balance REAL NOT NULL
    );`,
    `INSERT INTO wallets (wallet_id, owner, balance) VALUES
      ('wallet_abc123', 'John Doe', 0.5),
      ('wallet_xyz987', 'UNKNOWN', 5.0),
      ('wallet_lmn456', 'Jane Doe', 1.2);`,

    // Table: Employees
    `CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      position TEXT NOT NULL,
      clearance_level INTEGER NOT NULL
    );`,
    `INSERT INTO employees (name, email, position, clearance_level) VALUES
      ('John Doe', 'john@example.com', 'Support Staff', 1),
      ('Jane Doe', 'jane@example.com', 'Marketing', 1),
      ('Alex Torres', 'alex.torres@cryptofirm.com', 'IT Security', 5);`,
  ],
};

export default cyberHeist;
