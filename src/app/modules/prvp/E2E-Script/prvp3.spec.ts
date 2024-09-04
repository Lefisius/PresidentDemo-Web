// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
// import { PrvpComponent } from './../prvp/prvp.component';
// import { PrvpService } from './../api/prvp.service';
// import { beforeEach, describe } from 'node:test';

// describe('PrvpComponent', () => { 
//   let component: PrvpComponent;
//   let fixture: ComponentFixture<PrvpComponent>;
//   let prvpServiceMock: any;

//   beforeEach(async () => {
//     prvpServiceMock = {
//       getAdminprvps: jest.fn()
//     };

//     await TestBed.configureTestingModule({
//       declarations: [PrvpComponent],
//       providers: [
//         { provide: PrvpService, useValue: prvpServiceMock }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PrvpComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Ensure initial data binding
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should update datetime correctly', () => {
//     component.updateDateTime();
//     expect(component.datetime).not.toBe('');
//   });

//   it('should load admin data correctly', async () => {
//     const mockData = [
//       { adminNr: '1', presName: 'President1', vicePresName: 'VicePresident1' }
//     ];
//     prvpServiceMock.getAdminprvps.mockReturnValue(of(mockData));

//     await component.loadAdminprvps();

//     expect(prvpServiceMock.getAdminprvps).toHaveBeenCalled();
//     expect(component.presidentsData).toEqual(mockData);
//     expect(component.filteredData).toEqual(mockData);
//   });

//   it('should filter data correctly based on search term', () => {
//     component.presidentsData = [
//       { adminNr: '1', presName: 'John', vicePresName: 'Doe' },
//       { adminNr: '2', presName: 'Jane', vicePresName: 'Smith' }
//     ];
//     component.searchTerm = 'Jane';
//     component.onSearch();
//     expect(component.filteredData.length).toBe(1);
//     expect(component.filteredData[0].presName).toBe('Jane');
//   });

//   it('should delete a row correctly', () => {
//     component.presidentsData = [
//       { adminNr: '1', presName: 'John', vicePresName: 'Doe' },
//       { adminNr: '2', presName: 'Jane', vicePresName: 'Smith' }
//     ];
//     component.filteredData = [...component.presidentsData];
//     component.deleteRow('1');
//     expect(component.presidentsData.length).toBe(1);
//     expect(component.filteredData.length).toBe(1);
//     expect(component.presidentsData[0].adminNr).toBe('2');
//   });
// });
