import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrationService {
  private apiUrl = 'http://localhost:9003/api/Administrations';

  constructor(private http: HttpClient) { }

  getAdministrations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
