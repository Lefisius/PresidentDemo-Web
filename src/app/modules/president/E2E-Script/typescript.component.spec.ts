// import { test, expect } from '@playwright/test';
// import { PresidentComponent } from '../president/president.component';
// import { of } from 'rxjs';

// test('Unit Tests for PresidentComponent', async () => {
//   // Mock ของ PresidentService
//   const mockPresidentService = {
//     getPresidents: () => of([
//       { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
//       { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
//     ])
//   };

//   // สร้าง instance ของ PresidentComponent ด้วย mockPresidentService
//   const component = new PresidentComponent(mockPresidentService as any);
//   component.ngOnInit(); // เรียก ngOnInit เพื่อโหลดข้อมูลเริ่มต้น

//   // ทดสอบการอัปเดตเวลา
//   component.updateDateTime();
//   expect(component.datetime).not.toBe('');

//   // ทดสอบการกรองข้อมูลตามคำค้นหา
//   component.searchTerm = 'Adams';
//   component.onSearch();
//   expect(component.filteredData.length).toBe(1);
//   expect(component.filteredData[0].presName).toBe('John Adams');

//   // ทดสอบการลบข้อมูล
//   const originalConfirm = globalThis.confirm;
//   globalThis.confirm = () => true;
//   component.filteredData = [...component.presidentsData];
//   component.deleteRow(0);
//   expect(component.filteredData.length).toBe(1);
//   expect(component.filteredData[0].presName).toBe('Thomas Jefferson');
//   globalThis.confirm = originalConfirm;

//   // ทดสอบการกรองข้อมูลตามช่วงอายุ
//   component.presidentsData = [
//     { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
//     { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
//   ];
//   component.fromAge = '1730';
//   component.toAge = '1740';
//   component.applyFilterByRange();
//   expect(component.filteredData.length).toBe(1);
//   expect(component.filteredData[0].presName).toBe('John Adams');

//   // ทดสอบการตั้งค่า columns
//   component.initColumns();
//   expect(component.listOfColumns.length).toBeGreaterThan(0);
//   expect(component.listOfColumns[0].name).toBe('Name');
//   expect(component.listOfColumns[1].name).toBe('Birth Year');
// });