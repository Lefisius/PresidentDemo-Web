// import { test, expect } from '@playwright/test';

// test.describe('Election Component', () => {

//     test.beforeEach(async ({ page }) => {
//         // Mock API responses
//         await page.route('**/api/Election', route =>
//             route.fulfill({
//                 status: 200,
//                 body: JSON.stringify([
//                     { electionYear: '2020', candidate: 'John Doe', votes: '5000', winnerLoserIndic: 'W' },
//                     { electionYear: '2016', candidate: 'Jane Doe', votes: '4500', winnerLoserIndic: 'L' },
//                 ]),
//             })
//         );

//         await page.route('**/api/drivers', route =>
//             route.fulfill({
//                 status: 200,
//                 body: JSON.stringify([
//                     { name: 'Printer 1', ip: '192.168.1.1', description: 'Office Printer', id: 1 },
//                     { name: 'Printer 2', ip: '192.168.1.2', description: 'Home Printer', id: 2 },
//                 ]),
//             })
//         );

//         // Go to the election component page
//         await page.goto('http://localhost:4200/Election');
//     });

//     test('should display election and printer data', async ({ page }) => {
//         // Verify election table data
//         const electionRows = page.locator('tbody tr');
//         await expect(electionRows).toHaveCount(6);

//         await expect(electionRows.nth(0)).toContainText('2020');
//         await expect(electionRows.nth(0)).toContainText('John Doe');
//         await expect(electionRows.nth(0)).toContainText('5000');
//         await expect(electionRows.nth(0)).toContainText('W');

//         await expect(electionRows.nth(1)).toContainText('2016');
//         await expect(electionRows.nth(1)).toContainText('Jane Doe');
//         await expect(electionRows.nth(1)).toContainText('4500');
//         await expect(electionRows.nth(1)).toContainText('L');

//         // Verify printer table data
//         const printerRows = page.locator('tbody tr');
//         await expect(printerRows).toHaveCount(2);

//         await expect(printerRows.nth(0)).toContainText('Printer 1');
//         await expect(printerRows.nth(0)).toContainText('192.168.1.1');
//         await expect(printerRows.nth(0)).toContainText('Office Printer');

//         await expect(printerRows.nth(1)).toContainText('Printer 2');
//         await expect(printerRows.nth(1)).toContainText('192.168.1.2');
//         await expect(printerRows.nth(1)).toContainText('Home Printer');
//     });

//     test('should be able to search and filter election data', async ({ page }) => {
//         // Perform search
//         await page.fill('input[placeholder="Search President"]', 'John Doe');
//         await page.click('button:has-text("Search")');

//         // Verify filtered data
//         const filteredRows = page.locator('tbody tr');
//         await expect(filteredRows).toHaveCount(1);
//         await expect(filteredRows).toContainText('John Doe');
//     });

//     test('should add a new printer', async ({ page }) => {
//         // Fill printer form
//         await page.fill('#printerName', 'New Printer');
//         await page.fill('#printerIP', '192.168.1.3');
//         await page.fill('#printerDescription', 'New Office Printer');

//         // Mock PPD file selection
//         const fileChooser = await page.waitForEvent('filechooser');
//         await fileChooser.setFiles('tests/fixtures/printer.ppd');

//         // Submit form
//         await page.click('button:has-text("Add Printer")');

//         // Verify the new printer appears in the table
//         const printerRows = page.locator('tbody tr');
//         await expect(printerRows).toHaveCount(3);
//         await expect(printerRows.last()).toContainText('New Printer');
//         await expect(printerRows.last()).toContainText('192.168.1.3');
//         await expect(printerRows.last()).toContainText('New Office Printer');
//     });

//     test('should delete a printer', async ({ page }) => {
//         // Click delete on the first printer
//         await page.click('tbody tr >> text=Delete');

//         // Confirm deletion
//         await page.click('button:has-text("OK")'); // Mock confirm dialog if exists

//         // Verify the printer is removed from the table
//         const printerRows = page.locator('tbody tr');
//         await expect(printerRows).toHaveCount(1);
//     });

// });
