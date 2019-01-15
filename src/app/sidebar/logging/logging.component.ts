import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/model/customer.model';
import { FormGroup, NgForm } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { EncodeService } from '../../../service/encode.service';
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css'],
})
export class LoggingComponent implements OnInit {

  model = new Customer();
  customerIns = new Customer();
  submitted = false;
  loginform: FormGroup;
  currentUser = new Object();
  closeResult: string;
  messageString: string = "";
  customerNew = new Customer();
  LoginFlat: boolean;
  LoginedFlat: boolean;

  constructor(private customerService: CustomerService, private encodeService: EncodeService, private router: Router, private modalService: NgbModal, public authService: AuthService) {
  }

  ngOnInit() {
    this.LoginFlat = this.isLogged();
    this.LoginedFlat = !this.isLogged();
  }

  isLogged(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    if (localStorage.getItem('token') == "admin") {
      this.customerNew.name = "admin"
    }
    return status;
  }
  Logout() {
    this.authService.logout();
    this.LoginFlat = this.isLogged();
    this.LoginedFlat = !this.isLogged();
  }

  onSubmit(content) {
    this.customerIns.username = this.model.username;
    this.customerIns.password = this.encodeService.encodeNormalPassword(this.model.password);
    try {
      this.getUserAccount();
    } catch (error) {
      console.log(error);
    }
    console.log(this.currentUser);
    this.submitted = true;


    this.open(content);
    this.router.navigate(['/main']);
  }

  getUserAccount() {
    this.currentUser = this.customerService.compareCustomer(this.customerIns)
      .subscribe(
        data => {
          console.log(data);
          if (data == null) {
            console.log("Null data");
            this.messageString = "Username and Password is not valid";
            this.LoginFlat = false;
            this.LoginedFlat = true;
          }
          if (data) {
            let UserOject = Object.entries(data);
            this.customerNew.id = UserOject[0][1];
            this.customerNew.name = UserOject[1][1];
            this.customerNew.name = UserOject[1][1];
            this.customerNew.username = UserOject[2][1];
            this.customerNew.password = UserOject[3][1];
            this.customerNew.address = UserOject[4][1];
            this.customerNew.phone = UserOject[5][1];
            this.customerNew.email = UserOject[6][1];
            this.messageString = `Hello ${this.customerNew.name}`;
            this.LoginFlat = true;
            this.LoginedFlat = false;
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('token', UserOject[2][1]);
          }

        }
        , error => console.log(error));
  }

  open(content) {
    console.log(content);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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

}
