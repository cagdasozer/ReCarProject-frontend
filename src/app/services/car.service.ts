import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetailDto } from '../models/cardetail-dto';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:7145/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetailDto>>{
    let newUrl = this.apiUrl + "Cars/getcardetails"
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
  getCarsByBrand(brandId:number){
    let newUrl = this.apiUrl + "Cars/getcardetailsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
  getCarsByColor(colorId:number){
    let newUrl = this.apiUrl + "Cars/getcardetailsbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
  getCarsByImage(imagePath:string){
    let newUrl = this.apiUrl + "Cars/getcardetailsbyimagepath?imagePath=" + imagePath;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    let newUrl = this.apiUrl + 
    "Cars/getcardetailsbycolorandbrand?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newUrl);
  }
  getCarById(carId:number){
    let newUrl = this.apiUrl + "Cars/getcardetailbyid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newUrl);
  }
  add(car:Car):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "Cars/add"
    return this.httpClient.post<ResponseModel>(newUrl, car);
  }
}
