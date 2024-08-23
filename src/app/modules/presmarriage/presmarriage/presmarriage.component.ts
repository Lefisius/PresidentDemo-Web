import { Component, OnInit } from '@angular/core';
import { PresmarriageService } from '../api/presmarriage.service';

@Component({
  selector: 'app-presmarriage',
  templateUrl: './presmarriage.component.html',
  styleUrls: ['./presmarriage.component.scss']
})
export class PresmarriageComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'PresMarriage';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];

  constructor(private PresMarriageservice: PresmarriageService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadPresMarriages();
  }

  loadPresMarriages(): void {
    this.PresMarriageservice.getPresMarriages().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error('Error fetching PresMarriages:', error);
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
      this.filteredData = this.presidentsData.filter(president =>
        president.presName.toLowerCase().includes(term) ||
        president.spouseName.toLowerCase().includes(term) ||
        president.prAge.toString().includes(term) ||
        president.spAge.toString().includes(term) ||
        president.nrChildren.toString().includes(term) ||
        president.marYear.toString().includes(term)
      );
    }
  }

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }

  deleteRow(adminNr: string): void {
    this.filteredData = this.filteredData.filter(president => president.adminNr !== adminNr);
    this.presidentsData = this.presidentsData.filter(president => president.adminNr !== adminNr);
  }
}
