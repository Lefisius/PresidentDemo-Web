import * as chokidar from 'chokidar';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as glob from 'glob';
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
            console.log(stdout);
            resolve();
        });

        testProcess.stdout?.pipe(process.stdout);
        testProcess.stderr?.pipe(process.stderr);
    });
}

function extractFunctions(content: string): string[] {
    const functionPattern = /(?:public|private)?\s*(?:async\s+)?(?<!constructor\s+)(\w+)\s*\(([^)]*)\)\s*:\s*([^;{]+)?\s*{/g;
    const arrowFunctionPattern = /const\s+(\w+)\s*=\s*\(.*\)\s*=>/g;
    const methodsPattern = /\b(\w+)\s*\([^)]*\)\s*:/g;
    const classPattern = /\bclass\s+\w+/g;

    const matches: string[] = [];
    let match: RegExpExecArray | null;

    // ตรวจจับฟังก์ชันที่เป็น Top Level
    while ((match = functionPattern.exec(content)) !== null) {
        const functionCode = getFunctionCode(match.index, content);
        if (functionCode && !isInsideConditionalBlock(match.index, content) &&
            match[1] !== 'constructor' &&
            !containsToLowerCaseUsage(functionCode) &&
            isTopLevel(match.index, content)) {
            matches.push(match[1]);
        }
    }

    // ตรวจจับฟังก์ชันลูกศรที่เป็น Top Level
    while ((match = arrowFunctionPattern.exec(content)) !== null) {
        const functionCode = getArrowFunctionCode(match.index, content);
        if (functionCode && !isInsideConditionalBlock(match.index, content) &&
            !containsToLowerCaseUsage(functionCode) &&
            isTopLevel(match.index, content)) {
            matches.push(match[1]);
        }
    }

    // ตรวจจับเมธอดที่เป็น Top Level
    while ((match = methodsPattern.exec(content)) !== null) {
        const functionCode = getMethodCode(match.index, content);
        if (functionCode && !classPattern.test(content.substring(0, match.index)) &&
            !isInsideConditionalBlock(match.index, content) &&
            !containsToLowerCaseUsage(functionCode) &&
            isTopLevel(match.index, content)) {
            matches.push(match[1]);
        }
    }

    console.log('Detected functions:', matches); // เพิ่มบรรทัดนี้เพื่อตรวจสอบการจับฟังก์ชัน

    return matches;
}

// ฟังก์ชันเพื่อดึงโค้ดของฟังก์ชัน
function getFunctionCode(index: number, content: string): string | null {
    const functionPattern = /(?:public|private)?\s*(?:async\s+)?(?<!constructor\s+)(\w+)\s*\(([^)]*)\)\s*:\s*([^;{]+)?\s*{([\s\S]*?)\s*}/;
    const match = functionPattern.exec(content.substring(index));
    return match ? match[0] : null;
}

// ฟังก์ชันเพื่อดึงโค้ดของฟังก์ชันลูกศร
function getArrowFunctionCode(index: number, content: string): string | null {
    const arrowFunctionPattern = /const\s+(\w+)\s*=\s*\(.*\)\s*=>\s*{([\s\S]*?)\s*}/;
    const match = arrowFunctionPattern.exec(content.substring(index));
    return match ? match[0] : null;
}

// ฟังก์ชันเพื่อดึงโค้ดของเมธอด
function getMethodCode(index: number, content: string): string | null {
    const methodPattern = /\b(\w+)\s*\([^)]*\)\s*:\s*{([\s\S]*?)\s*}/;
    const match = methodPattern.exec(content.substring(index));
    return match ? match[0] : null;
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
    let match: RegExpExecArray | null;

    while ((match = ifElsePattern.exec(before)) !== null) {
        if (index < ifElsePattern.lastIndex) {
            return true;
        }
    }

    return false;
}

