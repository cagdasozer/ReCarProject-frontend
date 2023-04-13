import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarComponent } from './components/car/car.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { TextFieldComponent } from './custom-controller/text-field/text-field.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    CartSummaryComponent,
    BrandAddComponent,
    CarComponent,
    CarAddComponent,
    ColorAddComponent,
    RegisterComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    TextFieldComponent,
    BrandDetailComponent,
    CarFilterComponent,
    CarFilterPipe,
    ColorDetailComponent,
    CustomerComponent,
    LoginComponent,
    PaymentComponent,
    UserProfileComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
