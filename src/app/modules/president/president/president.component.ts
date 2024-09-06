import { Component, OnInit } from '@angular/core';
import { PresidentService } from '../api/president.service';
import {
  NzTableSortOrder,
  NzTableSortFn,
  NzTableFilterList,
  NzTableFilterFn,
} from 'ng-zorro-antd/table';

interface President {
  presName: string;
  birthYr: number;
  yrsServ: number;
  deathAge: number;
  party: string;
  stateBorn: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<President> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<President> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.scss'],
})
export class PresidentComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'President';
  datetime: string = '';
  presidentsData: President[] = [];
  filteredData: President[] = [];
  listOfColumns: ColumnItem[] = [];
  selectedAgeRanges: string[] = []; // To store selected age ranges
  fromAge: string = '';
  toAge: string = '';

  //#region Example age ranges
  ageRangeNodes = [
    {
      title: '1800-1849',
      key: '1800-1849',
      children: [
        { title: '1800-1809', key: '1800-1809' },
        { title: '1810-1819', key: '1810-1819' },
        { title: '1820-1829', key: '1820-1829' },
        { title: '1830-1839', key: '1830-1839' },
        { title: '1840-1849', key: '1840-1849' },
      ],
    },
    {
      title: '1850-1899',
      key: '1850-1899',
      children: [
        { title: '1850-1859', key: '1850-1859' },
        { title: '1860-1869', key: '1860-1869' },
        { title: '1870-1879', key: '1870-1879' },
        { title: '1880-1889', key: '1880-1889' },
        { title: '1890-1899', key: '1890-1899' },
      ],
    },
    {
      title: '1900-1949',
      key: '1900-1949',
      children: [
        { title: '1900-1909', key: '1900-1909' },
        { title: '1910-1919', key: '1910-1919' },
        { title: '1920-1929', key: '1920-1929' },
        { title: '1930-1939', key: '1930-1939' },
        { title: '1940-1949', key: '1940-1949' },
      ],
    },
    {
      title: '1950-1999',
      key: '1950-1999',
      children: [
        { title: '1950-1959', key: '1950-1959' },
        { title: '1960-1969', key: '1960-1969' },
        { title: '1970-1979', key: '1970-1979' },
        { title: '1980-1989', key: '1980-1989' },
        { title: '1990-1999', key: '1990-1999' },
      ],
    },
    {
      title: '2000-2049',
      key: '2000-2049',
      children: [
        { title: '2000-2009', key: '2000-2009' },
        { title: '2010-2019', key: '2010-2019' },
        { title: '2020-2029', key: '2020-2029' },
        { title: '2030-2039', key: '2030-2039' },
        { title: '2040-2049', key: '2040-2049' },
      ],
    },
  ];
  //#endregion Example age ranges

  constructor(private presidentService: PresidentService) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadPresidents();
    this.initColumns();
  }

  loadPresidents(): void {
    this.presidentService.getPresidents().subscribe(
      (data) => {
        this.presidentsData = data;
        this.filteredData = data;
        console.log('Presidents Data Loaded:', this.presidentsData); // Debugging output
      },
      (error) => {
        console.error('Error fetching Presidents:', error);
      }
    );
  }

  updateDateTime(): void {
    const now = new Date();
    this.datetime = now.toLocaleString();
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredData = [...this.presidentsData];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredData = this.presidentsData.filter((president) => {
        const presName = president.presName
          ? String(president.presName).toLowerCase()
          : '';
        const birthYr = president.birthYr
          ? String(president.birthYr).toLowerCase()
          : '';
        const yrsServ = president.yrsServ
          ? String(president.yrsServ).toLowerCase()
          : '';
        const deathAge = president.deathAge
          ? String(president.deathAge).toLowerCase()
          : '';
        const party = president.party
          ? String(president.party).toLowerCase()
          : '';
        const stateBorn = president.stateBorn
          ? String(president.stateBorn).toLowerCase()
          : '';

        return (
          presName.includes(term) ||
          birthYr.includes(term) ||
          yrsServ.includes(term) ||
          deathAge.includes(term) ||
          party.includes(term) ||
          stateBorn.includes(term)
        );
      });
    }
  }

  applyFilterByRange(): void {
    const from = parseInt(this.fromAge, 10);
    const to = parseInt(this.toAge, 10);

    console.log('From:', from); // Debugging output
    console.log('To:', to);     // Debugging output

    if (isNaN(from) || isNaN(to)) {
        this.filteredData = [...this.presidentsData]; // Return all data if range is invalid
        return;
    }

    this.filteredData = this.presidentsData.filter((president) => {
        const birthYear = president.birthYr;
        console.log('Birth Year for', president.presName, ':', birthYear); // Debugging output
        return birthYear >= from && birthYear <= to;
    });

    console.log('Filtered Data:', this.filteredData); // Debugging output
  }

  applyFilter(selectedRanges: string[]): void {
    if (!selectedRanges.length) {
      this.filteredData = [...this.presidentsData]; // Return all data if no ranges selected
      return;
    }

    this.filteredData = this.presidentsData.filter((president) => {
      const sum = president.birthYr + president.deathAge;

      return selectedRanges.some(range => {
        const [from, to] = range.split('-').map(Number);
        return sum >= from && sum <= to;
      });
    });
  }

  deleteRow(index: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.filteredData.splice(index, 1);
      // this.presidentsData = [...this.filteredData]; // Uncomment if you want to update the original data as well
    }
  }

  initColumns(): void {
    this.listOfColumns = [
      {
        name: 'Name',
        sortOrder: null,
        sortFn: (a, b) => a.presName.localeCompare(b.presName),
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'Birth Year',
        sortOrder: null,
        sortFn: (a, b) => a.birthYr - b.birthYr,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'Years Served',
        sortOrder: null,
        sortFn: (a, b) => a.yrsServ - b.yrsServ,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'Death Age',
        sortOrder: null,
        sortFn: (a, b) => a.deathAge - b.deathAge,
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'Party',
        sortOrder: null,
        sortFn: (a, b) => a.party.localeCompare(b.party),
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'State Born',
        sortOrder: null,
        sortFn: (a, b) => a.stateBorn.localeCompare(b.stateBorn),
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
      {
        name: 'Sum of Birth Year and Death Age', // New column for sum
        sortOrder: null,
        sortFn: (a, b) => (a.birthYr + a.deathAge) - (b.birthYr + b.deathAge),
        listOfFilter: [],
        filterFn: null,
        filterMultiple: false,
        sortDirections: ['ascend', 'descend']
      },
    ];
  }

}
