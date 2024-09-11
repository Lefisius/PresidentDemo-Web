import { Component, OnInit } from '@angular/core';
import { PrvpService } from '../api/prvp.service';

@Component({
  selector: 'app-prvp',
  templateUrl: './prvp.component.html',
  styleUrls: ['./prvp.component.scss']
})
export class PrvpComponent implements OnInit {
  errorMessage = 'Error fetching Adminprvps';
  searchTerm: string = '';
  tableTitle: string = 'AdminPrVp';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];

  constructor(private PrvpService: PrvpService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadAdminprvps();
  }

  loadAdminprvps(): void {
    this.PrvpService.getAdminprvps().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error(this.errorMessage, error);
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
        const adminNr = president.adminNr ? String(president.adminNr).toLowerCase() : '';
        const presName = president.presName ? String(president.presName).toLowerCase() : '';
        const vicePresName = president.vicePresName ? String(president.vicePresName).toLowerCase() : '';

        return adminNr.includes(term) ||
          presName.includes(term) ||
          vicePresName.includes(term);
      });
    }
    console.log('Filtered data:', this.filteredData);
  }

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }

  deleteRow(adminNr: string): void {
    // ลบแถวจาก presidentsData
    this.presidentsData = this.presidentsData.filter(president => president.adminNr !== adminNr);

    // ลบแถวจาก filteredData ด้วย (ถ้ามีการค้นหาเกิดขึ้น)
    this.filteredData = this.filteredData.filter(president => president.adminNr !== adminNr);

    console.log('Row deleted with adminNr:', adminNr);
    console.log('Updated data:', this.presidentsData);
  }
   calculateSum(a: number, b: number): number {
    return a + b;
  }

  greet(name: string) {
    return name ? `Hello, ${name}!` : 'Hello, Guest!';
  }
  
  getLength(str: string) {
    if (!str) throw new Error('Invalid input');
    return str.length;
}

  add(a: number, b: number): number {
  return a + b;
}


}
