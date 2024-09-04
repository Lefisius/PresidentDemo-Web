// import { test, expect } from '@playwright/test';

// test.describe('ElectionComponent Tests', () => {
//   test('should add a printer successfully', async ({ page }) => {
//     // Mock API response for adding a printer
//     await page.route('http://localhost:9003/api/drivers/add', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify({ message: 'Printer added successfully' }),
//       });
//     });

//     // Mock API response for getting printers list
//     await page.route('http://localhost:9003/api/drivers', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify([
//           { id: 4, name: 'Printer 1', ip: '192.168.1.1', description: 'Test Printer', location: 'Office' },
//           // other printers...
//         ]),
//       });
//     });

//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');

//     // Fill in the printer form fields
//     await page.fill('input[name="printerName"]', 'Printer 1');
//     await page.fill('input[name="printerIP"]', '192.168.1.1');
//     await page.fill('input[name="printerDescription"]', 'Test Printer');
//     await page.fill('input[name="printerLocation"]', 'Office');

//     // Set file for PPD input using `setInputFiles`
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd');

//     // Click the add printer button
//     await page.getByRole('button', { name: 'Add Printer' }).click();

//     // Verify that success notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer added successfully.');

//     // Refresh the list to verify the added printer
//     await page.reload(); // หรือไปที่ route อื่นที่ดึงรายการเครื่องพิมพ์อีกครั้ง

//     // Verify that the newly added printer appears in the list
//     const newRow = page.locator('table tr:has-text("Printer 1")'); // ใช้ :has-text เพื่อค้นหาข้อความที่ต้องการ
//     await newRow.scrollIntoViewIfNeeded(); // เลื่อนหน้าลงมาจนกว่าแถวใหม่จะอยู่ในมุมมอง

//     // ตรวจสอบว่ามีเครื่องพิมพ์ที่เพิ่งเพิ่มแล้วอยู่ในตาราง
//     await expect(newRow).toContainText('Printer 1');
//     await expect(newRow).toContainText('192.168.1.1');
//   });

//   test('should handle error when adding a printer', async ({ page }) => {
//     // Mock API response for failing to add a printer
//     await page.route('http://localhost:9003/api/drivers/add', route => {
//       route.fulfill({
//         status: 500,
//         contentType: 'application/json',
//         body: JSON.stringify({ error: 'Error adding printer' }),
//       });
//     });

//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');

//     // Fill in the printer form fields
//     await page.fill('input[name="printerName"]', 'Printer 1');
//     await page.fill('input[name="printerIP"]', '192.168.1.1');
//     await page.fill('input[name="printerDescription"]', 'Test Printer');
//     await page.fill('input[name="printerLocation"]', 'Office');

//     // Set file for PPD input using `setInputFiles`
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd');

//     // Click the add printer button
//     await page.getByRole('button', { name: 'Add Printer' }).click();

//     // Verify that error notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Error');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('An error occurred while adding the printer.');
//   });


//   test('should add a printer successfully and verify through API response', async ({ page }) => {
//     // Mock API response for adding a printer
//     const mockApiResponse = {
//       message: 'Printer added successfully',
//       data: { id: 3, name: 'Printer 1', ip: '192.168.1.1', description: 'Test Printer', location: 'Office' }
//     };
  
//     await page.route('http://localhost:9003/api/drivers/add', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify(mockApiResponse),
//       });
//     });
  
//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');
  
//     // Fill in the printer form fields
//     await page.fill('input[name="printerName"]', 'Printer 1');
//     await page.fill('input[name="printerIP"]', '192.168.1.1');
//     await page.fill('input[name="printerDescription"]', 'Test Printer');
//     await page.fill('input[name="printerLocation"]', 'Office');
  
//     // Set file for PPD input using `setInputFiles`
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd');
  
//     // Intercept the network request to verify the API call
//     const [response] = await Promise.all([
//       page.waitForResponse('http://localhost:9003/api/drivers/add'),
//       page.click('button:has-text("Add Printer")'),
//     ]);
  
