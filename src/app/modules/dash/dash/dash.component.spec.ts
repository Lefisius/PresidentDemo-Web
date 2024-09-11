import { test, expect } from '@playwright/test';

test('testDash', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.getByText('Stration').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-0').getByText('Prvp').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-1').getByText('Election').click();
  await page.getByText('PresHobby').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-2').getByText('President').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-3').getByText('PresMarriage').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-4').getByText('State').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-5').getByText('Stration').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-6').getByText('Prvp').click();
  await page.getByRole('row', { name: '1 Washington G Adams J Delete' }).getByRole('button').click();
  await page.getByRole('row', { name: 'Washington G Adams J Delete' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-7').getByText('PresHobby').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-8').getByText('President').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('#cdk-overlay-9').getByText('PresMarriage').click();
  await page.getByRole('row', { name: 'Adams J Smith A 28 19 5 1764' }).getByRole('button').click();
});




test('AdminPrVp Page Tests', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.goto('http://localhost:4200/Prvp');

  // ตรวจสอบว่า Title ของหน้าถูกต้อง
  await expect(page.locator('h1')).toHaveText('AdminPrVp');

  // ตรวจสอบว่าแถบค้นหามีอยู่ในหน้า
  const searchInput = page.locator('input[placeholder="Search President"]');
  await expect(searchInput).toBeVisible();

  // ตรวจสอบว่าปุ่ม Search มีอยู่ในหน้าและสามารถคลิกได้
  const searchButton = page.locator('button:has-text("Search")');
  await expect(searchButton).toBeVisible();
  await expect(searchButton).toBeEnabled();

  // ตรวจสอบว่าปุ่ม Delete มีอยู่ในทุกแถวและสามารถคลิกได้
  const deleteButtons = page.locator('button:has-text("Delete")');
  await expect(deleteButtons).toHaveCount(51); // จำนวนปุ่ม Delete ในแต่ละแถว
  for (let i = 0; i < await deleteButtons.count(); i++) {
    await expect(deleteButtons.nth(i)).toBeVisible();
    await expect(deleteButtons.nth(i)).toBeEnabled();
  }

  // ตัวอย่างการคลิกปุ่ม Delete ของแถวแรกและยืนยันการลบ
  await deleteButtons.first().click();


  // ยืนยันว่าข้อมูลถูกลบแล้ว
  await expect(deleteButtons).toHaveCount(50); // คาดหวังว่าจำนวนปุ่ม Delete จะลดลง 1

  // ทดสอบสีปุ่ม Delete
  const expectedColors = ['rgb(255, 79, 80)', 'rgb(255, 99, 99)', 'rgb(255, 120, 117)', 'rgb(255, 80, 82)', 'rgb(255, 77, 79)', 'rgb(255, 80, 81)', 'rgb(255, 79, 81)'  ];
  for (let i = 0; i < await deleteButtons.count(); i++) {
    const buttonColor = await deleteButtons.nth(i).evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(expectedColors).toContain(buttonColor);
  }
});

test('Check styles check election', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.goto('http://localhost:4200/Election');

  // ตรวจสอบสีพื้นหลังของปุ่ม "Add Printer"
  const addPrinterButton = page.getByRole('button', { name: 'Add Printer' });
  const buttonColor = await addPrinterButton.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('background-color');
  });
  expect(buttonColor).toBe('rgb(24, 144, 255)'); // สีน้ำเงินของปุ่ม
  // ตรวจสอบขนาดฟอนต์ของหัวข้อ "Add Printer"
  const heading = page.getByRole('button', { name: 'Add Printer' });
  const fontSize = await heading.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('font-size');
  });
  expect(fontSize).toBe('14px'); // ขนาดฟอนต์ของหัวข้อ (สมมติว่าเป็น 24px)
});


test('Check styles of the PresHobby page', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  await page.goto('http://localhost:4200/Preshobby');


  // ตรวจสอบสีพื้นหลังของแถบนำทาง
  const navbar = await page.locator('nz-header').first();
  const navbarColor = await navbar.evaluate((el) =>
    window.getComputedStyle(el).getPropertyValue('background-color')
  );
  expect(navbarColor).toBe('rgb(0, 21, 41)'); // สีดำของแถบนำทาง

  // ตรวจสอบสีปุ่ม "Install Printer"
  const installButton = await page.getByRole('button', { name: 'Install Printer', exact: true });
  const buttonColor = await installButton.evaluate((el) =>
    window.getComputedStyle(el).getPropertyValue('background-color')
  );
  expect(buttonColor).toBe('rgb(24, 144, 255)'); // สีฟ้าของปุ่ม

  // ตรวจสอบขนาดฟอนต์ของหัวข้อ
  const heading = await page.locator('h1:text("PresHobby")');
  const fontSize = await heading.evaluate((el) =>
    window.getComputedStyle(el).getPropertyValue('font-size')
  );
  expect(fontSize).toBe('28px'); // ขนาดฟอนต์ของหัวข้อ

  // ตรวจสอบขอบของอินพุต
  const inputBorder = await page.locator('input[placeholder="Printer Name"]').evaluate((el) =>
    window.getComputedStyle(el).getPropertyValue('border')
  );
  expect(inputBorder).toContain('1.6px inset rgb(118, 118, 118)'); // ขอบของอินพุต
});

