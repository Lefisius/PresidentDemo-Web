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
      children: [],
    },
    {
      title: '1900-1949',
      key: '1900-1949',
      children: [],
    },
    {
      title: '1950-1999',
      key: '1950-1999',
      children: [],
    },
    {
      title: '2000-2049',
      key: '2000-2049',
      children: [],
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
    if (this.fromAge.trim() === '' || this.toAge.trim() === '') {
      return;
    }

    const from = parseInt(this.fromAge, 10);
    const to = parseInt(this.toAge, 10);

    if (isNaN(from) || isNaN(to)) {
      return;
    }

    this.filteredData = this.presidentsData.filter((president) => {
      const age = president.birthYr + president.deathAge;
      return age >= from && age <= to;
    });
  }
  // #region function for กำหนดตัวTable
  initColumns(): void {
    this.listOfColumns = [
      {
        name: 'PresName',
        sortOrder: null,
        sortFn: (a: President, b: President) =>
          a.presName.localeCompare(b.presName),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [],
        filterFn: null,
      },
      {
        name: 'BirthYr',
        sortOrder: null,
        sortFn: (a: President, b: President) => a.birthYr - b.birthYr,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: this.getBrithYr(),
        filterFn: (list: string[], item: President) => {
          const age = item.birthYr;
          return list.some((value) => {
            const [min, max] = value.split('-').map((num) => parseInt(num, 10));
            return age >= min && age <= max;
          });
        },
      },
      {
        name: 'YrsServ',
        sortOrder: null,
        sortFn: (a: President, b: President) => a.yrsServ - b.yrsServ,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: this.getYrsServ(),
        filterFn: (list: string[], item: President) => {
          const age = item.yrsServ;
          return list.some((value) => {
            const [min, max] = value.split('-').map((num) => parseInt(num, 10));
            return age >= min && age <= max;
          });
        },
      },
      {
        name: 'DeathAge',
        sortOrder: null,
        sortFn: (a: President, b: President) => a.deathAge - b.deathAge,
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: this.getDeathAge(),
        filterFn: (list: string[], item: President) => {
          const age = item.deathAge;
          return list.some((value) => {
            const [min, max] = value.split('-').map((num) => parseInt(num, 10));
            return age >= min && age <= max;
          });
        },
      },
      {
        name: 'Party',
        sortOrder: null,
        sortFn: (a: President, b: President) =>
          a.party.localeCompare(b.party),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [],
        filterFn: null,
      },
      {
        name: 'StateBorn',
        sortOrder: null,
        sortFn: (a: President, b: President) =>
          a.stateBorn.localeCompare(b.stateBorn),
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: [],
        filterFn: null,
      },
      {
        name: 'Age Range',
        sortOrder: null,
        sortFn: (a: President, b: President) => {
          const ageA = a.birthYr + a.deathAge;
          const ageB = b.birthYr + b.deathAge;
          return ageA - ageB;
        },
        sortDirections: ['ascend', 'descend', null],
        filterMultiple: true,
        listOfFilter: this.getAgeRanges(), // Initialize with age range filters
        filterFn: (list: string[], item: President) => {
          const age = item.birthYr + item.deathAge;
          return list.some((value) => {
            const [min, max] = value.split('-').map((num) => parseInt(num, 10));
            return age >= min && age <= max;
          });
        },
      },
    ];
  }
  // #endregion function for กำหนดตัวTable

  // #region function for กำหนดตัวFilter
  getAgeRanges(): NzTableFilterList {
    const ranges: NzTableFilterList = [];
    for (let year = 1800; year <= 2000; year += 50) {
      ranges.push({ text: `${year}-${year + 49}`, value: `${year}-${year + 49}` });
    }
    return ranges;
  }

  getBrithYr(): NzTableFilterList {
    const ranges: NzTableFilterList = [];
    for (let year = 1730; year <= 1930; year += 1) {
      ranges.push({ text: `${year}`, value: `${year}-${year}` });
    }
    return ranges;
  }

  getDeathAge(): NzTableFilterList {
    const ranges: NzTableFilterList = [];
    for (let year = 45; year <= 90; year += 1) {
      ranges.push({ text: `${year}`, value: `${year}-${year}` });
    }
    return ranges;
  }

  getYrsServ(): NzTableFilterList {
    const ranges: NzTableFilterList = [];
    for (let year = 0; year <= 12; year += 1) {
      ranges.push({ text: `${year}`, value: `${year}-${year}` });
    }
    return ranges;
  }
  // #endregion function for กำหนดตัวFilter

  // #region function for applyFilter
  applyFilter(selectedAgeRanges: string[]): void {
    this.selectedAgeRanges = selectedAgeRanges;
    if (this.selectedAgeRanges.length === 0) {
      this.filteredData = [...this.presidentsData];
      return;
    }

    this.filteredData = this.presidentsData.filter(president => {
      const age = president.birthYr + president.deathAge;
      return this.selectedAgeRanges.some(value => {
        const [min, max] = value.split('-').map(num => parseInt(num, 10));
        return age >= min && age <= max;
      });
    });
  }
  // #endregion function for applyFilter

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }
}