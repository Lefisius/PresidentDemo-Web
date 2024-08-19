// watch-and-test.ts
import * as chokidar from 'chokidar';
import * as fs from 'fs';
import { notifyUser } from './notifyUser';
import { generatePlaywrightScript } from './generatePlaywrightScript';
import { runESLint } from './runESLint';

const watchFolder = './src';
const fileContents: { [key: string]: string } = {};

const watcher = chokidar.watch(watchFolder, { persistent: true });

watcher.on('add', (filePath) => {
    try {
        const currentContent = fs.readFileSync(filePath, 'utf-8');
        fileContents[filePath] = currentContent;
        console.log(`File ${filePath} is added and initialized.`);
    } catch (error) {
        console.error(`Failed to read file ${filePath}: ${error}`);
    }
});

watcher.on('change', async (filePath) => {
    console.log(`File ${filePath} has been changed`);

    try {
        const currentContent = fs.readFileSync(filePath, 'utf-8');

        if (fileContents[filePath] === undefined) {
            fileContents[filePath] = currentContent;
            console.log(`File ${filePath} initialized on change.`);
            return;
        }

        const oldContent = fileContents[filePath];
        if (oldContent !== currentContent) {
            console.log(`File ${filePath} has been updated`);
            const eslintErrors = await runESLint(filePath);
            await notifyUser(filePath, oldContent, currentContent, eslintErrors);
            generatePlaywrightScript(filePath);

            fileContents[filePath] = currentContent;
        }
    } catch (error) {
        console.error(`Failed to read file ${filePath}: ${error}`);
    }
});

process.on('SIGINT', () => {
    watcher.close();
    console.log('Watcher closed');
    process.exit();
});