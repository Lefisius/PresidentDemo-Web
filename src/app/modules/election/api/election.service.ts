import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private apiUrl = 'http://localhost:9003/api/Election';
  private printerApiUrl = 'http://localhost:9003/api/drivers';
  private installDriversApiUrl = 'http://localhost:9003/api/printersjson/install';

  constructor(private http: HttpClient) { }

  getPresElections(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPrinters(): Observable<any> {
    return this.http.get<any>(this.printerApiUrl);
  }

  addPrinter(name: string, ip: string, description: string, ppdBase64: string, location: string): Observable<any> {
    const body = { name, ip, description, ppdBase64, location };
    return this.http.post(`${this.printerApiUrl}/add`, body); // <- ใช้ URL ที่ถูกต้อง
  }

  getVulnerableCORSData(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  }

  getSensitiveDataExposure(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login?username=admin&password=123456`);
  }

  submitCSRFVulnerableForm(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vulnerable-endpoint`, {
      username: 'admin',
      password: '123456'
    });
  }

  addPrinterDriver(file: File, name: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    return this.http.post<any>(`${this.printerApiUrl}/install`, formData);
  }

  installDriversFromJson(): Observable<any> {
    return this.http.post<any>(this.installDriversApiUrl, {}, { responseType: 'text' as 'json' });
  }

  deletePrinter(id: number): Observable<string> {
    return this.http.delete<string>(`${this.printerApiUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }
}
