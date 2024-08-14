// src/app/global-exports.ts
import { TestModuleModule } from './test-module/test-module.module';
// import { NewComponent } from './new-component/new-component.component';
// import { NewService } from './new-service/new-service.service';

// เปิดเผยเอนทิตีในวัตถุ window ของ global scope
(window as any).NewModule = TestModuleModule;
// (window as any).NewComponent = NewComponent;
// (window as any).NewService = NewService;
