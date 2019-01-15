import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryService } from 'src/service/product-category.service';
import { ProductCategory } from 'src/model/product-category.model';
import { interval } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-category-management',
  templateUrl: './product-category-management.component.html',
  styleUrls: ['./product-category-management.component.css']
})
export class ProductCategoryManagementComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  closeResult: string;
  categories:ProductCategory[];

  model = new ProductCategory();
  productCategoryIns = new ProductCategory();

  productCategoryIns1 = new ProductCategory();
  model1 = new ProductCategory();
  submitted1 = false;
  newForm: FormGroup;
  
  constructor(private productCategoryService: ProductCategoryService,private modalService: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      ordering: true,
      retrieve: true,
      autoWidth: true
    };
    this.productCategoryService.getProductCategorysList()
    .subscribe(data=>{
      this.categories=data;
      this.dtTrigger.next();
    },error=>console.log(error));

    // const subscribe = interval(30000*2).subscribe(val => {
    //   this.reloadProductCategory();
    // });
  }

  reloadProductCategory() {
    let pros:ProductCategory[];
    this.categories=pros;
    this.productCategoryService.getProductCategorysList().subscribe(data => {
      this.categories = data;
    }, error => console.log(error));
  }

  onDeleteProductCategory(key: any) {
    console.log(key);

    this.productCategoryService.deleteProductCategory(key)
      .subscribe(data => console.log(data), error => console.log(error));

    this.reloadProductCategory();
  }

  onUpdateCustomer(content: any, id: any) {
    this.getProductCategoryById(id);
    this.open(content);
  }

  getProductCategoryById(id: any) {
    this.productCategoryService.getProductCategory(id)
      .subscribe(data => {
        let Oject = Object.entries(data[0]);
        this.model.id = Number(Oject[0][1]);
        this.model.name = String(Oject[1][1]);
      }, error => console.log(error));
  }

  onUpdateSubmit() {
    this.productCategoryService.updateProductCategory(this.model.id,
      {
        name: this.model.name,
      }
    ).subscribe(data => {
      console.log(data);
      this.productCategoryIns = data as ProductCategory;
    }, error => console.log(error));

    this.reloadProductCategory();
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

  save() {
    try {
      if (this.model) {
        this.productCategoryIns1.name = this.model1.name;
      }
    } catch (error) {
      console.log(error);
    }


    try {
      this.productCategoryService.createProductCategory(this.productCategoryIns1)
        .subscribe(data => console.log(data), error => console.log(error));
    } catch (error) {
      console.log(error);
    }

    this.model1 = new ProductCategory();
    this.productCategoryIns1 = new ProductCategory();
  }

  onSubmit() {
    this.submitted1 = true;
    this.save();
    this.reloadProductCategory();
    this.modalService.dismissAll();
  }
}
