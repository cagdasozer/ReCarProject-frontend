import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { UserDetail } from '../models/userDetail';
import { OperationClaim } from '../models/operationClaim';
import { UserForUpdateDto } from '../models/userForUpdatedDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:7145/api/Users/";

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let apiUrl = this.apiUrl + "getuserbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(apiUrl)
  }

  getClaimsByUserId(userId:number):Observable<ListResponseModel<OperationClaim>>{
    let apiUrl = this.apiUrl + "getclaimsbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<OperationClaim>>(apiUrl)
  }

  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDetail>>{
    let apiUrl = this.apiUrl + "getuserdetailsbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDetail>>(apiUrl)
  }

  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , userForUpdateDto)
  }
}
