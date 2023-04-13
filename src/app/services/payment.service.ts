import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44327/api/Payments/";

  constructor(private httpClient:HttpClient) { }

  paAddPaymenty(payment:Payment):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
