import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: string = 'https://localhost:7145/api/';

  constructor(private httpClient:HttpClient) { }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newUrl = this.apiUrl + "CarImages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  getAllCarImages():Observable<ListResponseModel<CarImage>>{
    let newUrl = this.apiUrl + "CarImages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newUrl);
  }

  add(carImage:CarImage):Observable<ResponseModel>{
    let newUrl = this.apiUrl + "CarImages/add";
    return this.httpClient.post<ResponseModel>(newUrl, carImage);
  }

  getImagePath(carImage: string):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"uploads/images/="+carImage
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
