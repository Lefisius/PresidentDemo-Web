// import { test, expect, Page } from '@playwright/test';
// import { ElectionComponent } from './../election/election.component';
// import { ElectionService } from './../api/election.service';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { of, throwError } from 'rxjs';

import { test, expect, Page, TestInfo } from '@playwright/test';
import { ElectionComponent } from './../election/election.component';
import { ElectionService } from '../api/election.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';


class MockChangeDetectorRef extends ChangeDetectorRef {
    markForCheck(): void {}
    detach(): void {}
    detectChanges(): void {}
    checkNoChanges(): void {}
    reattach(): void {}
  }
// Mock data
const mockElections = [
    { electionYear: '2020', candidate: 'John Doe', votes: '1000000', winnerLoserIndic: 'Winner' },
    { electionYear: '2016', candidate: 'Jane Smith', votes: '900000', winnerLoserIndic: 'Loser' },
  ];
  
  const mockPrinters = [
    { id: 1, name: 'Printer1', ip: '192.168.1.1', description: 'Office Printer', location: 'Main Office' },
    { id: 2, name: 'Printer2', ip: '192.168.1.2', description: 'Home Printer', location: 'Home' },
  ];
  
  // Mock ElectionService
  class MockElectionService {
    getPresElections() {
      return of(mockElections);
    }
  
    getPrinters() {
      return of(mockPrinters);
    }
  
    addPrinter(name: string, ip: string, description: string, ppdBase64: string, location: string) {
      return of({ success: true });
    }
  
    deletePrinter(id: number) {
      return of('Printer deleted successfully');
    }
  
    installDriversFromJson() {
      return of({ success: true });
    }
  }
  
  // Mock NzNotificationService
  class MockNotificationService {
    successCalled = false;
    errorCalled = false;
    lastSuccessMessage = '';
    lastErrorMessage = '';
  
    success(message: string, description: string) {
      this.successCalled = true;
      this.lastSuccessMessage = message;
    }
  
    error(message: string, description: string) {
      this.errorCalled = true;
      this.lastErrorMessage = message;
    }
  }
  
  test.describe('ElectionComponent', () => {
    let component: ElectionComponent;
    let mockElectionService: MockElectionService;
    let mockNotificationService: MockNotificationService;
  
    test.beforeEach(() => {
      mockElectionService = new MockElectionService();
      mockNotificationService = new MockNotificationService();
  
      component = new ElectionComponent(
        mockElectionService as unknown as ElectionService,
        mockNotificationService as unknown as NzNotificationService,
        // {} as any // Mock ChangeDetectorRef
        new MockChangeDetectorRef()
      );
    });
  
    test('should load elections and printers on init', async () => {
      await component.ngOnInit();
      expect(component.presidentsData).toEqual(mockElections);
      expect(component.printersData).toEqual(mockPrinters);
    });
  
    test('should filter data on search', async () => {
      component.presidentsData = mockElections;
      component.searchTerm = 'John';
      component.onSearch();
      expect(component.filteredData.length).toBe(1);
      expect(component.filteredData[0].candidate).toBe('John Doe');
    });
  
    test('should add printer successfully', async () => {
      const form = { valid: true } as any; // Mock NgForm
      component.printerName = 'TestPrinter';
      component.printerIP = '192.168.1.3';
      component.printerDescription = 'Test Description';
      component.printerLocation = 'Test Location';
      component.printerPpdBase64 = 'base64string';
  
      await component.addPrinter(form);
  
      expect(mockNotificationService.successCalled).toBeTruthy();
      expect(mockNotificationService.lastSuccessMessage).toBe('Success');
    });
  
    test('should handle error when adding printer', async () => {
      const form = { valid: true } as any; // Mock NgForm
      component.printerName = 'TestPrinter';
      component.printerIP = '192.168.1.3';
      component.printerDescription = 'Test Description';
      component.printerLocation = 'Test Location';
      component.printerPpdBase64 = 'base64string';
  
      // Mock error response
      mockElectionService.addPrinter = () => throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' }));
  
      await component.addPrinter(form);
  
      expect(mockNotificationService.errorCalled).toBeTruthy();
      expect(mockNotificationService.lastErrorMessage).toBe('Error');
    });
  
    test('should delete printer successfully', async () => {
      await component.deletePrinter(1);
      expect(mockNotificationService.successCalled).toBeTruthy();
      expect(mockNotificationService.lastSuccessMessage).toBe('Success');
    });
  
    test('should handle error when deleting printer', async () => {
      // Mock error response
      mockElectionService.deletePrinter = () => throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' }));
  
      await component.deletePrinter(999); // Non-existent ID
  
      expect(mockNotificationService.errorCalled).toBeTruthy();
      expect(mockNotificationService.lastErrorMessage).toBe('Error');
    });
  
    test('should install drivers from JSON successfully', async () => {
      await component.installDriversFromJson();
      expect(mockNotificationService.successCalled).toBeTruthy();
      expect(mockNotificationService.lastSuccessMessage).toBe('Success');
    });
  
    test('should handle error when installing drivers', async () => {
      // Mock error response
      mockElectionService.installDriversFromJson = () => throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error' }));
  
      await component.installDriversFromJson();
  
      expect(mockNotificationService.errorCalled).toBeTruthy();
      expect(mockNotificationService.lastErrorMessage).toBe('Error');
    });
  });