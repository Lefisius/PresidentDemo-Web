// เทส const 
import { test, expect } from '@playwright/test';

test('should filter data correctly', async ({ page }) => {
  // Navigate to the page where the component is rendered
  await page.goto('http://localhost:4200/Prvp');

  // Set up search term and interact with the UI
  // Uncomment and modify these lines if you need to perform a search
  // await page.fill('input[placeholder="Search"]', 'John');
  // await page.click('button:has-text("Search")');
  await page.getByPlaceholder('Search President').click();
  await page.getByPlaceholder('Search President').fill('45');

  // Wait for the table to update (adjust time as necessary)
  await page.waitForTimeout(500); // Example wait time, adjust if necessary

  // Retrieve all rows from the table, including the header
  const rows = page.locator('table tbody tr');
  
  // Ensure there are at least 2 data rows (ignoring the header)
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(2); // Ensure at least 2 rows, not counting the header

  // Get data from the 2nd data row (index 1 in tbody)
  const row2 = rows.nth(1); // .nth(1) gets the 2nd row in tbody (0-based index, skipping the header)

  // Extract cell data from the 2nd data row
  const data = await row2.evaluate(row => {
    return Array.from(row.querySelectorAll('td')).map(cell => cell.textContent?.trim() || '');
  });

  // Print out the data for debugging purposes
  console.log('Data from row 2:', data);

  // Check if the data from the 2nd data row matches the expected result
  const [adminNr, presName, vicePresName] = data;
  expect(adminNr.toLowerCase()).toContain('45');
  expect(presName.toLowerCase()).toContain('johnson l b');
  expect(vicePresName.toLowerCase()).toContain('humphrey h h');

  // Optionally, check the total number of rows if needed
  await expect(rows).toHaveCount(2); // Adjust based on your test expectations

  // Ensure the table contains specific text (if needed)
  await expect(page.locator('table tbody tr td:has-text("45")')).toBeVisible();
  await expect(page.locator('table tbody tr td:has-text("johnson l b")')).toBeVisible();
  await expect(page.locator('table tbody tr td:has-text("humphrey h h")')).toBeVisible();
});


// import { test, expect, Page } from '@playwright/test';

// test.describe('My Tests', () => {
//   let page: Page;

//   test.beforeEach(async ({ page }) => {
//     // Initialize or navigate to the page before each test
//     await page.goto('http://localhost:4200/Dash');
//     await page.getByText('Prvp').click();
//   });

//   test.afterEach(async ({ page }) => {
//     // Example: clear local storage or cookies after each test
//     await page.evaluate(() => {
//       localStorage.clear();
//       sessionStorage.clear();
//     });

//     // Optionally, take a screenshot after each test for debugging
//     await page.screenshot({ path: `screenshot-${Date.now()}.png` });
//   });

//   test('should perform some action', async ({ page }) => {
//     // Perform actions and assertions
//     await page.fill('input[placeholder="Search"]', 'John');
//     await page.click('button:has-text("Search")');
    
//     // Assertions
//     await expect(page.locator('table tbody tr')).toHaveCount(1);
//   });
// });

