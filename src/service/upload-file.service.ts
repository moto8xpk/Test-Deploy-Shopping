import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import messaging from 'firebase/messaging';
import { FileUpload } from '../model/fileupload';
import { Product } from 'src/model/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UploadFileService {

  private basePath = '/uploads';
  pushProduct:any;
  productIns = new Product();

  constructor(private db: AngularFireDatabase,private productService:ProductService) { }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }, product: any,flat:boolean) {
    this.pushProduct=product;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {

          fileUpload.url = url;
          fileUpload.name = fileUpload.file.name;
          this.pushProduct.imagelink=String(fileUpload.url);
          if(fileUpload.url){
            if(flat!=true)
            {
              this.callUpdateToServer();
            }else{
              this.callCreateToServer();
            }
            
          }
          this.saveFileData(fileUpload);
          console.log(url);

          return url;
        })
      }
    );
    return null;
  }

  callUpdateToServer(){
    this.productService.updateProduct(this.pushProduct.id,
      {
        name: this.pushProduct.name,
        //edit them cho nay tiep
        productCategory:
        {
          id: this.pushProduct.productCategoryId,
          name: this.pushProduct.productCategoryName
        },
        price: this.pushProduct.price,
        desc: this.pushProduct.desc,
        imagelink: this.pushProduct.imagelink,
      }
    ).subscribe(data => {
      console.log('edit success');
      this.productIns = data as Product;
    }, error => console.log(error));
    // this.modalService.dismissAll();
  }

  callCreateToServer(){
    console.log('create');
    this.productService.createProduct(
      {
        name: this.pushProduct.name,
        //edit them cho nay tiep
        productCategory:
        {
          id: this.pushProduct.productCategory.id,
          name: this.pushProduct.productCategory.name
        },
        price: this.pushProduct.price,
        desc: this.pushProduct.desc,
        imagelink: this.pushProduct.imagelink,
      }
    ).subscribe(data => {
      console.log('create success');
      this.productIns = data as Product;
    }, error => console.log(error));
    // this.modalService.dismissAll();
  }

  saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload);
  }

  getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
