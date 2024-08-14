// import { test, expect, Page } from '@playwright/test';

// // Define the type for entityType explicitly
// type EntityType = 'function' | 'module' | 'class' | 'object';

// // Function to check for new entities in the window object
// async function checkNewEntity(
//   page: Page,
//   entityName: string,
//   entityType: EntityType = 'function'
// ) {
//   const isEntityDefined = await page.evaluate(
//     ({ entityName, entityType }) => {
//       const entity = (window as any)[entityName];
//       if (entityType === 'module' || entityType === 'object') {
//         return !!entity;
//       } else if (entityType === 'function' || entityType === 'class') {
//         return typeof entity === 'function' && (entityType === 'class' ? new entity() instanceof entity : true);
//       }
//       return false;
//     },
//     { entityName, entityType }
//   );

//   if (isEntityDefined) {
//     console.error(`New ${entityType} "${entityName}" detected!`);
//   } else {
//     console.log(`No new ${entityType} "${entityName}" detected. Everything is normal.`);
//   }
// }

// test.describe('Election Component Tests', () => {
//   let page: Page;

//   test.beforeEach(async ({ page: p }) => {
//     page = p;
//     await page.goto('http://localhost:4200/Election');
//   });

//   test('should display table with correct headers for printer data', async () => {
//     const headers = await page.locator('nz-table:nth-of-type(1) thead th').allTextContents();
//     expect(headers).toEqual(['Printer Name', 'Printer IP', 'Description', 'Action']);
//   });

//   test('should display table with correct headers for election data', async () => {
//     const headers = await page.locator('nz-table:nth-of-type(2) thead th').allTextContents();
//     expect(headers).toEqual(['ElectionYear', 'candidate', 'Votes', 'WinnerLoserIndic']);
//   });

//   test('should display the correct date and time', async () => {
//     const datetimeElement = page.locator('#datetime');
//     const datetimeText = await datetimeElement.textContent();
    
//     // Check if datetime text is not empty
//     expect(datetimeText).not.toBeNull();
//     expect(datetimeText?.trim()).not.toBe('');
//   });

// //   test('should filter data based on search term', async () => {
// //     const searchInput = page.locator('input[placeholder="Search President"]');
// //     const searchButton = page.locator('button[nzType="primary"]');

// //     // Initial search term
// //     await searchInput.fill('2024');
// //     await searchButton.click();

// //     // Assume that you have some mock data or pre-set state for the test
// //     const filteredRows = await page.locator('nz-table:nth-of-type(2) tbody tr').allTextContents();
// //     expect(filteredRows).toContain('2024');
// //   });

// //   test('should add a printer', async () => {
// //     const name = 'Test Printer';
// //     const ip = '192.168.1.100';
// //     const description = 'A test printer';
// //     const fileInput = page.locator('input[type="file"]');
// //     const formButton = page.locator('button[nzType="primary"]');
    
// //     // Fill in printer details
// //     await page.fill('#printerName', name);
// //     await page.fill('#printerIP', ip);
// //     await page.fill('#printerDescription', description);
    
// //     // Mock the file input
// //     await fileInput.setInputFiles('path/to/mock-file.ppd');
    
// //     await formButton.click();
    
// //     // Verify the addition
// //     // Adjust the selector and logic according to the actual behavior
// //     const addedPrinterRow = await page.locator('nz-table:nth-of-type(1) tbody tr').allTextContents();
// //     expect(addedPrinterRow).toContain(name);
// //     expect(addedPrinterRow).toContain(ip);
// //   });

//   test('should delete a printer', async () => {
//     // Find and click delete button for the first printer
//     const deleteButton = page.locator('nz-table:nth-of-type(1) tbody tr:first-child button');
//     await deleteButton.click();
    
//     // Verify the printer is deleted
//     // Adjust the selector and logic according to the actual behavior
//     const remainingRows = await page.locator('nz-table:nth-of-type(1) tbody tr').allTextContents();
//     expect(remainingRows).not.toContain('Printer to be deleted');
//   });

//   test('should check for new entities', async () => {
//     // Define the entities to check
//     const entitiesToCheck: { name: string; type: EntityType }[] = [
//       { name: 'exampleFunction', type: 'function' },
//       { name: 'ExampleClass', type: 'class' },
//       { name: 'SomeModule', type: 'module' },
//     ];

//     for (const entity of entitiesToCheck) {
//       await checkNewEntity(page, entity.name, entity.type);
//     }
//   });
// });
