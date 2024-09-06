// // import 'jest-preset-angular/setup-jest';
// import 'zone.js';
// import 'zone.js/testing';

// import { getTestBed } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// // Initialize the Angular testing environment.
// getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
// import 'jest-preset-angular/setup-jest';
// import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

// เพิ่ม global mocks สำหรับ Angular ถ้าจำเป็น
Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});