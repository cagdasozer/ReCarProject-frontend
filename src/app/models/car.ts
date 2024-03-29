import { CarImage } from "./carImage";

export interface Car {
  id: number;
  carId: number;
  carName: string;
  brandId: number;
  brandName: string;
  colorId: number;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  minFindexScore: number;
}
