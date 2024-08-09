import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../api/administration.service';

@Component({
  selector: 'app-administrations',
  templateUrl: './administrations.component.html',
  styleUrls: ['']
})
export class AdministrationsComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'Administration';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];

  constructor(private AdministrationService: AdministrationService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadAdministrations();
  }

  loadAdministrations(): void {
    this.AdministrationService.getAdministrations().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error('Error fetching Administrations:', error);
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
        const yearInaugurated = president.yearInaugurated ? String(president.yearInaugurated).toLowerCase() : '';

        return adminNr.includes(term) ||
          presName.includes(term) ||
          yearInaugurated.includes(term);
      });
    }
    console.log('Filtered data:', this.filteredData);
  }


  setTableTitle(title: string): void {
    this.tableTitle = title;
  }
}