//     // Verify the API response
//     const responseBody = await response.json();
//     expect(responseBody).toEqual(mockApiResponse);
  
//     // Verify that success notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer added successfully.');
//   });
  
  

//   test('should add a printer successfully and verify from the printers list', async ({ page }) => {
//     // Mock API response for adding a printer
//     await page.route('http://localhost:9003/api/drivers/add', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify({ message: 'Printer added successfully' }),
//       });
//     });
  
//     // Mock API response for getting printers list
//     await page.route('http://localhost:9003/api/drivers', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify([
//           { id: 4, name: 'Printer 100', ip: '192.168.1.1', description: 'Test Printer', location: 'Office' },
//           // other printers...
//         ]),
//       });
//     });
  
//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');
  
//     // Fill in the printer form fields
//     await page.fill('input[name="printerName"]', 'Printer 100');
//     await page.fill('input[name="printerIP"]', '192.168.1.1');
//     await page.fill('input[name="printerDescription"]', 'Test Printer');
//     await page.fill('input[name="printerLocation"]', 'Office');
  
//     // Set file for PPD input using `setInputFiles`
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd');
  
//     // Click the add printer button
//     await page.getByRole('button', { name: 'Add Printer' }).click();
  
//     // Verify that success notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer added successfully.');
  
//     // Refresh the list to verify the added printer
//     await page.reload(); // หรือไปที่ route อื่นที่ดึงรายการเครื่องพิมพ์อีกครั้ง
  
//     // Verify that the newly added printer appears in the list
//     const newRow = page.locator('table tr:has-text("Printer 100")'); // ใช้ :has-text เพื่อค้นหาข้อความที่ต้องการ
//     await newRow.scrollIntoViewIfNeeded(); // เลื่อนหน้าลงมาจนกว่าแถวใหม่จะอยู่ในมุมมอง
  
//     // ตรวจสอบว่ามีเครื่องพิมพ์ที่เพิ่งเพิ่มแล้วอยู่ในตาราง
//     await expect(newRow).toContainText('Printer 100');
//     await expect(newRow).toContainText('192.168.1.1');
//   });

//   test('should successfully install drivers and display success notification', async ({ page }) => {
//     // Mock API response for installing drivers
//     await page.route('http://localhost:9003/api/drivers/install', route => {
//       route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify({ message: 'Drivers installation completed' }),
//       });
//     });

//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');

//     // Trigger the install drivers process
//     await page.getByRole('button', { name: 'Install Drivers' }).click(); // เปลี่ยน selector ตามปุ่มจริงใน UI

//     // Verify that success notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printers installation process completed');
//   });

//   test('should handle error while installing drivers and display error notification', async ({ page }) => {
//     // Mock API response for error during drivers installation
//     await page.route('http://localhost:9003/api/drivers/install', route => {
//       route.fulfill({
//         status: 500,
//         contentType: 'application/json',
//         body: JSON.stringify({ error: 'Error installing drivers' }),
//       });
//     });

//     // Navigate to the ElectionComponent page
//     await page.goto('http://localhost:4200/Election');

//     // Trigger the install drivers process
//     await page.getByRole('button', { name: 'Install Drivers' }).click(); // เปลี่ยน selector ตามปุ่มจริงใน UI

//     // Verify that error notification is displayed
//     await expect(page.locator('.ant-notification-notice-message')).toHaveText('Error');
//     await expect(page.locator('.ant-notification-notice-description')).toHaveText('An error occurred while installing the drivers.');
//   });

//   // test('should add and then delete a printer successfully', async ({ page }) => {
//   //   // Mock API response for adding a printer
//   //   await page.route('http://localhost:9003/api/drivers/add', route => {
//   //     route.fulfill({
//   //       status: 200,
//   //       contentType: 'application/json',
//   //       body: JSON.stringify({ message: 'Printer added successfully' }),
//   //     });
//   //   });
  
