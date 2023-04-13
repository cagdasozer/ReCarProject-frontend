import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { CreditCard } from '../models/creditCart';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:7145/api/';
  constructor(private httpClient:HttpClient) { }

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "creditCards/add"
    return this.httpClient.post<ResponseModel>(apiUrl , creditCard)
  }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let apiUrl = this.apiUrl + "creditCards/getbycustomerid?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(apiUrl)
  }
}
