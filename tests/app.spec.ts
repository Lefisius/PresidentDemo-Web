// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:4200/');
//   // await page.getByLabel('Username or email address').fill('Rooniaz');
//   // await page.getByLabel('Password').fill('Roo029046406');
//   // await page.getByRole('button', { name: 'Sign in' }).click();
// });
// // test.describe('grouped tests', () => {

// // test('test1', async ({ page }) => {
// //     await expect(page).toHaveURL(/\/Dash$/);
// //   expect(page.url()).toBe('http://localhost:4200/Dash'); //เช็คความถูกต้องของ path url
// //   await page.getByRole('button', { name: 'Get Started' }).click();
// //   await page.getByText('PresHobby').click();
// //   await page.getByText('President').click();
// //   await page.getByText('Election').click();
// // //   await page.screenshot({ path: 'C:/Users/Yoo/Pictures/Saved Pictures/fullpage3.png' });
// //     // const element = await page.$('selector');   
// //     // await element.screenshot({ path: 'element.png' });
// // //   await page.screenshot({ path: 'C:/Users/Yoo/Pictures/Saved Pictures/fullpage2.png', fullPage: true });
// //   await page.getByLabel('Printer Name').click();
// //   await page.getByLabel('Printer Name').fill('Printer');
// //   await page.getByLabel('Printer IP').click();
// //   await page.getByLabel('Printer IP').fill('172.80.60.4');
// //   await page.getByLabel('Printer Description').click();

// //   await page.getByLabel('Printer Description').fill('soft square international');
// // //   await page.getByLabel('PPD File').click();
// // //   await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/');
// //   await page.getByRole('button', { name: 'Add Printer' }).click();
// //   await page.getByRole('button', { name: 'Install Drivers' }).click();
// // });

// //         test('checking', async ({ page }) => {
// //         await page.getByText('PresMarriage').click();
// //         await page.getByPlaceholder('Search President').click();
// //         await page.getByPlaceholder('Search President').fill('smit');
  
// //     });
    
// // });



// test('testcatchERR', async ({ page }) => {
//   try {
//     // ตรวจสอบ URL ให้ตรงตามที่คาดหวัง
//     await expect(page).toHaveURL(/\/Dash$/);
//     expect(page.url()).toBe('http://localhost:4200/Dash'); // เช็คความถูกต้องของ path URL

//     // คลิกที่ปุ่มและเลือกข้อความต่างๆ
//     await page.getByRole('button', { name: 'Get Started' }).click();
//     await page.getByText('Election').click();

//     // คลิกและกรอกข้อมูล
//     await page.getByLabel('Printer Name').click();
//     await page.getByLabel('Printer Name').fill('LexmarkOLD'); //HP-LaserJet-400-M401 , Lexmark-C752-Postscript , DEC-LA70-la70
//     await page.getByLabel('Printer IP').click();
//     await page.getByLabel('Printer IP').fill('172.16.22.241');
//     await page.getByLabel('Printer Description').click();
//     await page.getByLabel('Printer Description').fill('soft square international'); //	Main Printer
//     await page.getByLabel('PPD File').click();
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/Apple-ImageWriter-iwhi 1.ppd');

//     // คลิกปุ่มเพิ่มเติม
//     await page.mouse.wheel(0, 1000);
//     await page.getByRole('button', { name: 'Add Printer' }).click();
    
//     // await page.getByRole('button', { name: 'Install Drivers' }).click();

//   } catch (err) {
//     // จับข้อผิดพลาดและทำการ screenshot
//     console.error('An error occurred:', err);
//     await page.screenshot({ path: 'C:/Users/Yoo/Pictures/Saved Pictures/Err.png', fullPage: true });
//     throw err; // ทำให้การทดสอบล้มเหลวหากเกิดข้อผิดพลาด
//   }
// });

