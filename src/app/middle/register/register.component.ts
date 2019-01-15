import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/model/customer.model';
import { CustomerConfirm } from 'src/model/customerConfirm.model';
import { FormGroup } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { EncodeService } from '../../../service/encode.service';
import { Router } from "@angular/router";
// import { CompareValidatorDirective } from '../../../shared/compare-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customerIns = new Customer();
  model = new CustomerConfirm();
  submitted = false;
  customerForm: FormGroup;

  constructor(private customerService: CustomerService, private encodeService: EncodeService, private router: Router) { }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.model); }


  save() {
    try {
      if (this.model) {
        this.customerIns.name = this.model.name;
        this.customerIns.username = this.model.username;
        // this.customerIns.password = this.model.password;
        this.customerIns.password = this.encodeService.encodeNormalPassword(this.model.password);
        this.customerIns.address = this.model.address;
        this.customerIns.email = this.model.email;
        this.customerIns.phone = this.model.phone;
      }
    } catch (error) {
      console.log(error);
    }


    try {
      this.customerService.createCustomer(this.customerIns)
        .subscribe(data => console.log(data), error => console.log(error));
    } catch (error) {
      console.log(error);
    }

    this.model = new CustomerConfirm();
    this.customerIns = new Customer();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    this.router.navigate(['/homepage/main']);
  }

}
