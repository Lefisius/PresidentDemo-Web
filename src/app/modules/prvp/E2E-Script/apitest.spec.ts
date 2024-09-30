// // import { test, expect } from '@playwright/test';
// // import { PrvpComponent } from './../prvp/prvp.component';
// // import { PrvpService } from './../api/prvp.service';
// // import { Observable, of } from 'rxjs';

// // test.describe('PrvpComponent deleteRow function tests', () => {
// //   let component: PrvpComponent;
// //   let mockPrvpService: PrvpService;

// //   test.beforeEach(() => {
// //     // Mock PrvpService
// //     mockPrvpService = {
// //       getAdminprvps: () => of([]) // Mocked method, adjust as needed
// //     } as PrvpService;

// //     // Instantiate the component with the mocked service
// //     component = new PrvpComponent(mockPrvpService);

// //     // Set initial data
// //     component.presidentsData = [
// //       { "adminNr": "1", "presName": "Washington G", "vicePresName": "Adams J" },
// //       { "adminNr": "2", "presName": "Jefferson T", "vicePresName": "Burr A" },
// //       { "adminNr": "3", "presName": "Lincoln A", "vicePresName": "Hamlin H" }
// //     ];
// //     component.filteredData = [...component.presidentsData];
// //   });

// // test('should fetch and verify data from the API', async ({ page }) => {
// //   // ดักจับ response จาก API
// //   page.on('response', async (response) => {
// //     if (response.url().includes('/api/Adminprvp')) { // ปรับ URL ตาม path ของ API จริงที่ต้องการ
// //       const jsonResponse = await response.json();
      
// //       // ข้อมูลที่คาดหวัง
// //       const expectedData = [
// //         {"adminNr":1,"presName":"Washington G","vicePresName":"Adams J"},
// //         {"adminNr":2,"presName":"Washington G","vicePresName":"Adams J"},
// //         {"adminNr":46,"presName":"Nixon R M","vicePresName":"Agnew S T"},
// //         {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
// //         {"adminNr":24,"presName":"Garfield J A","vicePresName":"Arthur C A"},
// //         {"adminNr":41,"presName":"Truman H S","vicePresName":"Barkley A W"},
// //         {"adminNr":18,"presName":"Buchanan J","vicePresName":"Breckinridge J C"},
// //         {"adminNr":4,"presName":"Jefferson T","vicePresName":"Burr A"},
// //         {"adminNr":49,"presName":"Reagan R","vicePresName":"Bush G"},
// //         {"adminNr":10,"presName":"Adams J Q","vicePresName":"Calhoun J"},
// //         {"adminNr":11,"presName":"Jackson A","vicePresName":"Calhoun J"},
// //         {"adminNr":5,"presName":"Jefferson T","vicePresName":"Clinton G"},
// //         {"adminNr":6,"presName":"Madison J","vicePresName":"Clinton G"},
// //         {"adminNr":21,"presName":"Grant U S","vicePresName":"Colfax S"},
// //         {"adminNr":34,"presName":"Harding W G","vicePresName":"Coolidge C"},
// //         {"adminNr":36,"presName":"Hoover H C","vicePresName":"Curtis C"},
// //         {"adminNr":15,"presName":"Polk J K","vicePresName":"Dallas G M"},
// //         {"adminNr":35,"presName":"Coolidge C","vicePresName":"Dawes C G"},
// //         {"adminNr":17,"presName":"Pierce F","vicePresName":"De Vane King W R"},
// //         {"adminNr":30,"presName":"Roosevelt T","vicePresName":"Fairbanks C W"},
// //         {"adminNr":16,"presName":"Taylor Z","vicePresName":"Fillmore M"},
// //         {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
// //         {"adminNr":37,"presName":"Roosevelt F D","vicePresName":"Garner J N"},
// //         {"adminNr":38,"presName":"Roosevelt F D","vicePresName":"Garner J N"},
// //         {"adminNr":7,"presName":"Madison J","vicePresName":"Gerry E"},
// //         {"adminNr":19,"presName":"Lincoln A","vicePresName":"Hamlin H"},
// //         {"adminNr":25,"presName":"Cleveland G","vicePresName":"Hendricks T A"},
// //         {"adminNr":28,"presName":"McKinley W","vicePresName":"Hobart G A"},
// //         {"adminNr":45,"presName":"Johnson L B","vicePresName":"Humphrey H H"},
// //         {"adminNr":3,"presName":"Adams J","vicePresName":"Jefferson T"},
// //         {"adminNr":20,"presName":"Lincoln A","vicePresName":"Johnson A"},
// //         {"adminNr":44,"presName":"Kennedy J F","vicePresName":"Johnson L B"},
// //         {"adminNr":13,"presName":"Van Buren M","vicePresName":"Johnson R M"},
// //         {"adminNr":32,"presName":"Wilson W","vicePresName":"Marshall T R"},
// //         {"adminNr":33,"presName":"Wilson W","vicePresName":"Marshall T R"},
// //         {"adminNr":48,"presName":"Carter J E","vicePresName":"Mondale W F"},
// //         {"adminNr":26,"presName":"Harrison B","vicePresName":"Morton L P"},
// //         {"adminNr":42,"presName":"Eisenhower D D","vicePresName":"Nixon R M"},
// //         {"adminNr":43,"presName":"Eisenhower D D","vicePresName":"Nixon R M"},
// //         {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
// //         {"adminNr":29,"presName":"McKinley W","vicePresName":"Roosevelt T"},
// //         {"adminNr":31,"presName":"Taft W H","vicePresName":"Sherman J S"},
// //         {"adminNr":27,"presName":"Cleveland G","vicePresName":"Stevenson A E"},
// //         {"adminNr":8,"presName":"Monroe J","vicePresName":"Tompkins D"},
// //         {"adminNr":9,"presName":"Monroe J","vicePresName":"Tompkins D"},
// //         {"adminNr":40,"presName":"Roosevelt F D","vicePresName":"Truman H S"},
// //         {"adminNr":14,"presName":"Harrison W H","vicePresName":"Tyler J"},
// //         {"adminNr":12,"presName":"Jackson A","vicePresName":"Van Buren M"},
// //         {"adminNr":39,"presName":"Roosevelt F D","vicePresName":"Wallace H A"},
// //         {"adminNr":23,"presName":"Hayes R B","vicePresName":"Wheeler W"},
// //         {"adminNr":22,"presName":"Grant U S","vicePresName":"Wilson H"}
// //       ];

