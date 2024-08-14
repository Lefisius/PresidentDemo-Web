// import { test, expect, Page } from '@playwright/test';

// // Define the type for entityType explicitly
// type EntityType = 'function' | 'module' | 'class' | 'object';

// async function checkNewEntity(
//   page: Page,
//   entityName: string,
//   entityType: EntityType = 'function'
// ) {
//   const isEntityDefined = await page.evaluate(
//     ({ entityName, entityType }) => {
//       if (entityType === 'module' || entityType === 'object') {
//         return !!(window as any)[entityName];
//       } else if (entityType === 'function' || entityType === 'class') {
//         return typeof (window as any)[entityName] === 'function';
//       }
//       return false;
//     },
//     { entityName, entityType }
//   );

//   if (isEntityDefined) {
//     throw new Error(`New ${entityType} "${entityName}" detected!`);
//   } else {
//     console.log(`No new ${entityType} "${entityName}" detected. Everything is normal.`);
//   }
// }

// test('detect new entities in the application', async ({ page }) => {
//     // เข้าสู่หน้าแอปพลิเคชัน
//     await page.goto('http://localhost:4200/Dash');
  
//     // รายการเอนทิตีที่ต้องการตรวจสอบ
//     const entitiesToCheck: { name: string; type: EntityType }[] = [
//       { name: 'NewModule', type: 'module' },
//       { name: 'button-two', type: 'class' },
//       { name: 'NewService', type: 'function' },
//     ];
  
//     for (const entity of entitiesToCheck) {
//       await checkNewEntity(page, entity.name, entity.type);
//     }
//   });

// test('Detect new entities-2', async ({ page }) => {
//     await page.goto('http://localhost:4200/State');
  
//     // ตรวจจับฟังก์ชันใหม่
//     await checkNewEntity(page, 'newFunction', 'function');
  
//     // ตรวจจับโมดูลใหม่
//     await checkNewEntity(page, 'newModule', 'module');
  
//     // ตรวจจับคลาสใหม่
//     await checkNewEntity(page, 'NewClass', 'class');
//   });