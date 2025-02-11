export default [
  // 1. Crime Scene Table
  `CREATE TABLE crime_scene (
    id INTEGER PRIMARY KEY,
    date INTEGER,
    location TEXT,
    description TEXT
  );`,
  `INSERT INTO crime_scene (id, date, location, description) VALUES
    (1, 19871031, 'Miami Mansion, Coconut Grove', 'During a lavish masked ball, the body of Leonard Pierce was found in the garden. A silver cufflink with a dragon emblem was discovered nearby.'),
    (2, 19871031, 'Downtown Office', 'A minor disturbance occurred.')
  ;`,

  // 2. Autopsy Report Table
  `CREATE TABLE autopsy_report (
    id INTEGER PRIMARY KEY,
    victim_name TEXT,
    crime_scene_id INTEGER,
    time_of_death TEXT,
    cause_of_death TEXT,
    evidence_found TEXT,
    FOREIGN KEY (crime_scene_id) REFERENCES crime_scene(id)
  );`,
  `INSERT INTO autopsy_report (id, victim_name, crime_scene_id, time_of_death, cause_of_death, evidence_found) VALUES
    (1, 'Leonard Pierce', 1, '23:50', 'Stab wound to chest', 'Silver cufflink with dragon emblem')
  ;`,

  // 3. Person Table
  `CREATE TABLE person (
    id INTEGER PRIMARY KEY,
    name TEXT,
    alias TEXT,
    occupation TEXT,
    address TEXT
  );`,
  `INSERT INTO person (id, name, alias, occupation, address) VALUES
    (1, 'Victor DiMarco', 'The Viper', 'Art Dealer', '123 Hidden Lane'),
    (2, 'Henry Romano', 'Shadow', 'Entrepreneur', '45 Ocean Drive'),
    (3, 'Maria Lombardi', 'Bella', 'Socialite', '789 Palm Street'),
    (4, 'Leonard Pierce', '', 'Business Magnate', '101 Elite Ave'),
    (5, 'Dominic Rizzo', 'Dom', 'Philanthropist', '222 Grand Ave'),
    (6, 'Anthony Russo', 'Tony', 'Investor', '333 Grand Ave')
  ;`,

  // 4. Witness Statements Table
  `CREATE TABLE witness_statements (
    id INTEGER PRIMARY KEY,
    crime_scene_id INTEGER,
    witness_id INTEGER,
    clue TEXT,
    FOREIGN KEY (crime_scene_id) REFERENCES crime_scene(id),
    FOREIGN KEY (witness_id) REFERENCES person(id)
  );`,
  `INSERT INTO witness_statements (id, crime_scene_id, witness_id, clue) VALUES
    (1, 1, 2, 'I saw a dark-suited figure with a striking red tie near the garden.'),
    (2, 1, 3, 'I overheard someone mention a booking at The Grand Regency, room 707, on October 30, 1987.')
  ;`,

  // 5. Hotel Check-ins Table
  `CREATE TABLE hotel_checkins (
    id INTEGER PRIMARY KEY,
    person_id INTEGER,
    hotel_name TEXT,
    check_in_date INTEGER,
    room_number TEXT,
    FOREIGN KEY (person_id) REFERENCES person(id)
  );`,
  `INSERT INTO hotel_checkins (id, person_id, hotel_name, check_in_date, room_number) VALUES
    (1, 1, 'The Grand Regency', 19871030, '707'),
    (2, 5, 'The Grand Regency', 19871030, '708'),
    (3, 6, 'The Grand Regency', 19871030, '709'),
    (4, 2, 'The Grand Regency', 19871030, '707'),
    (5, 3, 'The Grand Regency', 19871030, '710')
  ;`,

  // 6. Surveillance Records Table
  `CREATE TABLE surveillance_records (
    id INTEGER PRIMARY KEY,
    person_id INTEGER,
    hotel_checkin_id INTEGER,
    note TEXT,
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (hotel_checkin_id) REFERENCES hotel_checkins(id)
  );`,
  `INSERT INTO surveillance_records (id, person_id, hotel_checkin_id, note) VALUES
    (1, 1, 1, 'Wearing a red tie.'),
    (2, 5, 2, 'Wearing a blue jacket.'),
    (3, 6, 3, 'Wearing a green scarf.'),
    (4, 2, 4, 'Wearing a black hat.'),
    (5, 3, 5, 'Wearing a silver bracelet.')
  ;`,

  // 7. Phone Records Table
  `CREATE TABLE phone_records (
    id INTEGER PRIMARY KEY,
    caller_id INTEGER,
    recipient_id INTEGER,
    call_date INTEGER,
    call_time TEXT,
    note TEXT,
    FOREIGN KEY (caller_id) REFERENCES person(id),
    FOREIGN KEY (recipient_id) REFERENCES person(id)
  );`,
  `INSERT INTO phone_records (id, caller_id, recipient_id, call_date, call_time, note) VALUES
    (1, 1, 2, 19871030, '22:15', 'Payment confirmed for art deal.'),
    (2, 5, 1, 19871030, '21:00', 'Discussing meeting details.')
  ;`,

  // 8. CCTV Footage Table
  `CREATE TABLE cctv_footage (
    id INTEGER PRIMARY KEY,
    camera_location TEXT,
    timestamp TEXT,
    footage_description TEXT
  );`,
  `INSERT INTO cctv_footage (id, camera_location, timestamp, footage_description) VALUES
    (1, 'Mansion Garden', '19871031 23:40', 'A masked figure in a dark suit with a red tie is seen near the garden.'),
    (2, 'Hotel Lobby', '19871030 21:30', 'Guests are checking in; one figure stands out with a red tie.')
  ;`,

  // 9. Final Interviews Table
  `CREATE TABLE final_interviews (
    id INTEGER PRIMARY KEY,
    person_id INTEGER,
    confession TEXT,
    FOREIGN KEY (person_id) REFERENCES person(id)
  );`,
  `INSERT INTO final_interviews (id, person_id, confession) VALUES
    (1, 1, 'I did it. I killed Leonard Pierce.'),
    (2, 5, 'I am innocent.'),
    (3, 6, 'I have nothing to confess.')
  ;`,
];
