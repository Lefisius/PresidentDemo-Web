import { test, expect } from '@playwright/test';

test.describe('ElectionComponent Tests', () => {
  test('should add a printer successfully', async ({ page }) => {
    // Mock API response for adding a printer
    await page.route('http://localhost:9003/api/drivers/add', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Printer added successfully' }),
      });
    });

    // Navigate to the ElectionComponent page
    await page.goto('http://localhost:4200/Election');

    // Fill in the printer form fields
    await page.fill('input[name="printerName"]', 'Printer 1');
    await page.fill('input[name="printerIP"]', '192.168.1.1');
    await page.fill('input[name="printerDescription"]', 'Test Printer');
    await page.fill('input[name="printerLocation"]', 'Office');

    // Set file for PPD input using `setInputFiles`
    const filePath = 'C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd'; // ระบุ path ของไฟล์ที่ต้องการอัปโหลด
    await page.setInputFiles('#ppdFileInput', filePath);  // อัปโหลดไฟล์โดยไม่ต้องคลิก

    // Click the add printer button
    await page.click('button#addPrinterButton');

    // Verify that success notification is displayed
    await expect(page.locator('.ant-notification-notice-message')).toHaveText('Success');
    await expect(page.locator('.ant-notification-notice-description')).toHaveText('Printer added successfully.');
  });

  test('should handle error when adding a printer', async ({ page }) => {
    // Mock API response for failing to add a printer
    await page.route('http://localhost:9003/api/drivers/add', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Error adding printer' }),
      });
    });

    // Navigate to the ElectionComponent page
    await page.goto('http://localhost:4200/Election');

    // Fill in the printer form fields
    await page.fill('input[name="printerName"]', 'Printer 1');
    await page.fill('input[name="printerIP"]', '192.168.1.1');
    await page.fill('input[name="printerDescription"]', 'Test Printer');
    await page.fill('input[name="printerLocation"]', 'Office');

    // Set file for PPD input using `setInputFiles`
    const filePath = 'C:/Users/Yoo/Desktop/printerfile/Lexmark-C752-Postscript 1.ppd'; // ระบุ path ของไฟล์ที่ต้องการอัปโหลด
    await page.setInputFiles('#ppdFileInput', filePath);

    // Click the add printer button
    await page.click('button#addPrinterButton');

    // Verify that error notification is displayed
    await expect(page.locator('.ant-notification-notice-message')).toHaveText('Error');
    await expect(page.locator('.ant-notification-notice-description')).toHaveText('An error occurred while adding the printer.');
  });
});
