import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { UserPasswordModel } from '../models/userPasswordModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:7145/api/Auth/";

  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelperService: JwtHelperService) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel);
  }

  logOut(){
    this.localStorageService.remove("token");
  }

  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel);
  }

  updatePassword(userPasswordModel:UserPasswordModel){
    let newUrl = this.apiUrl + "updatepassword";
    return this.httpClient.post<ResponseModel>(newUrl, userPasswordModel)
  }

  isAuthenticated(){
    if(this.localStorageService.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  get getDecodedToken() {
    let token = this.localStorageService.getItem("token");
    return this.jwtHelperService.decodeToken(token);
  }

  get getCurrentUserId() {
    let decodedToken = this.getDecodedToken;
    let userIdString = Object.keys(decodedToken).filter((t) =>
      t.endsWith('/nameidentifier')
    )[0];
    let userId: number = decodedToken[userIdString];
    return userId;
  }
}
