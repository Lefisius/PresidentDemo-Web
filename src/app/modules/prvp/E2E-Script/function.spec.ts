// // test1111111111111111111111111111111111111111

// // import { test, expect } from '@playwright/test';
// // import { PrvpComponent } from './../prvp/prvp.component';
// // import { PrvpService } from './../api/prvp.service';
// // import { Observable, of } from 'rxjs';

// // // test('should correctly calculate the sum', () => {

// // test.describe('PrvpComponent', () => {
// //         // Mock PrvpService
// //   const mockPrvpService: PrvpService = {
// //     getAdminprvps: (): Observable<any[]> => of([]) // Mocked method, adjust as needed
// //   } as PrvpService;

// //     // Instantiate the component with the mocked service
// //     const component = new PrvpComponent(mockPrvpService);

// //     test('greet with name should return greeting with name', () => {
// //         const result = component.greet('Dorn');
// //         expect(result).toBe('Hello, Dorn!');
// //         console.log(result); // แสดงผลลัพธ์ใน console
// //     });

// //     test('greet without name should return default greeting', () => {
// //         const result = component.greet('');
// //         expect(result).toBe('Hello, Guest!');
// //         console.log(result); // แสดงผลลัพธ์ใน console
// //     });
// // });

// // test2222222222222222222222222222222222222222222

// import { test, expect } from '@playwright/test';
// import { PrvpComponent } from './../prvp/prvp.component';
// import { PrvpService } from './../api/prvp.service';
// import { Observable, of } from 'rxjs';

// test.describe('PrvpComponent', () => {
//     // Mock PrvpService (หรือสร้าง mock ตามที่ต้องการ)
//     const mockPrvpService = {} as PrvpService; // คุณอาจต้องเพิ่มวิธีการที่จำเป็นใน mock นี้

//     // สร้าง instance ของ component
//     const component = new PrvpComponent(mockPrvpService);

//     test('getLength("hello") should return 5', () => {
//         const result = component.getLength("hello"); // เรียกใช้ getLength ผ่าน instance
//         expect(result).toBe(5);
//         console.log(result); // แสดงผลลัพธ์ใน console
//     });

//     test('getLength("") should throw an error', () => {
//         try {
//             component.getLength(""); // เรียกใช้ getLength ผ่าน instance
//         } catch (error) {
//             expect((error as Error).message).toBe('Invalid input');
//             console.log((error as Error).message); // แสดง error message ใน console
//         }
//     });
// });




