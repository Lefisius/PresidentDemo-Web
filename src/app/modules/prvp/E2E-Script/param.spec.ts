import { test, expect } from '@playwright/test';
import { PrvpComponent } from './../prvp/prvp.component';
import { PrvpService } from './../api/prvp.service';
import { Observable, of } from 'rxjs';

test('should correctly calculate the sum', () => {
  // Mock PrvpService
  const mockPrvpService: PrvpService = {
    getAdminprvps: (): Observable<any[]> => of([]) // Mocked method, adjust as needed
  } as PrvpService;

  // Instantiate the component with the mocked service
  const component = new PrvpComponent(mockPrvpService);

  // Test the calculateSum function
  const result = component.calculateSum(1, 7);
  expect(result).toBe(8);
  console.log(result);
});
