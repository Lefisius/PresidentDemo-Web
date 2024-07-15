import { Component, OnInit } from '@angular/core';
import { StateService } from '../api/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'State';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadStates();
  }

  loadStates(): void {
    this.stateService.getStates().subscribe(data => {
      console.log('Data received from API:', data);
      this.presidentsData = data;
      this.filteredData = data;
    }, error => {
      console.error('Error fetching states:', error);
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
        president.stateName.toLowerCase().includes(term) ||
        president.adminEntered.toString().includes(term) ||
        president.yearEntered.toString().includes(term)
      );
    }
  }

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }
}