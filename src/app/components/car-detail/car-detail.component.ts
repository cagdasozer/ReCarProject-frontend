import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailDto } from 'src/app/models/cardetail-dto';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  addFormGroup: FormGroup;
  car: CarDetailDto;
  imageUrl = "https://localhost:7145/uploads/carimages/"
  carImages: CarImage[] = [];
  dataLoaded = false;
  rentDate:Date;
  returnDate:Date;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImagesService: CarImageService,
    private formBuilder: FormBuilder,
    private cartService :CartService,
    private toastrService : ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddFormGroup();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarById(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  createAddFormGroup() {
    this.addFormGroup = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [null],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImagesService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getImagePath(carImage: CarImage) {
    let path = this.imageUrl + carImage.imagePath;
    return path;
  }

  getImagesClass(carImage: CarImage) {
    if (this.carImages[0] == carImage) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  addToCart() {
    this.toastrService.info('Firma ile iletişime geçiniz, ödeme yaptıktan sonra aracı teslim alabilirsiniz.');
    this.toastrService.success( 'Araç Rezerve Edildi.')
  }
}
