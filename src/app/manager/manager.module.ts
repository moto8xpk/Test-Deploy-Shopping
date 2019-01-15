import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagementComponent } from './customer-management/customer-management.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryManagementComponent } from './product-category-management/product-category-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ReceiptManagementComponent } from './receipt-management/receipt-management.component';
import { AppRoutingModule } from '../app-routing.module';
// import {SelectModule} from 'ng2-select';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // SelectModule,
    NgSelectModule
  ],
  declarations: [CustomerManagementComponent, 
    ProductCategoryManagementComponent, 
    ProductManagementComponent, 
    ReceiptManagementComponent
  ],
  exports:[
    CustomerManagementComponent,
    ProductCategoryManagementComponent,
    ProductManagementComponent,
    ReceiptManagementComponent
  ]
})
export class ManagerModule { }
