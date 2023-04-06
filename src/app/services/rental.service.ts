import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:7145/api';
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newUrl = this.apiUrl + "/Rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "/Rentals/add"
    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }

  checkRulesForAdding(rental:Rental):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "/Rentals/rulesforadding"
    return this.httpClient.post<ResponseModel>(newUrl, rental);
  }
}


