// import { test, expect } from '@playwright/test';
// import { PrvpService } from './../api/prvp.service'; // ปรับเส้นทางตามโครงสร้างโปรเจคของคุณ
// import { PrvpComponent } from './../prvp/prvp.component'; // แทนที่ด้วยชื่อ component จริงของคุณ
// import { Observable, of, throwError } from 'rxjs';

//             // test('test for ngOnInit in prvp.component.ts', async ({ page }) => {
//               // test.describe('Component Initialization Tests', () => {
//               //   test.beforeEach(async ({ page }) => {
//               //     // Navigate to the component page where ngOnInit is triggered
//               //     await page.goto('http://localhost:4200/Prvp');
//               //   });
              
//               //   test('Should display initial date and time correctly', async ({ page }) => {
//               //     // Wait for the datetime element to be visible
//               //     const datetimeElement = await page.waitForSelector('#datetime');
                  
//               //     // Get the text content of the datetime element
//               //     const initialDateTime = await datetimeElement.textContent();
              
//               //     // Verify that the datetime element has been populated
//               //     expect(initialDateTime).not.toBeNull();
//               //   });
              
//               //   test('Should update date and time every second', async ({ page }) => {
//               //     // Wait for the datetime element to be visible
//               //     const datetimeElement = await page.waitForSelector('#datetime');
              
//               //     // Capture the datetime immediately after page load
//               //     const initialDateTime = await datetimeElement.textContent();
              
//               //     // Wait for 1 second and capture the datetime again
//               //     await page.waitForTimeout(1000);
//               //     const updatedDateTime = await datetimeElement.textContent();
              
//               //     // Ensure that the datetime has changed
//               //     expect(updatedDateTime).not.toBe(initialDateTime);
//               //   });
              
//               //   test('Should load adminprvps data correctly', async ({ page }) => {
//               //     // Wait for an element that represents loaded data
//               //     const dataRow = await page.waitForSelector('tbody tr');
//               //     // const dataRow = await page.waitForSelector('cell');

//               //     // Verify that at least one row of data is loaded
//               //     // const rowCount = await page.getByRole('cell').count();
//               //     const rowCount = await page.locator('tbody tr').count();
//               //     expect(rowCount).toBeGreaterThan(52);
//               //   });
//               // });
//         // });
// // test('test for loadAdminprvps in prvp.component.ts', async ({ page }) => {

// // test.describe('PrvpComponent - loadAdminprvps', () => {
// //   let component: PrvpComponent;
// //   let mockPrvpService: PrvpService;

// //   test.beforeEach(() => {
// //     // Mock PrvpService
// //     mockPrvpService = {
// //       getAdminprvps: (): Observable<any> => of([]) // default mock
// //     } as PrvpService;

// //     // สร้าง instance ของ component
// //     component = new PrvpComponent(mockPrvpService);
// //   });

// //   test('should fetch data successfully and update component properties', async () => {
// //     // Arrange
// //     const mockData = [
// //       { id: 1, name: 'Admin 1' },
// //       { id: 2, name: 'Admin 2' }
// //     ];
// //     mockPrvpService.getAdminprvps = () => of(mockData);

// //     const messages: string[] = [];
// //     console.log = (message: string) => messages.push(message);

// //     // Act
// //     component.loadAdminprvps();

// //     // Assert
// //     expect(messages).toContain('Data received from API:');
// //     expect(component.presidentsData).toEqual(mockData);
// //     expect(component.filteredData).toEqual(mockData);
// //   });

// //   test('should handle error when fetching data fails', async () => {
// //     // Arrange
// //     const mockError = new Error('API Error');
// //     mockPrvpService.getAdminprvps = () => throwError(() => mockError);

// //     const messages: string[] = [];
// //     console.error = (message: string) => messages.push(message);

// //     // Act
// //     component.loadAdminprvps();

// //     // Assert
// //     expect(messages).toContain('Error fetching Adminprvps:');
// //     expect(component.presidentsData).toEqual([]);
// //     expect(component.filteredData).toEqual([]);
// //   });

// //   test('should not update data if API returns empty array', async () => {
// //     // Arrange
// //     const mockData: any[] = [];
// //     mockPrvpService.getAdminprvps = () => of(mockData);

