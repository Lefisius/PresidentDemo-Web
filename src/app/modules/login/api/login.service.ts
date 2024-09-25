import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:9003/api/login';  // URL ของ Spring Boot backend

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post<any>(this.apiUrl, body);  // ส่ง request ไปยัง backend
  }
}
