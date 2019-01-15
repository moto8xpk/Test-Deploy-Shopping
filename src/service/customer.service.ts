import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'https://spring-boot-sever-demo.herokuapp.com/api/customers';


  constructor(private http: HttpClient) { }

  getCustomer(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }
 
  createCustomer(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, customer,);
  }
  
  compareCustomer(customer: Object): Observable<Object> {
    // console.log(customer);
    return this.http.post(`${this.baseUrl}` + `/user`, customer,);
  }
 
  updateCustomer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
 
  getCustomersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCustomerByLogging(user:Object): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${user}`);
  }
 
  getCustomersByPhone(phone: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phone/${phone}`);
  }
 
  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }

}
