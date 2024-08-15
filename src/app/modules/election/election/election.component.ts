import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ElectionService } from '../api/election.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgForm } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {
  searchTerm: string = '';
  tableTitle: string = 'Election';
  datetime: string = '';
  presidentsData: any[] = [];
  filteredData: any[] = [];
  printerName: string = '';
  printerIP: string = '';
  printerDescription: string = '';
  printerPpdBase64: string = '';
  printersData: any[] = []; // เพิ่มตัวแปรสำหรับจัดเก็บข้อมูลเครื่องพิมพ์

  @ViewChild('ppdFileInput') ppdFileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private electionService: ElectionService,
    private notification: NzNotificationService,
    private cdr: ChangeDetectorRef // เพิ่มการใช้งาน ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
    this.loadElections();
    this.loadPrinters(); // โหลดข้อมูลเครื่องพิมพ์เมื่อเริ่มต้น
  }

  loadElections(): void {
    this.electionService.getPresElections().subscribe(
      data => {
        this.presidentsData = this.removeDuplicates(data, 'electionYear'); // กรองข้อมูลที่ซ้ำซ้อน
        this.filteredData = [...this.presidentsData];
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Elections:', error);
        this.notification.error('Error', 'Failed to load election data.');
      }
    );
  }

  loadPrinters(): void {
    this.electionService.getPrinters().subscribe(data => {
      this.printersData = data;
      this.filteredData = data; // ถ้าต้องการแสดงผลที่กรองแล้ว
      this.cdr.detectChanges(); // บังคับให้ Angular ตรวจสอบการเปลี่ยนแปลง
    }, error => {
      console.error('Error fetching Printers:', error);
    });
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
      this.filteredData = this.presidentsData.filter(president => {
        return president.electionYear.toLowerCase().includes(term) ||
          president.candidate.toLowerCase().includes(term) ||
          president.votes.toLowerCase().includes(term) ||
          president.winnerLoserIndic.toLowerCase().includes(term);
      });
    }
  }

  setTableTitle(title: string): void {
    this.tableTitle = title;
  }

  handlePpdFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.printerPpdBase64 = btoa(reader.result as string);
      };
      reader.readAsText(file);
    }
  }

  installDriversFromJson(): void {
    this.electionService.installDriversFromJson().subscribe(
      response => {
        console.log('Drivers installation response:', response);
        this.notification.success('Success', 'Printers installation process completed');
      },
      (error: HttpErrorResponse) => {
        console.error('Error installing drivers:', error);
        this.notification.error('Error', 'An error occurred while installing the drivers.');
      }
    );
  }

  addPrinter(printerForm: NgForm): void {
    if (printerForm.valid && this.printerPpdBase64) {
      this.electionService.addPrinter(this.printerName, this.printerIP, this.printerDescription, this.printerPpdBase64).subscribe(response => {
        console.log('Printer added successfully:', response);
        this.notification.success('Success', 'Printer added successfully.');
        this.loadPrinters(); // รีโหลดข้อมูลเครื่องพิมพ์หลังจากเพิ่ม
        this.loadElections(); // รีโหลดข้อมูลของ Elections
        this.printerName = '';
        this.printerIP = '';
        this.printerDescription = '';
        this.printerPpdBase64 = ''; // รีเซ็ตข้อมูลของ PPD file
        if (this.ppdFileInput) {
          this.ppdFileInput.nativeElement.value = ''; // ล้างค่าไฟล์ที่เลือก
        }
      }, error => {
        console.error('Error adding printer:', error);
        this.notification.error('Error', 'An error occurred while adding the printer.');
      });
    } else {
      this.notification.error('Error', 'Please fill out all fields and upload a PPD file.');
    }
  }

  deletePrinter(id: number): void {
    this.electionService.deletePrinter(id).subscribe(
      (response: string) => {
        console.log('Printer deleted successfully:', response);
        this.notification.success('Success', 'Printer deleted successfully.');
        this.loadPrinters(); // รีโหลดข้อมูลเครื่องพิมพ์หลังจากลบ
        this.loadElections(); // รีโหลดข้อมูลของElections ไม่เกียวกับcode ของ printer
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting printer:', error);
        this.notification.error('Error', 'An error occurred while deleting the printer.');
      }
    );
  }

  removeDuplicates(array: any[], key: string): any[] {
    return array.filter((value, index, self) =>
      index === self.findIndex((t) => t[key] === value[key])
    );
  }
}
