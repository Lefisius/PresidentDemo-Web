import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreshobbyService {
  private apiUrl = 'http://localhost:9003/api/PresHobby';

  constructor(private http: HttpClient) { }

  getPresHobbys(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  installPrinter(printerName: string): Observable<any> {
    const url = `http://localhost:9003/api/printers/install?name=${printerName}`;
    return this.http.post(url, {}, { responseType: 'text' });
  }

  getAllPrinters(): Observable<any> {
    return this.http.get<any>('http://localhost:9003/api/printers');
  }

  printDocument(file: Blob, printerName: string): Observable<any> {
    const url = 'http://localhost:9003/api/printers/print'; // Ensure this URL matches your backend API
    const formData = new FormData();
    formData.append('file', file, 'document.pdf');
    formData.append('printerName', printerName);
    return this.http.post(url, formData);
  }

}
