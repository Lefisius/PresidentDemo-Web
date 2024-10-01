import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/Dash');
  
  // รอให้คำว่า 'President' ปรากฏก่อนคลิก
  await page.waitForSelector('text=President', { timeout: 60000 });
  await page.getByText('President', { exact: true }).click();
  
  // รอให้ input ของ Search ปรากฏก่อนกรอกข้อมูล
  await page.waitForSelector('input[placeholder="Search President"]', { timeout: 60000 });
  await page.getByPlaceholder('Search President').click();
  await page.getByPlaceholder('Search President').fill('Adams J');
  await page.getByPlaceholder('Search President').press('Enter');

  // รอให้ปุ่ม Search โหลดสำเร็จก่อนคลิก
  await page.waitForSelector('button[name="Search"]', { timeout: 60000 });
  await page.getByRole('button', { name: 'Search' }).first().click();
  
  // รอให้ cell 'Adams J' ปรากฏก่อนคลิก
  await page.waitForSelector('td:has-text("Adams J")', { timeout: 60000 });
  await page.getByRole('cell', { name: 'Adams J', exact: true }).click();
  await page.getByRole('cell', { name: '1735' }).click();

  await page.getByPlaceholder('From').click();
  await page.getByRole('button', { name: 'Select' }).click();

  // รอให้ตัวเลือก Prvp ปรากฏก่อนคลิก
  await page.waitForSelector('#cdk-overlay-0 text=Prvp', { timeout: 60000 });
  await page.locator('#cdk-overlay-0').getByText('Prvp').click();
});
