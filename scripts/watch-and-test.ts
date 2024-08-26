import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import { notifyUser } from './notifyUser';
import { generatePlaywrightScript } from './generatePlaywrightScript';
import { runESLint } from './runESLint';
import { exec } from 'child_process';

// Set the watchFolder to 'src/app/modules'
const watchFolder = './src/app/modules';
const fileContents: { [key: string]: string } = {};
const componentFunctionMap: { [key: string]: string[] } = {};

function runPlaywrightTests(): Promise<void> {
    return new Promise((resolve, reject) => {
        const testProcess = exec('npx playwright test --reporter=list', (error, stdout, stderr) => {
            if (error) {
                const errorMessage = stderr || 'An error occurred during Playwright testing but no error details were available';
                notifyUser(`Playwright test failed`);
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
    const functionPattern = /(?:public|private)?\s*(?:async\s+)?(?<!constructor\s+)(\w+)\s*\(([^)]*)\)\s*:\s*([^;{]+)?\s*{/g;
    const arrowFunctionPattern = /const\s+(\w+)\s*=\s*\(.*\)\s*=>/g;
    const methodsPattern = /\b(\w+)\s*\([^)]*\)\s*:/g;
    const classPattern = /\bclass\s+\w+/g;

    const matches = [];
    let match;

    // ตรวจจับฟังก์ชันที่ไม่อยู่ในบล็อก if-else และไม่ใช่ toLowerCase
    while ((match = functionPattern.exec(content)) !== null) {
        if (!isInsideConditionalBlock(match.index, content) && 
            match[1] !== 'constructor' && 
            !containsToLowerCaseUsage(match[0])) {
            matches.push(match[1]);
        }
    }

    // ตรวจจับฟังก์ชันลูกศรที่ไม่อยู่ในบล็อก if-else และไม่ใช่ toLowerCase
    while ((match = arrowFunctionPattern.exec(content)) !== null) {
        if (!isInsideConditionalBlock(match.index, content) && 
            !containsToLowerCaseUsage(match[0])) {
            matches.push(match[1]);
        }
    }

    // ตรวจจับเมธอดที่ไม่อยู่ในบล็อก if-else และไม่ใช่ toLowerCase และไม่เป็นการประกาศคลาส
    while ((match = methodsPattern.exec(content)) !== null) {
        if (!classPattern.test(match.input.substring(0, match.index)) && 
            !isInsideConditionalBlock(match.index, content) && 
            !containsToLowerCaseUsage(match[0])) {
            matches.push(match[1]);
        }
    }

    return matches;
}

// ฟังก์ชันเพื่อเช็คว่ามีการใช้ .toLowerCase() ในการแปลงตัวแปรหรือไม่
function containsToLowerCaseUsage(functionCode: string): boolean {
    const toLowerCasePattern = /\.toLowerCase\(\)/g;
    return toLowerCasePattern.test(functionCode);
}

// ฟังก์ชันเพื่อเช็คว่าค่าที่จับได้อยู่ภายในโครงสร้าง if-else หรือไม่
function isInsideConditionalBlock(index: number, content: string): boolean {
    const before = content.substring(0, index);
    const ifElsePattern = /\b(if\s*\(.*?\)\s*{[\s\S]*?}|else\s*if\s*\(.*?\)\s*{[\s\S]*?}|else\s*{[\s\S]*?})/g;
    let match;

    while ((match = ifElsePattern.exec(before)) !== null) {
        if (index < ifElsePattern.lastIndex) {
            return true;
        }
    }

    return false;
}






function initializeWatch() {
    const files = fs.readdirSync(watchFolder);

    files.forEach(file => {
        const filePath = path.join(watchFolder, file);

        // Only process files within 'src/app/modules' and exclude certain file types
        if (filePath.endsWith('.ts') && 
            !filePath.endsWith('.spec.ts') && 
            !filePath.endsWith('.service.ts') && 
            !filePath.endsWith('.module.ts')) {
            const content = fs.readFileSync(filePath, 'utf-8');
            const functions = extractFunctions(content);
            componentFunctionMap[filePath] = functions;
            fileContents[filePath] = content;

            functions.forEach(fn => {
                generatePlaywrightScript(filePath, fn);
            });

            console.log(`Initialized ${filePath} with functions: ${functions.join(', ')}`);
        }
    });
}

const watcher = chokidar.watch(watchFolder, { persistent: true });

watcher.on('add', (filePath) => {
    try {
        // Ensure this block only runs for files in 'src/app/modules' and exclude specified file types
        if (!filePath.endsWith('.spec.ts') && !filePath.endsWith('.service.ts') && !filePath.endsWith('.module.ts')) {
            const currentContent = fs.readFileSync(filePath, 'utf-8');
            fileContents[filePath] = currentContent;
            componentFunctionMap[filePath] = extractFunctions(currentContent);

            // Generate scripts for all existing functions on file add
            componentFunctionMap[filePath].forEach(fn => {
                generatePlaywrightScript(filePath, fn);
            });

            console.log(`File ${filePath} has been added and initialized.`);
        }
    } catch (error) {
        console.error(`Failed to read file ${filePath}: ${error}`);
    }
});

watcher.on('change', async (filePath) => {
    console.log(`File ${filePath} has been changed`);

    if (filePath.endsWith('.spec.ts') || filePath.endsWith('.service.ts') || filePath.endsWith('.module.ts')) {
        console.log(`Skipping script creation for ${filePath} as it is a .spec.ts, .service.ts, or .module.ts file.`);
        return;
    }

    try {
        const currentContent = fs.readFileSync(filePath, 'utf-8');
        const oldFunctions = componentFunctionMap[filePath] || [];
        const newFunctions = extractFunctions(currentContent);

        const newAddedFunctions = newFunctions.filter(fn => !oldFunctions.includes(fn));

        if (newAddedFunctions.length > 0) {
            console.log(`New functions detected in ${filePath}: ${newAddedFunctions.join(', ')}`);

            newAddedFunctions.forEach(fn => {
                generatePlaywrightScript(filePath, fn);
                console.log(`Appended test for function ${fn} in ${filePath}`);
                notifyUser(`Test added for function ${fn} in ${filePath}`);
            });

            // Update the function map with all detected functions
            componentFunctionMap[filePath] = newFunctions;

            const eslintResult = await runESLint(filePath);
            if (eslintResult.errors.length > 0) {
                console.error(`ESLint errors in ${eslintResult.filePath}:`);
                eslintResult.errors.forEach(error => console.error(error));
            }

            try {
                await runPlaywrightTests();
                console.log('All Playwright tests passed successfully.');
            } catch (testError) {
                console.error(`Error running Playwright tests: ${testError}`);
            }
        }

        fileContents[filePath] = currentContent;
    } catch (error) {
        console.error(`Failed to read file ${filePath}: ${error}`);
    }
});

process.on('SIGINT', () => {
    watcher.close();
    console.log('Watcher closed');
    process.exit();
});

// Initialize the watcher by processing all existing files in 'src/app/modules'
initializeWatch();
