import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:7145/api/Colors/';
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let apiUrl = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Color>>(apiUrl)
  }

  getColorByColorId(id:number):Observable<SingleResponseModel<Color>>{
    let apiUrl = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Color>>(apiUrl)
  }

  add(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }

  update(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }

  delete(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "delete"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }
}
