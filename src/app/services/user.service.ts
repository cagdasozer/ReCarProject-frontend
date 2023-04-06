import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7145/api/";

  constructor(private httpClient:HttpClient) { }

  updateUserNames(user:User){
    let newUrl = this.apiUrl + "Users/updateusernames";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }

  getUserByMail(email:string):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "Users/getbymail?email=" + email;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newUrl = this.apiUrl + "Users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newUrl);
  }
}
