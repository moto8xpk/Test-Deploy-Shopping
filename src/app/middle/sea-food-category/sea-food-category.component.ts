import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product.model';
import { ProductService } from 'src/service/product.service';
import { ProductConfirm } from '../../../model/productConfirm.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sea-food-category',
  templateUrl: './sea-food-category.component.html',
  styleUrls: ['./sea-food-category.component.css']
})
export class SeaFoodCategoryComponent implements OnInit {

  model = new ProductConfirm();
  products: Product[];
  closeResult: string;

  constructor(private productService: ProductService,private modalService: NgbModal) { }

  ngOnInit() {
    this.productService.getProductsListByCategory(11)
    .subscribe(data => {
      this.products = data;
      console.log(this.products);
    }, error => console.log(error));
  }

  onDetailProduct(content: any, id: any) {
    this.getProductById(id);
    this.open(content);
  }

  getProductById(id: any) {
    this.productService.getProduct(id)
      .subscribe(data => {
        console.log(data);
        let UserOject = Object.entries(data[0]);
        this.model.id = Number(UserOject[0][1]);
        this.model.name = String(UserOject[1][1]);
        this.model.productCategoryId = Number(UserOject[2][1]["id"]);
        this.model.productCategoryName = String(UserOject[2][1]["name"]);
        this.model.price = Number(UserOject[3][1]);
        this.model.desc = String(UserOject[4][1]);
        this.model.imagelink = String(UserOject[5][1]);
        console.log(this.model);
      }, error => console.log(error));
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
}
