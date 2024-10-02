import { test, expect, Page } from '@playwright/test';
import sharp from 'sharp';
import fs from 'fs';

// ฟังก์ชันในการแคปเจอร์ภาพหน้าจอและวาดวงกลมบนจุดที่มีปัญหา
async function captureScreenshotWithCircle(page: Page, circleX: number, circleY: number, testName: string) {
    const timestamp = Date.now(); // เพิ่ม timestamp เพื่อป้องกันการบันทึกทับ
    const screenshotPath = `screenshots/${testName}_failure_${timestamp}.png`;
    
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot taken for ${testName} at:`, screenshotPath);

    const circleDiameter = 100;
    const imageBuffer = fs.readFileSync(screenshotPath);

    await sharp(imageBuffer)
        .composite([{
            input: Buffer.from(`
                <svg width="${page.viewportSize()?.width}" height="${page.viewportSize()?.height}">
                    <circle cx="${circleX}" cy="${circleY}" r="${circleDiameter / 2}" stroke="red" stroke-width="5" fill="none" />
                </svg>
            `),
            blend: 'over'
        }])
        .toFile(`screenshots/${testName}_failure_with_circle_${timestamp}.png`)
        .then(() => console.log(`Circle drawn on screenshot for ${testName} successfully.`))
        .catch(err => console.error(`Error processing screenshot with Sharp for ${testName}:`, err));
}


// ฟังก์ชันสำหรับการตรวจสอบปุ่มและวาดวงกลมถ้ามีข้อผิดพลาด
async function checkButtonAndDrawCircle(page: Page, button: any, expectedBorder: string, testName: string) {
    try {
        await expect(button).toHaveCSS('border', expectedBorder);
    } catch (error) {
        console.error(`เกิดข้อผิดพลาดที่ปุ่มใน ${testName}:`, error);

        const boundingBox = await button.boundingBox();
        if (boundingBox) {
            const circleX = boundingBox.x + boundingBox.width / 2;
            const circleY = boundingBox.y + boundingBox.height / 2;
            await captureScreenshotWithCircle(page, circleX, circleY, testName);
        } else {
            console.error('Bounding box is null.');
        }

        throw error; 
    }
}

// ฟังก์ชันสำหรับการตรวจสอบกล่องข้อความและวาดวงกลมถ้ามีข้อผิดพลาด
async function validateInputBox(page: Page, placeholder: string, expectedWidth: number, expectedHeight: number, testName: string) {
    const inputBox = page.getByPlaceholder(placeholder);

    try {
        await expect(inputBox).toBeVisible();

        const boundingBox = await inputBox.boundingBox();
        if (boundingBox) {
            expect(boundingBox.width).toBe(expectedWidth);
            expect(boundingBox.height).toBe(expectedHeight);
        } else {
            console.error('Bounding box is null.');
            throw new Error(`Bounding box not found for input with placeholder: ${placeholder}`);
        }

    } catch (error) {
        console.error(`เกิดข้อผิดพลาดกับกล่องข้อความที่มี placeholder: ${placeholder} ใน ${testName}`, error);

        const boundingBox = await inputBox.boundingBox();
        if (boundingBox) {
            const circleX = boundingBox.x + boundingBox.width / 2;
            const circleY = boundingBox.y + boundingBox.height / 2;
            await captureScreenshotWithCircle(page, circleX, circleY, testName);
        } else {
            console.error('Bounding box is null, unable to draw circle.');
        }

        throw error; 
    }
}

test('ทดสอบขนาดของกล่องข้อความ', async ({ page }) => {
    await page.goto('http://localhost:4200/President');

    // ตรวจสอบขนาดกล่องข้อความ
    await validateInputBox(page, 'Search President', 50, 32, 'Test_ValidateInputBox_1');
    await validateInputBox(page, 'From', 150, 32, 'Test_ValidateInputBox_2');
    await validateInputBox(page, 'To', 150, 32, 'Test_ValidateInputBox_3');
});

test('ทดสอบการแคปเจอร์หน้าจอพร้อมวงกลม', async ({ page }) => {
    await page.goto('http://localhost:4200/President');

    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    const tab2 = page.locator('button').filter({ hasText: /^Search$/ });

    // ตรวจสอบทั้งสองปุ่ม
    await checkButtonAndDrawCircle(page, searchButton, '1px solid rgb(24, 144, 255)', 'Test_CheckButton_1');
    await checkButtonAndDrawCircle(page, tab2, '1px solid rgb(24, 144, 255)', 'Test_CheckButton_2');
});

