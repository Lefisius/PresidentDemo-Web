// notifyUser.ts
import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import { diffLines } from 'diff';
import { config } from 'dotenv';
config();

export function notifyUser(message: string): void {
    // แสดงข้อความแจ้งเตือนใน terminal
    console.log(`[NOTIFICATION]: ${message}`);
}