import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from 'src/service/customer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/model/customer.model';
import { CustomerConfirm } from 'src/model/customerConfirm.model';
import { FormGroup } from '@angular/forms';
// import { CompareValidatorDirective } from '../../../shared/compare-validator.directive';
// import { interval } from 'rxjs';
import { EncodeService } from 'src/service/encode.service';
import { Router } from '@angular/router';

class Person {
  id: number;
  name: string;
  username: string;
  password: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  persons: Person[];
  personalInfo: Person;
  closeResult: string;

  customerIns = new Customer();
  model = new CustomerConfirm();
  submitted = false;
  customerForm: FormGroup;

  customerIns1 = new Customer();
  model1 = new CustomerConfirm();
  submitted1 = false;
  registerForm: FormGroup;



  constructor(private customerService: CustomerService, private modalService: NgbModal, private encodeService: EncodeService, private router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      ordering: true,
      retrieve: true,
      autoWidth: true
    };
    this.customerService.getCustomersList()
      .subscribe(data => {
        this.persons = data;
        this.dtTrigger.next();
      }, error => console.log(error));
    // const subscribe = interval(30000*2).subscribe(val => {
    //   this.reloadCustomer();
    // });
  }

  reloadCustomer() {
    let pers:Person[];
    this.persons=pers;
    this.customerService.getCustomersList().subscribe(data => {
      this.persons = data;
    }, error => console.log(error));
  }
  onDeleteCustomer(key: any) {
    console.log(key);

    this.customerService.deleteCustomer(key)
      .subscribe(data => console.log(data), error => console.log(error));

    this.reloadCustomer();
  }

  onUpdateCustomer(content: any, id: any) {
    this.getCustomerById(id);
    this.open(content);
  }

  getCustomerById(id: any) {
    this.customerService.getCustomer(id)
      .subscribe(data => {
        let UserOject = Object.entries(data[0]);
        this.model.id = Number(UserOject[0][1]);
        this.model.name = String(UserOject[1][1]);
        this.model.username = String(UserOject[2][1]);
        this.model.password = String(UserOject[3][1]);
        this.model.address = String(UserOject[4][1]);
        this.model.phone = String(UserOject[5][1]);
        this.model.email = String(UserOject[6][1]);
      }, error => console.log(error));
  }

  onUpdateSubmit() {
    this.customerService.updateCustomer(this.model.id,
      {
        name: this.model.name,
        username: this.model.username,
        password: this.model.password,
        address: this.model.address,
        phone: this.model.phone,
        email: this.model.email
      }
    ).subscribe(data => {
      console.log(data);
      this.customerIns = data as Customer;
    }, error => console.log(error));

    this.reloadCustomer();
    this.modalService.dismissAll();
  }


  open(content) {
    console.log(content);
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get diagnostic() { return JSON.stringify(this.model); }


  save() {
    try {
      if (this.model) {
        this.customerIns1.name = this.model1.name;
        this.customerIns1.username = this.model1.username;
        // this.customerIns.password = this.model.password;
        this.customerIns1.password = this.encodeService.encodeNormalPassword(this.model1.password);
        this.customerIns1.address = this.model1.address;
        this.customerIns1.email = this.model1.email;
        this.customerIns1.phone = this.model1.phone;
      }
    } catch (error) {
      console.log(error);
    }


    try {
      this.customerService.createCustomer(this.customerIns1)
        .subscribe(data => console.log(data), error => console.log(error));
    } catch (error) {
      console.log(error);
    }

    this.model1 = new CustomerConfirm();
    this.customerIns1 = new Customer();
  }

  onSubmit() {
    this.submitted1 = true;
    this.save();
    this.reloadCustomer();
    this.modalService.dismissAll();
  }

}
