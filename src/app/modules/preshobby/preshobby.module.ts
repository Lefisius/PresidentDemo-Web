import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PreshobbyRoutingModule } from './preshobby-routing.module';
import { PreshobbyComponent } from './preshobby/preshobby.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    PreshobbyComponent
  ],
  imports: [
    CommonModule,
    PreshobbyRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzIconModule,
    NzDropDownModule,
    NzPageHeaderModule,
    NzInputNumberModule,
    NzSelectModule,
  ]
})
export class PreshobbyModule { }
