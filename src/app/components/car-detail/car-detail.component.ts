import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarImage } from 'src/app/models/carImage';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { UserDetail } from 'src/app/models/userDetail';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  rootPath = 'https://localhost:7145/uploads/carimages/';

  carDetail: CarDetail;
  carImages: CarImage[] = [];
  isDataLoaded = false;
  carId: number;
  lastRental = {
    id: 0,
    carId: 0,
    customerId: 0,
    rentDate: new Date(2021, 12, 12),
    returnDate: new Date(2021, 12, 12),
  };
  newRental: Rental = {
    id: 0,
    carId: 0,
    customerId: 0,
    rentDate: new Date(2021, 12, 12),
    returnDate: new Date(2021, 12, 12),
  };
  customerDetail: CustomerDetail;
  rentDate: string;
  returnDate: string;
  lastRentalReturnDate: string;
  isDatesValid = false;
  carUpdateForm: FormGroup;
  car: Car;
  colors: Color[];
  brands: Brand[];
  isCarImageNull = true;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetail(params['carId']);
        this.getCarImages(params['carId']);
        this.getCarById();
        this.getLastRentalByCarId(params['carId']);
        this.getCustomerDetail();
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.isDataLoaded = true;
      this.setCarUpdateFormValues();
      console.log(this.carDetail);
    });
  }

  getCustomerDetail() {
    let userDetail: UserDetail = JSON.parse(
      this.localStorageService.getItem('user_details') || ''
    );
    this.customerService
      .getCustomerDetailsByUserId(userDetail.id)
      .subscribe((response) => {
        this.customerDetail = response.data;
      });
  }

  checkFindeksScore() {
    if (this.carDetail.minFindeksScore > this.customerDetail.findeksPoint) {
      return false;
    } else {
      return true;
    }
  }

  getCarImages(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.isDataLoaded = true;
      this.checkIsCarImageNull();
      console.log(this.carImages);
      console.log(this.carImages.length);
    });
  }

  checkIsCarImageNull() {
    if (this.carImages.length == 1) {
      return true;
    } else {
      return false;
    }
  }

  getLastRentalByCarId(carId: number) {
    this.rentalService.getLastRentalByCarId(carId).subscribe((response) => {
      this.lastRental = response.data;
      if (response.data) {
        this.lastRentalReturnDate = this.returnDateFormat();
      } else {
        this.lastRentalReturnDate = new Date().toString();
      }
    });
  }

  returnDateFormat() {
    this.lastRentalReturnDate =
      new Date(this.lastRental.returnDate.toString()).getFullYear().toString() +
      '-';
    if (new Date(this.lastRental.returnDate.toString()).getMonth() < 10) {
      this.lastRentalReturnDate +=
        '0' +
        (
          new Date(this.lastRental.returnDate.toString()).getMonth() + 1
        ).toString() +
        '-';
    } else {
      this.lastRentalReturnDate +=
        (
          new Date(this.lastRental.returnDate.toString()).getMonth() + 1
        ).toString() + '-';
    }
    if (new Date(this.lastRental.returnDate.toString()).getDate() < 10) {
      this.lastRentalReturnDate +=
        '0' +
        (
          new Date(this.lastRental.returnDate.toString()).getDate() + 1
        ).toString();
    } else {
      this.lastRentalReturnDate += (
        new Date(this.lastRental.returnDate.toString()).getDate() + 1
      ).toString();
    }
    return this.lastRentalReturnDate.toString();
  }

  controlDates() {
    if (
      Date.parse(this.rentDate) > Date.parse(this.returnDate) ||
      Date.parse(this.rentDate) < Date.now() - 86400000 ||
      !this.rentDate ||
      !this.returnDate
    ) {
      this.isDatesValid = false;
    } else {
      this.isDatesValid = true;
    }
  }

  rentCar(rental: Rental) {
    if (!this.checkFindeksScore()) {
      this.router.navigate(['cars/detail/', this.carDetail.id]);
      this.toastrService.error('Findeks puanı yetersiz!', 'İşlem başarısız!');
    } else {
      this.controlDates();
      rental.carId = this.carId;
      rental.customerId = this.customerDetail.id;
      rental.rentDate = new Date(this.rentDate);
      rental.returnDate = new Date(this.returnDate);
      if (this.isDatesValid === true) {
        this.toastrService.success(
          'İşlem başarılı! Ödeme sayfasına yönlendiriliyorsunuz.'
        );
        this.router.navigate(['/cars/detail/rent/', JSON.stringify(rental)]);
      } else {
        this.toastrService.error('Tarih bilgileri geçersiz.');
        this.router.navigate(['/']);
      }
    }
  }

  getCarById() {
    this.carService.getCarById(this.carId).subscribe((response) => {
      this.car = response.data;
      console.log(this.car);
    });
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

  deleteCar() {
    this.carService.delete(this.car).subscribe(
      (response) => {
        this.toastrService.success('Araba silindi.', 'İşlem başarılı!');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'İşlem Başarısız!'
            );
          }
        }
      }
    );
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let brandId = parseInt(this.carUpdateForm.value.brandId);
      let colorId = parseInt(this.carUpdateForm.value.colorId);
      let carModel: Car = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.carDetail.id;
      carModel.brandId = brandId;
      carModel.colorId = colorId;
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araba güncellendi', 'İşlem başarılı!');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'İşlem Başarısız!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form bilgileri eksik', 'İşlem başarısız!');
    }
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  setCarUpdateFormValues() {
    this.carUpdateForm.setValue({
      brandId: [this.carDetail.brandId],
      colorId: [this.carDetail.colorId],
      carName: [this.carDetail.carName],
      modelYear: [this.carDetail.modelYear],
      dailyPrice: [this.carDetail.dailyPrice],
      description: [this.carDetail.description],
    });
  }

  addToCart() {
    this.toastrService.info(
      'Firma ile iletişime geçiniz, ödeme yaptıktan sonra aracı teslim alabilirsiniz.'
    );
    this.toastrService.success('Araç Rezerve Edildi.');
    this.cartService.addToCart;
  }
}
