import { Component, OnInit } from '@angular/core';
import { AdminprvpService } from '../api/adminprvp.service';

@Component({
  selector: 'app-adminprvp',
  templateUrl: './adminprvp.component.html',
  styleUrls: ['']
})
export class AdminPrVpComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'AdminPrVp';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];

  constructor(private AdminprvpService: AdminprvpService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadAdminprvps();
  }

  loadAdminprvps(): void {
    this.AdminprvpService.getAdminprvps().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error('Error fetching Adminprvps:', error);
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
}