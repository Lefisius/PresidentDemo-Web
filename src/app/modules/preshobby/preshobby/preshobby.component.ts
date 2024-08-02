import { Component, OnInit } from '@angular/core';
import { PreshobbyService } from '../api/preshobby.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preshobby',
  templateUrl: './preshobby.component.html',
  styleUrls: ['./preshobby.component.scss']
})
export class PreshobbyComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'PresHobby';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];
  printers: any[] = [];
  selectedPrinter: string = '';
  printerName: string = '';
  printerIP: string = '';
  selectedFile: File | null = null; // กำหนดค่าเริ่มต้นเป็น null

  constructor(private preshobbyService: PreshobbyService, private http: HttpClient) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadPresHobbys();
    this.loadPrinters();
  }

  loadPresHobbys(): void {
    this.preshobbyService.getPresHobbys().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error('Error fetching PresHobbys:', error);
    });
  }

  loadPrinters(): void {
    this.preshobbyService.getAllPrinters().subscribe(data => {
      console.log('Printers received from API:', data);
      this.printers = data;
    }, error => {
      console.error('Error fetching printers:', error);
    });
  }

  updateDateTime(): void {
    const now = new Date();
    this.datetime = now.toLocaleString();
  }

  onSearch(): void {
    console.log('Search term:', this.searchTerm);
    if (this.searchTerm.trim() === '') {
      this.filteredData = [...this.presidentsData];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.presidentsData.filter(president => {
        const presName = president.presName ? String(president.presName).toLowerCase() : '';
        const hobby = president.hobby ? String(president.hobby).toLowerCase() : '';

        return presName.includes(term) || hobby.includes(term);
      });
    }
    console.log('Filtered data:', this.filteredData);
  }

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }

  installPrinter(): void {
    if (this.selectedPrinter) {
      this.preshobbyService.installPrinter(this.selectedPrinter).subscribe(response => {
        console.log('Printer installation response:', response);
        alert('Printer installed successfully!');
      }, error => {
        console.error('Error installing printer:', error);
        alert('Failed to install printer.');
      });
    } else {
      alert('Please select a printer.');
    }
  }

  printDocument(): void {
    if (this.selectedPrinter) {
      // Assuming you have a document to print, replace with actual file or document logic
      const documentToPrint = new Blob(["Sample document content"], { type: 'application/pdf' });

      this.preshobbyService.printDocument(documentToPrint, this.selectedPrinter).subscribe(response => {
        console.log('Print response:', response);
        alert('Print job submitted successfully!');
      }, error => {
        console.error('Error submitting print job:', error);
        alert('Failed to submit print job.');
      });
    } else {
      alert('Please select a printer.');
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUploadPPD(): void {
    if (this.selectedFile && this.printerName && this.printerIP) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('printerName', this.printerName);
      formData.append('printerIP', this.printerIP);

      this.preshobbyService.installLocalPPDFile(formData).subscribe(response => {
        console.log('PPD install response:', response);
        alert('Printer driver installed successfully!');
        // รีเซ็ตฟิลด์หลังการติดตั้งสำเร็จ
        this.printerName = '';
        this.printerIP = '';
        this.selectedFile = null;
        // อัปเดต UI ให้รีเซ็ต
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ''; // รีเซ็ตค่าของ input type="file"
        }
      }, error => {
        console.error('Error installing PPD:', error);
        alert('Failed to install printer driver.');
      });
    } else {
      alert('Please provide all required fields and select a file.');
    }
  }
}