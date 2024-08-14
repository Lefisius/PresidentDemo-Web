// import { test, expect } from '@playwright/test';

// interface GlobalWindow extends Window {
//     [key: string]: any;  // Allow indexing with string keys
//   }

// // ฟังก์ชันที่ตรวจสอบการมีอยู่ของฟังก์ชันหรือคลาสใหม่
// const checkForNewClass = async (page: any, className: string): Promise<boolean> => {
//   try {
//     // ใช้ page.evaluate เพื่อเรียกใช้โค้ด JavaScript ในหน้าเว็บ
//     return await page.evaluate((className: string) => {
//       // ตรวจสอบว่าคลาสมีการประกาศใน window หรือไม่
//       return typeof (window as GlobalWindow)[className] !== 'undefined';
//     }, className);
//   } catch (error) {
//     return false;
//   }
// };

// test.describe('New Class and Function Checks', () => {
//   test('should detect new class or function', async ({ page }) => {
//     // ไปที่หน้าเว็บที่มีการใช้งานฟังก์ชันหรือคลาส
//     await page.goto('http://localhost:4200/');

//     // ตรวจสอบการมีอยู่ของคลาสใหม่
//     const isNewClassPresent = await checkForNewClass(page, 'MyNewClass');

//     // ตรวจสอบว่าคลาสใหม่มีอยู่หรือไม่
//     expect(isNewClassPresent).toBe(true);

//     // ทำการทดสอบเพิ่มเติมถ้าจำเป็น เช่น การทำงานของคลาสใหม่
//     if (isNewClassPresent) {
//       // ตัวอย่างการทดสอบการทำงานของคลาสใหม่
//       const result = await page.evaluate(() => {
//         const instance = new (window as GlobalWindow)['MyNewClass']();
//         // ตรวจสอบการทำงานของคลาสใหม่
//         return instance.someMethod();  // สมมติว่ามีเมธอด someMethod
//       });
      
//       // เปรียบเทียบผลลัพธ์ที่คาดหวัง
//       expect(result).toBe('expected result');
//     }
//   });
// });
