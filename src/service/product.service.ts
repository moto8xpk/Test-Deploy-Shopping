import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://spring-boot-sever-demo.herokuapp.com/api/products';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
 
  createProduct(Product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, Product,);
  }
 
  updateProduct(id: number, value: any): Observable<Object> {
    console.log(value);
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }
 
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
 
  getProductsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProductsListByCategory(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cate/${id}`);
  }

  getProductByLogging(product:Object): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${product}`);
  }
 
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }
}
