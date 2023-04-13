import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetail } from '../models/carDetail';
import { CarFilter } from '../models/carFilter';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:7145/api/Cars/';
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "getcardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "getcardetailbycarid?carId=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(apiUrl)
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let apiUrl = this.apiUrl + "getbyid?id=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(apiUrl)
  }

  getCarDetailsByFiltered(carFilter:CarFilter):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "getcardetailsbyfiltered"
    return this.httpClient.post<ListResponseModel<CarDetail>>(apiUrl , carFilter)
  }

  add(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }

  update(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "delete"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }
}
