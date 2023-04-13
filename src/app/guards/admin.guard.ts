import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  userClaim : string

  constructor(private localStorageService:LocalStorageService,
    private router:Router,
    private toastrService:ToastrService) {
     this.userClaim = JSON.parse(this.localStorageService.getItem("user_claim") || "")
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userClaim == "admin") {
        return true
       }else{
         this.router.navigate([""])
         this.toastrService.error("Bu sayfaya erişim yetkiniz yok!" , "İşlem başarısız!")
         return false
       }
  }
  
}
