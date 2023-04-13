import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { RentalDetail } from '../models/rentalDetail';

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
  apiUrl = 'https://localhost:7145/api/Rentals/';
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let apiUrl = this.apiUrl + "getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(apiUrl)
  }

  getLastRentalByCarId(carId:number):Observable<SingleResponseModel<Rental>>{
    let apiUrl = this.apiUrl + "getlastrentalbycarid?carId=" + carId
    return this.httpClient.get<SingleResponseModel<Rental>>(apiUrl)
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(apiUrl,rental)
  }
}


