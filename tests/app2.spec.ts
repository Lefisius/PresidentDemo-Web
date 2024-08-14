// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:4200/');
// });

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
//     await page.getByLabel('Printer Name').fill('SpeacNEW'); //HP-LaserJet-400-M401 , Lexmark-C752-Postscript , DEC-LA70-la70
//     await page.getByLabel('Printer IP').click();
//     await page.getByLabel('Printer IP').fill('172.16.22.241');
//     await page.getByLabel('Printer Description').click();
//     await page.getByLabel('Printer Description').fill('Main'); //	Main Printer
//     await page.getByLabel('PPD File').click();
//     await page.getByLabel('PPD File').setInputFiles('C:/Users/Yoo/Desktop/printerfile/HP_LaserJet_400_M401 1.ppd');

//     // คลิกปุ่มเพิ่มเติม
//     // await page.mouse.wheel(0, 1000);
//     await page.getByRole('button', { name: 'Add Printer' }).click();
    
//     const successPopup = page.locator('text="Success"');
//     await expect(successPopup).toBeVisible();
//     await expect(successPopup).toHaveText('Success');

//     // await page.mouse.wheel(0, 1000);
//     // await page.getByRole('row', { name: 'HP-LaserJetNEW 172.16.22.241 soft square international Delete' }).getByRole('button').click();   

    
//     // await page.getByRole('button', { name: 'Install Drivers' }).click();

//   } catch (err) {
//     // จับข้อผิดพลาดและทำการ screenshot
//     console.error('An error occurred:', err);
//     await page.screenshot({ path: 'C:/Users/Yoo/Pictures/Saved Pictures/Err2.png', fullPage: true });
//     throw err; // ทำให้การทดสอบล้มเหลวหากเกิดข้อผิดพลาด
//   }
// });


// test('testcatchERR2', async ({ page }) => {
//     try {
//         // ตรวจสอบ URL ให้ตรงตามที่คาดหวัง
//         await expect(page).toHaveURL(/\/Dash$/);
//         await page.goto('http://localhost:4200/Election');
//         expect(page.url()).toBe('http://localhost:4200/Election'); // เช็คความถูกต้องของ path URL
    
//         // คลิกที่ปุ่มและเลือกข้อความต่างๆ
//         await page.getByRole('button', { name: 'Get Started' }).click();
//         await page.getByText('Election').click();
    
//         // let rowLocator = page.locator('role=row[name="SpeacNEW 172.16.22.241 Main"]');
//         // const maxScrolls = 10;  // จำนวนครั้งสูงสุดในการเลื่อน
//         // let scrollCount = 0;
//         await page.mouse.wheel(0, 1000);
//         await page.getByRole('row', { name: 'SpeacNEW 172.16.22.241 Main Delete' }).getByRole('button').click();   
    
//         // ทำการเลื่อนเมาส์จนกว่าจะเจอแถวที่ต้องการ หรือถึงจำนวนครั้งสูงสุดที่กำหนด
//         // while (await rowLocator.count() === 0 && scrollCount < maxScrolls) {
//         //   await page.mouse.wheel(0, 1000);  // เลื่อนลง
//         //   await page.waitForTimeout(500);   // รอให้หน้าเว็บโหลดก่อนจะเลื่อนครั้งต่อไป
//         //   scrollCount++;
//         //   rowLocator = page.locator('role=row[name="SpeacNEW 172.16.22.241 Main"]'); // อัปเดต rowLocator หลังจากการเลื่อน
//         // }
    
//         // if (await rowLocator.count() === 0) {
//         //   throw new Error('Row not found after scrolling');
//         // }
    
//         // ถ้าเจอแถวแล้ว ให้ดำเนินการต่อ
//         // const deleteButton = rowLocator.locator('role=button[name="Delete"]');
//         // await deleteButton.waitFor({ state: 'visible', timeout: 10000 }); // รอให้ปุ่มปรากฏ
//         // await deleteButton.click();
//       } catch (err) {
//         // จับข้อผิดพลาดและทำการ screenshot
//         console.error('An error occurred:', err);
//         await page.screenshot({ path: 'C:/Users/Yoo/Pictures/Saved Pictures/Eiei.png', fullPage: true });
//         throw err; // ทำให้การทดสอบล้มเหลวหากเกิดข้อผิดพลาด
//       }
//   });
  

  