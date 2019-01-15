import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { Customer } from 'src/model/customer.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
