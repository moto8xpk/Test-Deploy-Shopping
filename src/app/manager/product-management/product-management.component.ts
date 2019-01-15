import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/model/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/service/product.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/model/product-category.model';
import { ProductConfirm } from '../../../model/productConfirm.model';
import { FileUpload } from 'src/model/fileupload';
import { UploadFileService } from 'src/service/upload-file.service';
import { ProductCategoryService } from 'src/service/product-category.service';
import { NgSelectConfig, NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  closeResult: string;
  products: Product[];

  model = new Product();
  productIns = new Product();
  productForm: FormGroup;
  product = new ProductConfirm();

  productIns1 = new Product();
  model1 = new Product();
  model2 = new ProductConfirm();
  submitted1 = false;
  newForm: FormGroup;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  categories:any[];
  newArrTest:Array<String>

  url = '';
  eventOnselectImage: any;
  downloadStr = '';

  // heroForm: FormGroup;
  // isCitiesControlVisible = true;
  // cities: NgOption[] = [
  //   { id: 1, name: 'Vilnius' },
  //   { id: 2, name: 'Kaunas' },
  //   { id: 3, name: 'Pavilnys (Disabled)', disabled: true },
  //   { id: 4, name: 'Pabradė' },
  // ];

  constructor(private uploadService: UploadFileService,
     private productService: ProductService,
     private productCategoryService:ProductCategoryService,
     private modalService: NgbModal,
     private config: NgSelectConfig,
     private fb: FormBuilder) {
      this.config.notFoundText = 'Custom not found';
      }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      ordering: true,
      retrieve: true,
      autoWidth: true
    };
    this.productService.getProductsList()
      .subscribe(data => {
        this.products = data;
        console.log(this.products);
        this.dtTrigger.next();
      }, error => console.log(error));

    this.productCategoryService.getProductCategorysList()
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      }, error => console.log(error));
      // this.reloadProductCategories();
      console.log(this.categories);
  }

  reloadProduct() {
    let pros: Product[];
    this.products = pros;
    this.productService.getProductsList().subscribe(data => {
      this.products = data;
    }, error => console.log(error));
  }

  reloadProductCategories() {
    var newArr:ProductCategory[];
    this.categories=newArr;
    this.productCategoryService.getProductCategorysList().subscribe(data => {
      this.categories=data
    }, error => console.log(error));
  }

  onDeleteProduct(key: any) {
    // console.log(key);

    this.productService.deleteProduct(key)
      .subscribe(data => console.log(data), error => console.log(error));

    this.reloadProduct();
  }

  onUpdate(content: any, id: any) {
    this.getProductById(id);
    this.open(content);
  }

  getProductById(id: any) {
    this.productService.getProduct(id)
      .subscribe(data => {
        let Oject = Object.entries(data[0]);
        console.log(data);
        this.product.id = Number(Oject[0][1]);
        this.product.name = String(Oject[1][1]);
        this.product.productCategoryId = Number(Oject[2][1]["id"]);
        this.product.productCategoryName = String(Oject[2][1]["name"]);
        this.product.price = Number(Oject[3][1]);
        this.product.desc = String(Oject[4][1]);
        this.product.imagelink = String(Oject[5][1]);
      }, error => console.log(error));
  }

  onUpdateSubmit() {
    this.submitted1=false;
    this.selectFile(this.eventOnselectImage);
    this.upload();
    // this.callUpdateToServer();
    this.modalService.dismissAll();
  }

  callUpdateToServer() {
    if (this.downloadStr != '') {
      this.product.imagelink = this.downloadStr;
      console.log(this.product.imagelink);
    }
    this.productService.updateProduct(this.product.id,
      {
        name: this.product.name,
        //edit them cho nay tiep
        productCategory:
        {
          id: this.product.productCategoryId,
          name: this.product.productCategoryName
        },
        price: this.product.price,
        desc: this.product.desc,
        imagelink: this.product.imagelink,
      }
    ).subscribe(data => {
      console.log('edit success');
      this.productIns = data as Product;
    }, error => console.log(error));

    this.reloadProduct();
    this.modalService.dismissAll();
  }

  open(content) {
    // console.log(content);
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
      if (this.model1) {
        this.productIns1.name = this.model1.name;
        this.productIns1.price = this.model1.price;
        this.productIns1.desc = this.model1.desc;
        this.productIns1.imagelink = this.model1.imagelink;
        this.productIns1.productCategory.id = this.model1.productCategory.id;
      }
    } catch (error) {
      console.log(error);
    }


    try {
      this.productService.createProduct(this.productIns1)
        .subscribe(data => console.log(data), error => console.log(error));
    } catch (error) {
      console.log(error);
    }

    this.model1 = new Product();
    this.productIns1 = new Product();
  }

  onSubmit() {
    this.submitted1 = true;
    this.selectFile(this.eventOnselectImage);
    this.upload();

    this.reloadProduct();
    this.modalService.dismissAll();
  }

  selectFile(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);

    this.waitFunct();


    this.eventOnselectImage = undefined;
    this.url = '';
  }

  waitFunct() {
    console.log(this.product);
    console.log(this.model2);
    
    let tempProduct=new Product();
    tempProduct.name=this.model2.name;
    tempProduct.price=this.model2.price;
    tempProduct.desc=this.model2.desc;

    if(this.submitted1==true){
    this.categories.forEach(element => {

      if(this.model2.productCategoryId==element.id){
        tempProduct.productCategory={id:element.id, name: element.name};
      }

    });
    }

    if (this.submitted1 != true) {
      return this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress, this.product,this.submitted1)
    }
    else if(this.submitted1 == true)
    {
      return this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress,tempProduct,this.submitted1)
    }
  }

  onSelectFile(event) {
    this.eventOnselectImage = event;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // console.log(event)
        // this.url = event.target.result;
        this.url = String(reader.result);
      }
    }
  }
}
