import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  addFormGroup: FormGroup;
  currentCarId: number;
  rentDate:Date;
  returnDate:Date;
  rental:Rental;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService:RentalService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService,
    private cartService:CartService) { }

  ngOnInit(): void {
    this.createAddFormGroup();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
      this.currentCarId = Number(params["carId"]);
    }
  })
  }

  createAddFormGroup() {
    this.addFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

  calculateDiff(){
    let rentDate = this.rentDate;
    let returnDate = this.returnDate;
    return Math.floor((Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDate()) - Date.UTC(rentDate.getFullYear(), rentDate.getMonth(), rentDate.getDate()) ) /(1000 * 60 * 60 * 24));
  }

  checkRulesForAdding(){
    if (this.addFormGroup.valid) {
      let rental: Rental = Object.assign({}, this.addFormGroup.value);
      rental.carId = this.currentCarId;
      rental.customerId = 1002;
      rental.returnDate = rental.returnDate ? rental.returnDate : null;
      
      this.rentalService.checkRulesForAdding(rental).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.router.navigate(['/payment/' + this.currentCarId + "/" 
          + this.calculateDiff() + "/" + this.rentDate + "/" + this.returnDate]);
        }, (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Kiralanacak tarihi seçiniz.');
    }
  }

  
}