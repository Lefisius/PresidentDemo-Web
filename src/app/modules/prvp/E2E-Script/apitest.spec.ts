import { test, expect } from '@playwright/test';

test('should fetch and verify data from the API', async ({ page }) => {
  // ดักจับ response จาก API
  page.on('response', async (response) => {
    if (response.url().includes('/api/Adminprvp')) { // ปรับ URL ตาม path ของ API จริงที่ต้องการ
      const jsonResponse = await response.json();
      
      // ข้อมูลที่คาดหวัง
      const expectedData = [
        {"adminNr":1,"presName":"Washington G","vicePresName":"Adams J"},
        {"adminNr":2,"presName":"Washington G","vicePresName":"Adams J"},
        {"adminNr":46,"presName":"Nixon R M","vicePresName":"Agnew S T"},
        {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
        {"adminNr":24,"presName":"Garfield J A","vicePresName":"Arthur C A"},
        {"adminNr":41,"presName":"Truman H S","vicePresName":"Barkley A W"},
        {"adminNr":18,"presName":"Buchanan J","vicePresName":"Breckinridge J C"},
        {"adminNr":4,"presName":"Jefferson T","vicePresName":"Burr A"},
        {"adminNr":49,"presName":"Reagan R","vicePresName":"Bush G"},
        {"adminNr":10,"presName":"Adams J Q","vicePresName":"Calhoun J"},
        {"adminNr":11,"presName":"Jackson A","vicePresName":"Calhoun J"},
        {"adminNr":5,"presName":"Jefferson T","vicePresName":"Clinton G"},
        {"adminNr":6,"presName":"Madison J","vicePresName":"Clinton G"},
        {"adminNr":21,"presName":"Grant U S","vicePresName":"Colfax S"},
        {"adminNr":34,"presName":"Harding W G","vicePresName":"Coolidge C"},
        {"adminNr":36,"presName":"Hoover H C","vicePresName":"Curtis C"},
        {"adminNr":15,"presName":"Polk J K","vicePresName":"Dallas G M"},
        {"adminNr":35,"presName":"Coolidge C","vicePresName":"Dawes C G"},
        {"adminNr":17,"presName":"Pierce F","vicePresName":"De Vane King W R"},
        {"adminNr":30,"presName":"Roosevelt T","vicePresName":"Fairbanks C W"},
        {"adminNr":16,"presName":"Taylor Z","vicePresName":"Fillmore M"},
        {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
        {"adminNr":37,"presName":"Roosevelt F D","vicePresName":"Garner J N"},
        {"adminNr":38,"presName":"Roosevelt F D","vicePresName":"Garner J N"},
        {"adminNr":7,"presName":"Madison J","vicePresName":"Gerry E"},
        {"adminNr":19,"presName":"Lincoln A","vicePresName":"Hamlin H"},
        {"adminNr":25,"presName":"Cleveland G","vicePresName":"Hendricks T A"},
        {"adminNr":28,"presName":"McKinley W","vicePresName":"Hobart G A"},
        {"adminNr":45,"presName":"Johnson L B","vicePresName":"Humphrey H H"},
        {"adminNr":3,"presName":"Adams J","vicePresName":"Jefferson T"},
        {"adminNr":20,"presName":"Lincoln A","vicePresName":"Johnson A"},
        {"adminNr":44,"presName":"Kennedy J F","vicePresName":"Johnson L B"},
        {"adminNr":13,"presName":"Van Buren M","vicePresName":"Johnson R M"},
        {"adminNr":32,"presName":"Wilson W","vicePresName":"Marshall T R"},
        {"adminNr":33,"presName":"Wilson W","vicePresName":"Marshall T R"},
        {"adminNr":48,"presName":"Carter J E","vicePresName":"Mondale W F"},
        {"adminNr":26,"presName":"Harrison B","vicePresName":"Morton L P"},
        {"adminNr":42,"presName":"Eisenhower D D","vicePresName":"Nixon R M"},
        {"adminNr":43,"presName":"Eisenhower D D","vicePresName":"Nixon R M"},
        {"adminNr":47,"presName":"Nixon R M","vicePresName":"Agnew S T"},
        {"adminNr":29,"presName":"McKinley W","vicePresName":"Roosevelt T"},
        {"adminNr":31,"presName":"Taft W H","vicePresName":"Sherman J S"},
        {"adminNr":27,"presName":"Cleveland G","vicePresName":"Stevenson A E"},
        {"adminNr":8,"presName":"Monroe J","vicePresName":"Tompkins D"},
        {"adminNr":9,"presName":"Monroe J","vicePresName":"Tompkins D"},
        {"adminNr":40,"presName":"Roosevelt F D","vicePresName":"Truman H S"},
        {"adminNr":14,"presName":"Harrison W H","vicePresName":"Tyler J"},
        {"adminNr":12,"presName":"Jackson A","vicePresName":"Van Buren M"},
        {"adminNr":39,"presName":"Roosevelt F D","vicePresName":"Wallace H A"},
        {"adminNr":23,"presName":"Hayes R B","vicePresName":"Wheeler W"},
        {"adminNr":22,"presName":"Grant U S","vicePresName":"Wilson H"}
      ];

      // ตรวจสอบว่าข้อมูลจาก API ตรงกับที่คาดหวัง
      expect(jsonResponse).toEqual(expectedData);
    }
  });

  // เรียก page ไปยังหน้าเว็บที่ทำการเรียก API
  await page.goto('http://localhost:4200/Prvp'); // ปรับ URL ตามที่ต้องการ

  // รอให้ API ถูกเรียกและ response กลับมา
  await page.waitForTimeout(1000); // ปรับเวลาตามความเหมาะสม

});
 test('should handle API error correctly', async ({ page }) => {
    // Mock API ให้ส่งค่า error กลับมา
    await page.route('**/api/Adminprvp', (route) => {
      route.abort('failed'); // จำลองสถานการณ์ที่การเรียก API ล้มเหลว
    });

    // จับ log error
    const errorLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorLogs.push(msg.text());
        console.log('Logged error:', msg.text()); // แสดง error ใน console.log
      }
    });

    // เรียก page ไปยังหน้าเว็บที่ทำการเรียก API
    await page.goto('http://localhost:4200/Prvp'); // ปรับ URL ตามที่ต้องการ

    // รอให้ API ถูกเรียกและ error เกิดขึ้น
    await page.waitForTimeout(1000); // ปรับเวลาตามความเหมาะสม

    // ตรวจสอบว่ามี error log ที่คาดหวัง
    expect(errorLogs.some(log => log.includes('Error fetching Adminprvps'))).toBeTruthy();
  });