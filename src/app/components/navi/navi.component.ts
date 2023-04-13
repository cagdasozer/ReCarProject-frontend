import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { User } from 'src/app/models/user';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  isAuthorizated = false;
  userDetails: UserDetail;
  brands: Brand[];
  colors: Color[];

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.checkIsAuthorizated();
    this.getUserDetails();
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getUserDetails() {
    this.userDetails = JSON.parse(
      this.localStorageService.getItem('user_details') || ''
    );
  }

  checkIsAuthorizated() {
    if (this.localStorageService.getItem('token')) {
      this.isAuthorizated = true;
    } else {
      this.isAuthorizated = false;
    }
  }

  logOut() {
    this.localStorageService.delete('token');
    this.localStorageService.delete('user_details');
    this.localStorageService.delete('claim');
    this.toastrService.info('Çıkış yapıldı.', 'Bilgilendirme!');
    this.router.navigate(['login']);
    window.location.reload();
  }
}
