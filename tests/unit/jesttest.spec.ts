// tests/example.spec.ts
// import { add } from './../../src/app/modules/prvp/prvp/prvp.component';
// test('adds 1 + 2 to equal 3', () => {
//   expect(add(1, 2)).toBe(3);
// });

// test('adds -1 + 2 to equal 1', () => {
//   expect(add(-1, 2)).toBe(1);
// });


import { PrvpComponent } from './../../src/app/modules/prvp/prvp/prvp.component';
import { PrvpService } from './../../src/app/modules/prvp/api/prvp.service';
import { Observable, of } from 'rxjs';

test('adds 1 + 2 to equal 3', () => {
  const mockPrvpService: PrvpService = {
    getAdminprvps: (): Observable<any[]> => of([]) // Mocked method, adjust as needed
  } as PrvpService;

  // Instantiate the component with the mocked service
  const component = new PrvpComponent(mockPrvpService);

  const result = component.add(1, 2);
  expect(result).toBe(3);

  const result2 = component.add(-1, 2);
  expect(result2).toBe(1);

  console.log(result);
  console.log(result2);
});

