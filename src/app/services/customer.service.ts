import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { CustomerDetail } from '../models/customerDetail';
import { CustomerForUpdateDto } from '../models/customerForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:7145/api/Customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + 'getall' )
  }

  getCustomerDetailsByUserId(userId:number):Observable<SingleResponseModel<CustomerDetail>>{
    let apiUrl = this.apiUrl + "getcustomerdetailsbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(apiUrl)
  }

  update(customerForUpdateDto:CustomerForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , customerForUpdateDto)
  }
}
