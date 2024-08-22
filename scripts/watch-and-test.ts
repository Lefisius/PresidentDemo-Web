import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import { notifyUser } from './notifyUser';
import { generatePlaywrightScript } from './generatePlaywrightScript';
import { runESLint } from './runESLint';
import { exec } from 'child_process';

const watchFolder = './src';
const fileContents: { [key: string]: string } = {};
const componentFunctionMap: { [key: string]: string[] } = {};

function runPlaywrightTests(): Promise<void> {
    return new Promise((resolve, reject) => {
        const testProcess = exec('npx playwright test --reporter=list', (error, stdout, stderr) => {
            if (error) {
                const errorMessage = stderr || 'เกิดข้อผิดพลาดระหว่างการทดสอบ Playwright แต่ไม่มีรายละเอียดข้อผิดพลาด';
                notifyUser(`การทดสอบ Playwright ล้มเหลว`);
                console.error(`${errorMessage}`);
                reject(error);
                return;
            }

            resolve();
        });

        testProcess.stdout?.pipe(process.stdout);
    });
}

function extractFunctions(content: string): string[] {
    // const functionPattern = /(\w+)\s*\(\)\s*:\s*void\s*{/g;  // ปรับให้ตรงกับฟังก์ชันที่ต้องการ
    const functionPattern = /(?:public|private)?\s*(async\s+)?(\w+)\s*\((.*?)\)\s*:\s*(void|string|Promise<void>)?\s*{/g;
    const arrowFunctionPattern = /const\s+(\w+)\s*=\s*\(.*\)\s*=>/g; // เพิ่มการตรวจจับ arrow functions
    const methodsPattern = /\b(\w+)\s*\(.*\)\s*{/g; // เพิ่มการตรวจจับ methods

    
    const matches = [];
    let match;

    while ((match = functionPattern.exec(content)) !== null) {
        matches.push(match[2]);
    }
    while ((match = arrowFunctionPattern.exec(content)) !== null) {
        matches.push(match[1]);
    }

    while ((match = methodsPattern.exec(content)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}

const watcher = chokidar.watch(watchFolder, { persistent: true });

watcher.on('add', (filePath) => {
    try {
        const currentContent = fs.readFileSync(filePath, 'utf-8');
        fileContents[filePath] = currentContent;
        componentFunctionMap[filePath] = extractFunctions(currentContent);
        console.log(`ไฟล์ ${filePath} ถูกเพิ่มและเริ่มต้นแล้ว.`);
    } catch (error) {
        console.error(`ไม่สามารถอ่านไฟล์ ${filePath} ได้: ${error}`);
    }
});

watcher.on('change', async (filePath) => {
    console.log(`ไฟล์ ${filePath} ถูกเปลี่ยนแปลง`);

    if (filePath.endsWith('.spec.ts')) {
        console.log(`ข้ามการสร้างสคริปต์สำหรับ ${filePath} เนื่องจากเป็นไฟล์ .spec.ts.`);
        return;
    }

    try {
        const currentContent = fs.readFileSync(filePath, 'utf-8');
        const oldFunctions = componentFunctionMap[filePath] || [];
        const newFunctions = extractFunctions(currentContent);

        const newAddedFunctions = newFunctions.filter(fn => !oldFunctions.includes(fn));

        if (newAddedFunctions.length > 0) {
            console.log(`ฟังก์ชันใหม่ที่ตรวจพบใน ${filePath}: ${newAddedFunctions.join(', ')}`);

            for (const fn of newAddedFunctions) {
                const scriptPath = generatePlaywrightScript(filePath, fn);
                console.log(`Appended test for function ${fn} in ${scriptPath}`);
                notifyUser(`เพิ่มการทดสอบสำหรับฟังก์ชัน ${fn} ใน ${scriptPath}`);
            }

            componentFunctionMap[filePath] = newFunctions;

            const eslintResult = await runESLint(filePath);
            if (eslintResult.errors.length > 0) {
                console.error(`ข้อผิดพลาด ESLint ใน ${eslintResult.filePath}:`);
                eslintResult.errors.forEach(error => console.error(error));
            }

            try {
                await runPlaywrightTests();
                console.log('การทดสอบ Playwright ทั้งหมดผ่านสำเร็จ.');
            } catch (testError) {
                console.error(`ข้อผิดพลาดในการรันการทดสอบ Playwright: ${testError}`);
            }
        }

        fileContents[filePath] = currentContent;
        componentFunctionMap[filePath] = newFunctions;
    } catch (error) {
        console.error(`ไม่สามารถอ่านไฟล์ ${filePath} ได้: ${error}`);
    }
});



process.on('SIGINT', () => {
    watcher.close();
    console.log('ปิดการติดตาม');
    process.exit();
});
