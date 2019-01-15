import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private baseUrl = 'https://spring-boot-sever-demo.herokuapp.com/api/categories';

  constructor(private http: HttpClient) { }

  getProductCategory(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
 
  createProductCategory(productCategory: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, productCategory,);
  }
 
  updateProductCategory(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteProductCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
 
  getProductCategorysList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProductCategoryByLogging(product:Object): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${product}`);
  }
 
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }
}
