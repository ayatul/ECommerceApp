import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
//products$;
products:Product[]=[];
//products:{}[];
filteredProducts:Product[]=[];

category:string;

  constructor(
    route:ActivatedRoute,
     productService: ProductService
     ) {
      productService.getAll().subscribe(products=>
    {
      this.products=products;

      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
        console.log(this.category);
        //set filtered prod array
        this.filteredProducts=(this.category)?
        this.products.filter(p=>p.category===this.category):
        this.products;
      });

    });
    //this.products$=productService.getAll();
    
    

   }

}