// //     const messages: string[] = [];
// //     console.log = (message: string) => messages.push(message);

// //     // Act
// //     component.loadAdminprvps();

// //     // Assert
// //     expect(messages).toContain('Data received from API:');
// //     expect(component.presidentsData).toEqual([]);
// //     expect(component.filteredData).toEqual([]);
// //   });
// // });
// //         });
// // test('test for updateDateTime in prvp.component.ts', async ({ page }) => {
// //             await page.goto('https://example.com');
// //             // Add more test steps here
// //         });
// // test('test for onSearch in prvp.component.ts', async ({ page }) => {
//     // test.describe('Search Functionality', () => {
//     //     test.beforeEach(async ({ page }) => {
//     //       // Navigate to the page where the table and search input are located
//     //       await page.goto('http://localhost:4200/Prvp');
//     //     });
      
//     //     test('Should display all data when search term is empty', async ({ page }) => {
//     //       // await expect(page.locator('h1.header')).toHaveText('prvp');
//     //       // Clear the search input to simulate empty search
//     //       // await page.goto('http://localhost:4200/Prvp');
//     //       await page.fill('input[placeholder="Search President"]', '');
//     //       await page.click('button:has-text("Search")');
      
//     //       // Verify that all rows are displayed
//     //       const rows = await page.locator('tbody tr').count();
//     //       // Replace 'totalNumberOfPresidents' with the actual number of rows expected when no filter is applied
//     //       const totalNumberOfPresidents = 52; // Example value
//     //       expect(rows).toBe(totalNumberOfPresidents);
//     //     });
      
//     //     test('Should filter data based on search term', async ({ page }) => {
//     //       // Set the search term to 'Washington'
//     //       const searchTerm = '';
//     //       await page.fill('input[placeholder="Search President"]', searchTerm);
//     //       await page.click('button:has-text("Search")');
      
//     //       // Verify that only rows containing 'Washington' in any field are displayed
//     //       const rows = await page.locator('tbody tr');
//     //       const rowCount = await rows.count();
//     //       expect(rowCount).toBeGreaterThan(0);
      
//     //       for (let i = 0; i < rowCount; i++) {
//     //         const rowText = await rows.nth(i).textContent();
//     //         if (rowText !== null) {
//     //           expect(rowText.toLowerCase()).toContain(searchTerm.toLowerCase());
//     //         } else {
//     //           throw new Error('Row text is null, cannot perform the search validation.');
//     //         }
//     //       }
          
//     //     });
      
//     //     test('Should display no data if search term does not match', async ({ page }) => {
//     //       // Set a search term that does not match any data
//     //       const searchTerm = 'Washington G';
//     //       await page.fill('input[placeholder="Search President"]', searchTerm);
//     //       await page.click('button:has-text("Search")');
      
//     //       // Verify that no rows are displayed
//     //       const rows = await page.getByRole('cell', { name: 'Washington G' }).count();
//     //       expect(rows).toBe(2); 
//     //     });
//     //     test('Should display no data if search term does not match2', async ({ page }) => {
//     //       // Set a search term that does not match any data
//     //       const searchTerm = 'Adams J';
//     //       await page.fill('input[placeholder="Search President"]', searchTerm);
//     //       await page.click('button:has-text("Search")');
      
//     //       // Verify that no rows are displayed
//     //       const rows = await page.getByRole('cell', { name: 'Adams J' }).count();
//     //       expect(rows).toBe(4);
//     //     });
//     //     test('Should display no data if search term does not match3', async ({ page }) => {
//     //       // Set a search term that does not match any data
//     //       const searchTerm = '1';
//     //       await page.fill('input[placeholder="Search President"]', searchTerm);
//     //       await page.click('button:has-text("Search")');
      
//     //       // Verify that no rows are displayed
//     //       const rows = await page.getByRole('cell', { name: '1' }).count();
//     //       expect(rows).toBe(14);
//     //     });
//     //   });
//         // });
// // test('test for setTableTitle in prvp.component.ts', async ({ page }) => {
// //             await page.goto('https://example.com');
// //             // Add more test steps here
// //         });
// // test('test for deleteRow in prvp.component.ts', async ({ page }) => {
// //             await page.goto('https://example.com');
// //             // Add more test steps here
// //         });