// //       // ตรวจสอบว่าข้อมูลจาก API ตรงกับที่คาดหวัง
// //       expect(jsonResponse).toEqual(expectedData);
// //     }
// //   });

// //   // เรียก page ไปยังหน้าเว็บที่ทำการเรียก API
// //   await page.goto('http://localhost:4200/Prvp'); // ปรับ URL ตามที่ต้องการ

// //   // รอให้ API ถูกเรียกและ response กลับมา
// //   await page.waitForTimeout(1000); // ปรับเวลาตามความเหมาะสม

// // });
// //  test('should handle API error correctly', async ({ page }) => {
// //     // Mock API ให้ส่งค่า error กลับมา
// //     await page.route('**/api/Adminprvp', (route) => {
// //       route.abort('failed'); // จำลองสถานการณ์ที่การเรียก API ล้มเหลว
// //     });

// //     // จับ log error
// //     const errorLogs: string[] = [];
// //     page.on('console', (msg) => {
// //       if (msg.type() === 'error') {
// //         errorLogs.push(msg.text());
// //         console.log('Logged error:', msg.text()); // แสดง error ใน console.log
// //       }
// //     });

// //     // เรียก page ไปยังหน้าเว็บที่ทำการเรียก API
// //     await page.goto('http://localhost:4200/Prvp'); // ปรับ URL ตามที่ต้องการ

// //     // รอให้ API ถูกเรียกและ error เกิดขึ้น
// //     await page.waitForTimeout(1000); // ปรับเวลาตามความเหมาะสม

// //     // ตรวจสอบว่ามี error log ที่คาดหวัง
// //     expect(errorLogs.some(log => log.includes('Error fetching Adminprvps'))).toBeTruthy();
// //   });


// //   test('should delete a row correctly from presidentsData and filteredData', () => {
// //     // Spy on console.log
// //     const logs: string[] = [];
// //     console.log = (...args) => logs.push(args.join(' '));

// //     // Call the deleteRow function
// //     component.deleteRow("2");

// //     // Check that the row with adminNr "2" has been removed
// //     expect(component.presidentsData.length).toBe(2);
// //     expect(component.filteredData.length).toBe(2);  // อยากให้พังลองเปลี่ยน number

