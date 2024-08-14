import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NewComponent } from './new-component/new-component.component';

// ฟังก์ชันตัวอย่างที่อาจถูกโหลด
function exampleFunction() {
  console.log('This is an example function.');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TestModuleModule { }
(window as any).NewModule = TestModuleModule;