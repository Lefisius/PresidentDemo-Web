import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrvpService {
  private apiUrl = 'http://localhost:9003/api/Adminprvp';

  constructor(private http: HttpClient) { }

  getAdminprvps(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