// //     expect(component.presidentsData.some(president => president.adminNr === "2")).toBeFalsy();
// //     expect(component.filteredData.some(president => president.adminNr === "2")).toBeFalsy();

// //     // Verify console log outputs
// //     expect(logs.some(log => log.includes('Row deleted with adminNr: 2'))).toBeTruthy();
// //     expect(logs.some(log => log.includes('Updated data:'))).toBeTruthy();
// //   });

// //   test('should log the updated presidentsData after deletion', () => {
// //     // Spy on console.log
// //     const logs: string[] = [];
// //     console.log = (...args) => logs.push(args.join(' '));

// //     // Call the deleteRow function
// //     component.deleteRow("1");                                                                          // อยากให้พังลองเปลี่ยน number

// //     // Check that the row with adminNr "1" has been removed
// //     expect(component.presidentsData.some(president => president.adminNr === "1")).toBeFalsy();

// //     // Verify console log outputs
// //     expect(logs.some(log => log.includes('Row deleted with adminNr: 1'))).toBeTruthy(); 
// //     expect(logs.some(log => log.includes('Updated data:'))).toBeTruthy();

// //     // Verify that the updated data is correct
// //     const expectedUpdatedData = [
// //       { "adminNr": "2", "presName": "Jefferson T", "vicePresName": "Burr A" },
// //       { "adminNr": "3", "presName": "Lincoln A", "vicePresName": "Hamlin H" }
// //     ];
// //     // expect(logs.some(log => log.includes(JSON.stringify(expectedUpdatedData)))).toBeTruthy();
// //   });
// // });



// import { test, expect } from '@playwright/test';
// import { PrvpComponent } from './../prvp/prvp.component';
// import { PrvpService } from './../api/prvp.service';
// import { Observable, of } from 'rxjs';

// // Mock PrvpService for the test
// class MockPrvpService {
//   searchPresidents(term: string): Observable<any[]> {
//     const mockData = [
//       { "adminNr": "1", "presName": "Washington G", "vicePresName": "Adams J" },
//       { "adminNr": "2", "presName": "Jefferson T", "vicePresName": "Burr A" },
//       { "adminNr": "3", "presName": "Lincoln A", "vicePresName": "Hamlin H" }
//     ];
//     const filteredData = mockData.filter(president =>
//       president.adminNr.toLowerCase().includes(term.toLowerCase()) ||
//       president.presName.toLowerCase().includes(term.toLowerCase()) ||
//       president.vicePresName.toLowerCase().includes(term.toLowerCase())
//     );
//     return of(filteredData);
//   }
// }

// test.describe('PrvpComponent onSearch function console output tests', () => {
//   test('should log the correct filtered data to the console', async ({ page }) => {
//     // Navigate to the page containing the PrvpComponent
//     await page.goto('http://localhost:4200/Prvp'); // Adjust URL as needed

//     // Set up console logging interception
//     const consoleMessages: string[] = [];
//     page.on('console', msg => {
//       if (msg.type() === 'log') {
//         consoleMessages.push(msg.text());
//       }
//     });

//     // Set a search term and trigger the search via browser context
//     await page.evaluate(() => {
//       const component = (window as any).angularComponentInstance; // Ensure this is the correct way to access your component
//       if (component) {
//         component.searchTerm = 'Jefferson';
//         component.onSearch();
//       } else {
//         console.error('Component not found');
//       }
//     });

//     // Wait for asynchronous operations to complete
//     await page.waitForTimeout(1000); // Adjust timeout if necessary

//     // Debug the captured console messages
//     console.log('Captured console messages:', consoleMessages);

//     // Verify console log outputs
//     expect(consoleMessages).toContain('Search term: Jefferson');
//     expect(consoleMessages).toContain('Filtered data:');

//     // Extract the filtered data from the log message
//     const filteredDataLog = consoleMessages.find(log => log.startsWith('Filtered data:')) || '';
//     const filteredDataText = filteredDataLog.replace('Filtered data:', '').trim();

//     // Expected filtered data
//     const expectedFilteredData = JSON.stringify([
//       { "adminNr": "2", "presName": "Jefferson T", "vicePresName": "Burr A" }
//     ]);

//     expect(filteredDataText).toBe(expectedFilteredData);
//   });
// });