// ฟังก์ชันเพื่อเช็คว่าฟังก์ชันนั้นๆ อยู่ในระดับ Top Level หรือไม่
function isTopLevel(index: number, content: string): boolean {
    const lines = content.substring(0, index).split('\n');
    const functionLine = lines.pop(); // แถวที่ฟังก์ชันถูกค้นพบ

    if (!functionLine) return false;

    // ค้นหาออบเจ็กต์ประเภท class หรือ function อื่นๆ ที่อยู่ในบล็อกเดียวกัน
    const topLevelPattern = /^(class|function)\s|\bfunction\s/;
    const isTopLevel = !topLevelPattern.test(functionLine.trim());

    return isTopLevel;
}

function initializeWatch() {
    const files = fs.readdirSync(watchFolder);

    files.forEach(file => {
        const filePath = path.join(watchFolder, file);

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

function promptUser(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function runSpecificTest(testDir: string): Promise<void> {
    const absoluteTestDir = path.resolve(testDir);
    console.log(`Searching for tests in: ${absoluteTestDir}`);

    const testFiles = glob.sync(path.join(absoluteTestDir));

    if (testFiles.length === 0) {
        console.log(`No test files found in: ${absoluteTestDir}`);
        console.log('Skipping test execution.');
        return;
    }

    console.log(`Found ${testFiles.length} test file(s):`, testFiles);

    return new Promise((resolve, reject) => {
        const testPattern = path.posix.join(absoluteTestDir, '**/*.spec.ts').replace(/\\/g, '/');
        const command = `npx playwright test "${testPattern}" --reporter=list`;
        console.log(`Executing command: ${command}`);

        const testProcess = exec(command, (error, stdout, stderr) => {
            if (error) {
                const errorMessage = stderr || 'An error occurred during Playwright testing but no error details were available';
                notifyUser(`Playwright test failed for ${absoluteTestDir}`);
                console.error(`${errorMessage}`);
                reject(error);
                return;
            }
            console.log(stdout);
            resolve();
        });

        testProcess.stdout?.pipe(process.stdout);
        testProcess.stderr?.pipe(process.stderr);
    });
}

const watcher = chokidar.watch(watchFolder, { persistent: true });

watcher.on('add', (filePath) => {
    try {
        if (!filePath.endsWith('.spec.ts') && !filePath.endsWith('.service.ts') && !filePath.endsWith('.module.ts')) {
            const currentContent = fs.readFileSync(filePath, 'utf-8');
            fileContents[filePath] = currentContent;
            componentFunctionMap[filePath] = extractFunctions(currentContent);

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

        if (newAddedFunctions.length > 0 || true) {
            console.log(`New functions detected in ${filePath}: ${newAddedFunctions.join(', ')}`);

            newAddedFunctions.forEach(fn => {
                generatePlaywrightScript(filePath, fn);
                console.log(`Appended test for function ${fn} in ${filePath}`);
                notifyUser(`Test added for function ${fn} in ${filePath}`);
            });

            componentFunctionMap[filePath] = newFunctions;

            const eslintResult = await runESLint(filePath);
            if (eslintResult.errors.length > 0) {
                console.error(`ESLint errors in ${eslintResult.filePath}:`);
                eslintResult.errors.forEach(error => console.error(error));
            }

            // Get the specific test directory for the component
            const componentDir = path.dirname(filePath);
            const parentDir = path.dirname(componentDir);
            const e2eDir = path.join(parentDir, 'E2E-Script').replace(/\\/g, '/');;

            console.log(`Test directory: ${e2eDir}`);

            // Ask user if they want to run all tests or just the specific component test
            const answer = await promptUser('Do you want to run all tests in the modules? (y/n): ');

            if (answer.toLowerCase() === 'y') {
                try {
                    await runPlaywrightTests();
                    console.log('All Playwright tests passed successfully.');
                } catch (testError) {
                    console.error(`Error running all Playwright tests: ${testError}`);
                }
            } else {
                // Run test for the specific component only
                try {
                    await runSpecificTest(e2eDir);
                    console.log(`Playwright tests for ${e2eDir} passed successfully.`);
                } catch (testError) {
                    console.error(`Error running Playwright tests for ${e2eDir}: ${testError}`);
                }
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