//   //   // Mock API response for getting printers list
//   //   await page.route('http://localhost:9003/api/drivers', route => {
//   //     route.fulfill({
//   //       status: 200,
//   //       contentType: 'application/json',
//   //       body: JSON.stringify([
//   //         { id: 4, name: 'Printer 100', ip: '192.168.1.1', description: 'Test Printer', location: 'Office' },
//   //       ]),
//   //     });
//   //   });
  
//   //   // Mock API response for deleting a printer
//   //   let deleteAttempts = 0;
//   //   await page.route('http://localhost:9003/api/drivers/delete', route => {
//   //     deleteAttempts++;
//   //     if (deleteAttempts < 5) {
//   //       route.fulfill({
//   //         status: 500,
//   //         contentType: 'application/json',
//   //         body: JSON.stringify({ error: 'An error occurred while deleting the printer.' }),
//   //       });
//   //     } else {
//   //       route.fulfill({
//   //         status: 200,
//   //         contentType: 'application/json',
//   //         body: JSON.stringify({ message: 'Printer deleted successfully' }),
//   //       });
//   //     }
//   //   });
  
//   //   // Navigate to the ElectionComponent page
//   //   await page.goto('http://localhost:4200/Election');
  
//   //   // Fill in the printer form fields
//   //   await page.fill('input[name="printerName"]', 'Printer 100');
//   //   await page.fill('input[name="printerIP"]', '192.168.1.1');
//   //   await page.fill('input[name="printerDescription"]', 'Test Printer');
//   //   await page.fill('input[name="printerLocation"]', 'Office');
  
//   //   // Set file for PPD input using `setInputFiles`
//   //   await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd');
  
//   //   // Click the add printer button
//   //   await page.getByRole('button', { name: 'Add Printer' }).click();
  
//   //   // Verify that success notification is displayed
//   //   await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//   //   await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer added successfully.');
  
//   //   // Refresh the list to verify the added printer
//   //   await page.reload(); // หรือไปที่ route อื่นที่ดึงรายการเครื่องพิมพ์อีกครั้ง
  
//   //   // Verify that the newly added printer appears in the list
//   //   const newRow = page.locator('table tr:has-text("Printer 100")');
//   //   await newRow.scrollIntoViewIfNeeded(); // เลื่อนหน้าลงมาจนกว่าแถวใหม่จะอยู่ในมุมมอง
  
//   //   // ตรวจสอบว่ามีเครื่องพิมพ์ที่เพิ่งเพิ่มแล้วอยู่ในตาราง
//   //   await expect(newRow).toContainText('Printer 100');
//   //   await expect(newRow).toContainText('192.168.1.1');
  
//   //   // Click the delete button for the added printer
//   //   let success = false;
//   //   for (let i = 0; i < 5; i++) {
//   //     try {
//   //       // Click delete button
//   //       await page.getByRole('button', { name: 'Delete' }).click();
  
//   //       // Verify that success notification is displayed
//   //       await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
//   //       await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer deleted successfully.');
  
//   //       // If verification is successful, break the loop
//   //       success = true;
//   //       break;
//   //     } catch (error) {
//   //       console.error('Error during delete attempt:', error);
//   //       await page.waitForTimeout(1000); // Wait for a short period before retrying
//   //     }
//   //   }
  
//   //   if (!success) {
//   //     throw new Error('Failed to delete printer after multiple attempts.');
//   //   }
  
//   //   // Refresh the list again to verify the printer has been removed
//   //   await page.reload(); // หรือไปที่ route อื่นที่ดึงรายการเครื่องพิมพ์อีกครั้ง
  
//   //   // Verify that the deleted printer no longer appears in the list
//   //   const deletedRow = page.locator('table tr:has-text("Printer 100")');
//   //   await expect(deletedRow).toHaveCount(0); // ตรวจสอบว่าไม่มีแถวที่มีข้อมูลของเครื่องพิมพ์ที่ถูกลบ
//   // });
// });


