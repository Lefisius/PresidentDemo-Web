import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { filterData } from '../param.data/data.util';

test('test', async ({ page }) => {
    try {
        await page.goto('http://localhost:4200/President');
        console.log('Navigated to the President page');

        // รอให้ Angular application โหลดเสร็จ
        await page.waitForSelector('selector-that-indicates-page-loaded', { timeout: 60000 }); // เพิ่ม timeout

        // รอรับ response จาก API
        const apiResponse = await page.waitForResponse(
            (response) => response.url().includes('http://localhost:9003/api/President') && response.status() === 200,
            { timeout: 60000 }  // เพิ่ม timeout เป็น 60 วินาที
        );

        // รับข้อมูล JSON จาก API
        const jsonResponse = await apiResponse.json();
        console.log('API Response:', jsonResponse);

        // อ่านข้อมูลจากไฟล์ JSON ที่เตรียมไว้
        const expectedDataBuffer = await fs.promises.readFile('src/app/modules/president/expect/President.json', 'utf-8');
        const expectedData = JSON.parse(expectedDataBuffer);

        // ฟิลเตอร์ข้อมูล (ถ้าจำเป็น)
        const filteredActualData = filterData(jsonResponse);
        const filteredExpectedData = filterData(expectedData);

        // เปรียบเทียบข้อมูลจริงกับข้อมูลคาดหวัง
        expect(filteredActualData).toEqual(filteredExpectedData);
    } catch (error) {
        console.error('An error occurred:', error);

        // ตรวจสอบว่าหน้าเพจยังไม่ปิดก่อนจับภาพหน้าจอ
        if (!page.isClosed()) {
            console.log('Page is still open, taking screenshot...');
            await page.screenshot({ path: 'screenshots/failure.png' });
        } else {
            console.log('Page is closed, cannot take screenshot.');
        }

        // โยนข้อผิดพลาดเพื่อให้การทดสอบล้มเหลว
        throw error;
    }
});
