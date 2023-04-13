import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: string = 'https://localhost:7145/api/CarImages/';

  constructor(private httpClient: HttpClient) {}

  getImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let apiUrl = this.apiUrl + 'getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(apiUrl);
  }
}
