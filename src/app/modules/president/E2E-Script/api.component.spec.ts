import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { filterData } from '../param.data/data.util';

test('test', async ({ page }) => {
    try {
        await page.goto('https://24d95ca73e89dfa76c417797f94624e1.serveo.net/President');
        //-------------------------------------------------------------------------
        // รอรับ response จาก API
        const apiResponse = await page.waitForResponse(
            (response) => response.url().includes('https://02d3b69ec631957944e5a8177168b349.serveo.net/api/President') && response.status() === 200
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
