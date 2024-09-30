// import { test, expect } from '@playwright/test';
// import * as fs from 'fs';
// import { filterData } from '../param.data/data.util';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:4200/President');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/President') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse = await apiResponse.json();
//   console.log('API Response:', jsonResponse);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer = await fs.promises.readFile('src/app/modules/president/expect/President.json', 'utf-8');
//   const expectedData = JSON.parse(expectedDataBuffer);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData = filterData(jsonResponse); 
//   const filteredExpectedData = filterData(expectedData);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData).toEqual(filteredExpectedData);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/Stration');
// //   await page.waitForTimeout(1000);
// //   await page.goto('http://localhost:4200/Stration');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse2 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/Administrations') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse2 = await apiResponse2.json();
//   console.log('API Response:', jsonResponse2);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer2 = await fs.promises.readFile('src/app/modules/president/expect/Administrations.json', 'utf-8');
//   const expectedData2 = JSON.parse(expectedDataBuffer2);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData2 = filterData(jsonResponse2); 
//   const filteredExpectedData2 = filterData(expectedData2);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData2).toEqual(filteredExpectedData2);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/Prvp');
// //   await page.goto('http://localhost:4200/Prvp');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse3 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/Adminprvp') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse3 = await apiResponse3.json();
//   console.log('API Response:', jsonResponse3);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer3 = await fs.promises.readFile('src/app/modules/president/expect/Adminprvp.json', 'utf-8');
//   const expectedData3 = JSON.parse(expectedDataBuffer3);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData3 = filterData(jsonResponse3); 
//   const filteredExpectedData3 = filterData(expectedData3);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData3).toEqual(filteredExpectedData3);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/Election');
// //   await page.goto('http://localhost:4200/Election');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse4 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/Election') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse4 = await apiResponse4.json();
//   console.log('API Response:', jsonResponse4);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer4 = await fs.promises.readFile('src/app/modules/president/expect/Election.json', 'utf-8');
//   const expectedData4 = JSON.parse(expectedDataBuffer4);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData4 = filterData(jsonResponse4); 
//   const filteredExpectedData4 = filterData(expectedData4);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData4).toEqual(filteredExpectedData4);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/Preshobby');
// //   await page.goto('http://localhost:4200/Preshobby');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse5 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/PresHobby') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse5 = await apiResponse5.json();
//   console.log('API Response:', jsonResponse5);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer5 = await fs.promises.readFile('src/app/modules/president/expect/PresHobby.json', 'utf-8');
//   const expectedData5 = JSON.parse(expectedDataBuffer5);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData5 = filterData(jsonResponse5); 
//   const filteredExpectedData5 = filterData(expectedData5);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData5).toEqual(filteredExpectedData5);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/Presmarriage');
// //   await page.goto('http://localhost:4200/Presmarriage');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse6 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/Presmarriage') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse6 = await apiResponse6.json();
//   console.log('API Response:', jsonResponse6);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer6 = await fs.promises.readFile('src/app/modules/president/expect/Presmarriage.json', 'utf-8');
//   const expectedData6 = JSON.parse(expectedDataBuffer6);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData6 = filterData(jsonResponse6); 
//   const filteredExpectedData6 = filterData(expectedData6);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData6).toEqual(filteredExpectedData6);
//   //-------------------------------------------------------------------------
//   await page.waitForTimeout(1000);
//   await page.goto('http://localhost:4200/State');
//   //-------------------------------------------------------------------------
//   // รอรับ response จาก API
//   const apiResponse7 = await page.waitForResponse(
//     (response) => response.url().includes('http://localhost:9003/api/State') && response.status() === 200
//   );

//   // รับข้อมูล JSON จาก API
//   const jsonResponse7 = await apiResponse7.json();
//   console.log('API Response:', jsonResponse7);

//   // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
//   const expectedDataBuffer7 = await fs.promises.readFile('src/app/modules/president/expect/State.json', 'utf-8');
//   const expectedData7 = JSON.parse(expectedDataBuffer7);

//   // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
//   const filteredActualData7 = filterData(jsonResponse7); 
//   const filteredExpectedData7 = filterData(expectedData7);

//   // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
//   expect(filteredActualData7).toEqual(filteredExpectedData7);
//   //-------------------------------------------------------------------------
// });




