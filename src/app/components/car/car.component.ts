import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailDto } from 'src/app/models/cardetail-dto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  imageUrl = "https://localhost:7145/uploads/CarImages/"

  cars: CarDetailDto[] = [];
  carImages: CarImage[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = "";
  brandFilter: number = 0;
  colorFilter: number = 0;
  dataLoaded = false;
  
  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private carImagesService:CarImageService,
    private cartService :CartService,
    private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      } else {
        this.getCars()
        this.getBrands()
        this.getColors()
        this.getAllCarImages();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }

  getAllCarImages(){
    this.carImagesService.getAllCarImages().subscribe(response => {
      this.carImages = response.data;
    })
  }

  getCarImage(carId:number) {
    let imageUrl: string;
    this.carImages.forEach(carImage => {
      if (carImage.carId == carId) {
        imageUrl = "https://localhost:7145/uploads/CarImages/" + carImage.imagePath;
      }
    });
    return imageUrl;
  }
  
  getCarsByColor(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })   
  }
  getCarsByColorAndBrand(brandId:number, colorId:number){
    this.carService.getCarsByColorAndBrand(brandId, colorId).subscribe(response=>{
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  addToCart(car: Car) {
    this.toastrService.info('Firma ile iletişime geçiniz, ödeme yaptıktan sonra aracı teslim alabilirsiniz.');
    this.toastrService.success( 'Araç Rezerve Edildi. ', car.brandName + " " +car.carName);
    this.cartService.addToCart(car);
  }
}
