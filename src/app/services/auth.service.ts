import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { RegisterModel } from '../models/registerModel';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7145/api/Auth/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiUrl, loginModel);
  }

  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      apiUrl,
      registerModel
    );
  }

  isAuthenticated() {
    if (
      this.localStorageService.getItem('token') &&
      this.localStorageService.getItem('user_details')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
