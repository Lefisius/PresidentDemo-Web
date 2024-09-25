import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class TestVulnerabilitiesComponent {
  userInput: string = '';

  // ฟังก์ชันสำหรับรับข้อมูลจากฟอร์ม
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value; // รับค่าจาก input
  }
}
