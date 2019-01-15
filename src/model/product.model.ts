import { ProductCategory } from "./product-category.model";

export class Product{
    id:number;
    name:string;
    productCategory:ProductCategory;
    price:number;
    desc:string;
    imagelink:string;
}