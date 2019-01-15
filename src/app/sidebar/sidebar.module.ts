import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoggingComponent } from './logging/logging.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { NewArrivalComponent } from './new-arrival/new-arrival.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
  ],
  declarations: [
    SideBarComponent,
    LoggingComponent,
    BestSellerComponent,
    NewArrivalComponent
  ],
  exports: [
    SideBarComponent
  ]
})
export class SidebarModule { }
