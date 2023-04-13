import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

    apiUrl = "https://localhost:7145/api/Brands/";
    constructor(private httpClient:HttpClient) { }
  
    getBrands():Observable<ListResponseModel<Brand>>{
      let newUrl = this.apiUrl + "getall";
      return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
    }

    getBrandById(id:number):Observable<SingleResponseModel<Brand>>{
      let apiUrl = this.apiUrl + "getbyid?id=" + id
      return this.httpClient.get<SingleResponseModel<Brand>>(apiUrl)
    }
    
    add(brand:Brand):Observable<ResponseModel>{
      let newUrl = this.apiUrl + "add";
      return this.httpClient.post<ResponseModel>(newUrl, brand);
    }

    update(brand:Brand):Observable<ResponseModel>{
      let apiUrl = this.apiUrl + "update"
      return this.httpClient.post<ResponseModel>(apiUrl , brand)
    }
  
    delete(brand:Brand):Observable<ResponseModel>{
      let apiUrl = this.apiUrl + "delete"
      return this.httpClient.post<ResponseModel>(apiUrl , brand)
    }
}
