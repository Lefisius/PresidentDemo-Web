import { test, expect } from '@playwright/test';
import { PresidentComponent } from '../president/president.component';
import { of } from 'rxjs';

test.describe('PresidentComponent Tests', () => {
    let component: PresidentComponent;
  
    // Mock PresidentService
    const mockPresidentService = {
      getPresidents: () => of([
        { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
        { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
      ])
    };
  
    test.beforeEach(() => {
      // สร้าง instance ของ PresidentComponent ด้วย mockPresidentService
      component = new PresidentComponent(mockPresidentService as any);
      component.ngOnInit(); // เรียก ngOnInit เพื่อโหลดข้อมูลเริ่มต้น
    });
  
    test('ควรอัปเดตเวลาเมื่อเรียก updateDateTime', () => {
      component.updateDateTime();
      expect(component.datetime).not.toBe('');
    });
  
    test('ควรกรองข้อมูลตามคำค้นหา', () => {
      component.searchTerm = 'Adams';
      component.onSearch();
      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].presName).toBe('John Adams');
    });
  
    test('ควรลบข้อมูลเมื่อเรียก deleteRow', () => {
      // Mock confirm to always return true
      const originalConfirm = globalThis.confirm;
      globalThis.confirm = () => true;
  
      component.filteredData = [...component.presidentsData];
      component.deleteRow(0);
      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].presName).toBe('Thomas Jefferson');
  
      // Restore original confirm
      globalThis.confirm = originalConfirm;
    });
  
    test('ควรกรองข้อมูลตามช่วงอายุ', () => {
      component.presidentsData = [
        { presName: 'John Adams', birthYr: 1735, yrsServ: 8, deathAge: 90, party: 'Federalist', stateBorn: 'Massachusetts' },
        { presName: 'Thomas Jefferson', birthYr: 1743, yrsServ: 8, deathAge: 83, party: 'Democratic-Republican', stateBorn: 'Virginia' },
      ];
      component.fromAge = '1730';
      component.toAge = '1740';
      component.applyFilterByRange();
      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].presName).toBe('John Adams');
    });
  
    test('ควรตั้งค่า columns เมื่อเรียก initColumns', () => {
      component.initColumns();
      expect(component.listOfColumns.length).toBeGreaterThan(0);
      expect(component.listOfColumns[0].name).toBe('Name');
      expect(component.listOfColumns[1].name).toBe('Birth Year');
    });
});
