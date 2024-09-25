import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-vulnerabilities',
  templateUrl: './test-vulnerabilities.component.html',
})
export class TestVulnerabilitiesComponent {
  constructor(private http: HttpClient) {}

  // SQL Injection Example
  public vulnerableSQLInjection(userInput: string) {
    const query = `SELECT * FROM users WHERE username = '${userInput}'`; // ช่องโหว่
    this.http.get(`/api/users?query=${encodeURIComponent(query)}`).subscribe(response => {
      console.log('User data:', response);
    });
  }

  // Insecure Direct Object Reference (IDOR) Example
  public vulnerableIDOR(userId: number) {
    this.http.get(`/api/users/${userId}`).subscribe(response => {
      console.log('User data:', response);
    });
  }
}
