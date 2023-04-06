import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRentalComponent } from './components/admin-rental/admin-rental.component';
import { AdminComponent } from './components/admin/admin.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/carId/:carId", component:CarDetailComponent},
  {path:"cars/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"colors/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"brands/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"profile", component:ProfileComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", component:AdminComponent},
  {path:"admin-rental", component:AdminRentalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
