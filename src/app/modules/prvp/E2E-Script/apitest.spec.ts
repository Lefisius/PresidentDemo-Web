import { test, expect } from '@playwright/test';

test('should fetch and display correct data from API', async ({ page }) => {
  // Intercept the network response
  page.on('response', async (response) => {
    if (response.url().includes('/api/Adminprvp')) { // Adjust the condition based on your API endpoint
      const jsonResponse = await response.json();

      // Log the response data
      console.log('API Response:', jsonResponse);

      // Perform your checks
      expect(jsonResponse).toEqual([
        
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

      ]);
    }
  });

//   // Navigate to the page that makes the API call
//   await page.goto('http://localhost:4200/Prvp');

//   // Trigger the API call if it is not automatically called
//   // await page.click('button:has-text("Load Data")');

//   // Optionally, verify that the data is displayed correctly in the UI
//   const rows = await page.locator('table tbody tr');
//   await expect(rows).toHaveCount(2);

//   // Verify first row data
//   const firstRowData = await rows.first().locator('td').allTextContents();
//   expect(firstRowData).toEqual(['1', 'John Doe', 'Jane Smith']);

//   // Verify second row data
//   const secondRowData = await rows.nth(1).locator('td').allTextContents();
//   expect(secondRowData).toEqual(['2', 'Alice Johnson', 'Bob Brown']);
});
