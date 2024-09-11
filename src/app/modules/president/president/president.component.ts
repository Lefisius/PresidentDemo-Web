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
    const from = parseInt(this.fromAge, 10);
    const to = parseInt(this.toAge, 10);

    this.filteredData = this.presidentsData.filter((president) => {
      const sum = president.birthYr + president.deathAge;
      return (!isNaN(from) ? sum >= from : true) &&
        (!isNaN(to) ? sum <= to : true);
    });
  }

  applyFilter(selectedRanges: string[]): void {
    if (!selectedRanges.length) {
      this.filteredData = [...this.presidentsData]; // ถ้าไม่มีการเลือก ให้คืนข้อมูลทั้งหมด
      return;
    }

    this.filteredData = this.presidentsData.filter((president) => {
      const sum = president.birthYr + president.deathAge; // ผลรวมของ birthYr และ deathAge

      // ตรวจสอบว่าค่าผลรวมอยู่ในช่วงที่เลือกหรือไม่
      return selectedRanges.some(range => {
        const [from, to] = range.split('-').map(Number); // แปลงช่วงที่เลือกเป็นตัวเลข
        return sum >= from && sum <= to;
      });
    });
  }


  deleteRow(index: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.filteredData.splice(index, 1);
      // this.presidentsData = [...this.filteredData]; // Update the original data as well๐
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
//#region แก้ไขcode ขอความกรุณาดูด้วยว่าของเก่าหายไปไหม
//#endregion แก้ไขcode ขอความกรุณาดูด้วยว่าของเก่าหายไปไหม