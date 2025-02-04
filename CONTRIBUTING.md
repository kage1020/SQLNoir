## Contributing to SQL Detective

Thank you for your interest in contributing to SQL Detective! This guide will help you add new cases to the game.

### Adding a New Case

1. Create a new file in `src/cases/` using kebab-case naming (e.g., `missing-records.ts`)
2. Copy the structure from `case-template.ts`
3. Fill in all the required fields:
   - Unique `id` (format: `case-XXX`)
   - Descriptive `title`
   - Appropriate `difficulty` (1-5)
   - Clear `description`
   - Fair `xpReward`
   - Detailed `brief`
   - Clear `objectives`
   - Complete `solution` with answer and explanations
   - SQL `schema` array with all required tables and data

4. Add your case to `src/cases/index.ts`:
   - Import your case
   - Add it to the appropriate category in the `cases` object
   - Export it in the named exports

### Case Guidelines

1. **Difficulty Levels**
   - 1: Basic SELECT queries, simple JOINs
   - 2: Complex JOINs, subqueries
   - 3: Advanced queries, optimization problems
   - 4: Complex data modeling, performance tuning
   - 5: Expert-level challenges

2. **XP Rewards**
   - Should scale with difficulty
   - Beginner (50-100 XP)
   - Intermediate (100-200 XP)
   - Advanced (200-300 XP)
   - Expert (300+ XP)

3. **Schema Design**
   - Keep tables focused and relevant
   - Include enough sample data to make the case interesting
   - Use meaningful column names
   - Include appropriate constraints (PRIMARY KEY, FOREIGN KEY)

4. **Solution**
   - Answer should be clear and unambiguous
   - Explanation should help users understand the solution
   - Success message should be encouraging

### Testing Your Case

1. Run the application locally
2. Verify that your case appears in the correct category
3. Test the database schema loads correctly
4. Verify the solution works as expected
5. Check that the difficulty and XP reward are appropriate

### Submitting Your Case

1. Create a new branch
2. Add your case file
3. Update the cases index
4. Submit a pull request with:
   - Clear description of the new case
   - Any special considerations
   - Testing notes

Thank you for contributing to SQL Detective!