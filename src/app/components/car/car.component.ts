import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarFilter } from 'src/app/models/carFilter';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  imageUrl = 'https://localhost:7145/uploads/CarImages/';

  isDataLoaded = false;
  filterText = '';
  carFilter : [];
  colorFilter: [];
  brandFilter: [];
  carDetails: CarDetail[] = [];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarDetailsByFiltered(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    return this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.isDataLoaded = true;
    });
  }

  getCarDetailsByBrandId(brandId: number) {
    return this.carService
      .getCarDetailsByBrandId(brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
      });
  }

  getCarDetailsByColorId(colorId: number) {
    return this.carService
      .getCarDetailsByColorId(colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
        console.log(response.data);
      });
  }

  getCarDetailsByFiltered(brandId: number, colorId: number) {
    let carFilter: CarFilter = {
      brandId: parseInt(brandId.toString()),
      colorId: parseInt(colorId.toString()),
    };
    return this.carService
      .getCarDetailsByFiltered(carFilter)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
      });
  }

  addToCart(car: Car) {
    this.toastrService.info(
      'Firma ile iletişime geçiniz, ödeme yaptıktan sonra aracı teslim alabilirsiniz.'
    );
    this.toastrService.success(
      'Araç Rezerve Edildi. ',
      car.brandName + ' ' + car.carName
    );
    this.cartService.addToCart(car);
  }
}
