// import { test, expect } from '@playwright/test';
// import { TestBed } from '@angular/core/testing';
// import { ElectionComponent } from './../election/election.component';
// import { ElectionService } from './../api/election.service';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { ChangeDetectorRef } from '@angular/core';
// import { of } from 'rxjs';

// // Mock services
// const mockElectionService: Partial<ElectionService> = {
//   getPresElections: () => of([{ electionYear: '2020', candidate: 'John Doe', votes: 500, winnerLoserIndic: 'W' }]),
//   getPrinters: () => of([{ name: 'Printer1', ip: '192.168.1.1', description: 'Office Printer', id: 1 }]),
//   installDriversFromJson: () => of('success'),
//   addPrinter: () => of({}),
//   deletePrinter: () => of('success'),
// };

// const mockNotificationService: Partial<NzNotificationService> = {
//     success: jest.fn((title: string, content: string, options?: NzNotificationDataOptions<{}>): NzNotificationRef => {
//         return {} as NzNotificationRef;
//       }),
//       error: jest.fn((title: string, content: string, options?: NzNotificationDataOptions<{}>): NzNotificationRef => {
//         return {} as NzNotificationRef;
//       }),
//   };
  
// const mockChangeDetectorRef = {
//   detectChanges: () => {},
// } as ChangeDetectorRef;

// test.beforeEach(() => {
//   TestBed.configureTestingModule({
//     declarations: [ElectionComponent],
//     providers: [
//       { provide: ElectionService, useValue: mockElectionService },
//       { provide: NzNotificationService, useValue: mockNotificationService },
//       { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
//     ]
//   }).compileComponents();
// });

// test('loadElections should fetch and set data', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     await component.loadElections();
  
//     expect(component.presidentsData).toHaveLength(1);
//     expect(component.presidentsData[0].candidate).toBe('John Doe');
//   });

//   test('updateDateTime should set current date and time', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     const initialDateTime = component.datetime;
  
//     await new Promise(resolve => setTimeout(resolve, 1100)); // รอเวลา 1.1 วินาที
//     component.updateDateTime();
  
//     expect(component.datetime).not.toBe(initialDateTime);
//   });

//   test('onSearch should filter data correctly', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     component.presidentsData = [
//       { electionYear: '2024', candidate: 'John Doe', votes: 1000, winnerLoserIndic: 'W' },
//       { electionYear: '2024', candidate: 'Jane Smith', votes: 800, winnerLoserIndic: 'L' }
//     ];
//     component.filteredData = [...component.presidentsData];
  
//     component.searchTerm = 'john';
//     component.onSearch();
//     expect(component.filteredData).toHaveLength(1);
//     expect(component.filteredData[0].candidate).toBe('John Doe');
  
//     component.searchTerm = '2024';
//     component.onSearch();
//     expect(component.filteredData).toHaveLength(2);
//   });

//   test('setTableTitle should update table title', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     component.setTableTitle('New Title');
  
//     expect(component.tableTitle).toBe('New Title');
//   });

//   test('addPrinter should add printer and reset fields', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     component.printerName = 'Printer3';
//     component.printerIP = '192.168.1.3';
//     component.printerDescription = 'Test Printer';
//     component.printerLocation = 'Test Location';
//     component.printerPpdBase64 = 'mockBase64';
  
//     const printerForm = { valid: true } as any; // Mock form validity
//     await component.addPrinter(printerForm);
  
//     expect(component.printersData).toHaveLength(2);
//     expect(component.printerName).toBe('');
//     expect(component.printerIP).toBe('');
//     expect(component.printerDescription).toBe('');
//     expect(component.printerLocation).toBe('');
//     expect(component.printerPpdBase64).toBe('');
//   });  

//   test('deletePrinter should remove printer from data', async ({ page }) => {
//     const fixture = TestBed.createComponent(ElectionComponent);
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     component.printersData = [
//       { name: 'Printer1', ip: '192.168.1.1', description: 'Office Printer', id: 1 },
//       { name: 'Printer2', ip: '192.168.1.2', description: 'Meeting Room Printer', id: 2 }
//     ];
  
//     await component.deletePrinter(1);
  
//     expect(component.printersData).toHaveLength(1);
//     expect(component.printersData[0].id).toBe(2);
//   });

//   test('removeDuplicates should filter out duplicate entries', () => {
//     const fixture = TestBed.createComponent(ElectionComponent); 
//     fixture.detectChanges();
  
//     const component = fixture.componentInstance;
//     const data = [
//       { electionYear: '2024', candidate: 'John Doe', votes: 1000, winnerLoserIndic: 'W' },
//       { electionYear: '2024', candidate: 'John Doe', votes: 1000, winnerLoserIndic: 'W' },
//       { electionYear: '2024', candidate: 'Jane Smith', votes: 800, winnerLoserIndic: 'L' }
//     ];
  
//     const result = component.removeDuplicates(data, 'candidate');
//     expect(result).toHaveLength(2);
//     expect(result[0].candidate).toBe('John Doe');
//     expect(result[1].candidate).toBe('Jane Smith');
//   });
  