// import { test, expect } from '@playwright/test';



// test.describe('State Page Tests', () => {

//   test.beforeEach(async ({ page }) => {
//     await page.goto('http://localhost:4200/State');
//   });

//   test('should load the state page and display the state data from API', async ({ page }) => {
//     // Check that the page has loaded and the title is correct
//     await expect(page.locator('h1.header')).toHaveText('State');

//     // Mock the API response to ensure test consistency
//     const mockApiResponse = [
//       {
//         stateName: 'California',
//         adminEntered: 'Admin1',
//         yearEntered: '1850'
//       },
//       {
//         stateName: 'Texas',
//         adminEntered: 'Admin2',
//         yearEntered: '1845'
//       }
      
//     ];

//     // Intercept the API call and respond with the mock data
//     await page.route('http://localhost:9003/api/State', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockApiResponse)
//       });
//     });

//     // Reload the page to trigger the API call
//     await page.reload();

//     // Wait for the table to load
//     const rows = page.locator('nz-table tbody tr');
//     await expect(rows).toHaveCount(3); // Ensure 2 rows are present

//     // Verify the content of the first row
//     await expect(rows.nth(0).locator('td').nth(0)).toHaveText('');
//     await expect(rows.nth(0).locator('td').nth(1)).toHaveText('');
//     await expect(rows.nth(0).locator('td').nth(2)).toHaveText('');
//   });

//   test('should search and filter the table correctly', async ({ page }) => {
//     // Mock API response with more data
//     const mockApiResponse = [
//       { stateName: 'California', adminEntered: 'Admin1', yearEntered: '1850' },
//       { stateName: 'Texas', adminEntered: 'Admin2', yearEntered: '1845' },
//       { stateName: 'Florida', adminEntered: 'Admin3', yearEntered: '1845' }
//     ];

//     // Intercept the API call and respond with the mock data
//     await page.route('http://localhost:9003/api/State', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockApiResponse)
//       });
//     });

//     // Reload the page to trigger the API call
//     await page.reload();

//     // Perform a search
//     await page.fill('input[placeholder="Search State"]', 'Texas');
//     await page.click('button:has-text("Search")');

//     // Check that only one row is displayed after filtering
//     const rows = page.locator('nz-table tbody tr');
//     await expect(rows).toHaveCount(2);

//     // Verify the filtered result
//     await expect(rows.nth(0).locator('td').nth(0)).toHaveText('');
//   });
// });
