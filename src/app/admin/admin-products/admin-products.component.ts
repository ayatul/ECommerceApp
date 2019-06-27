import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import {DataTableModule} from 'angular-6-datatable';
import {DataTableResource} from '@ismatjon/angular-data-table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy{
  //products$:Observable<any>[];
 // products:Product[];
 //products:{key: string, title: string, price: string, category: string, imageUrl:string}[];
  //filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;// used for the datatable
  items: Product[]=[];
  itemCount:number;

  products$: {}[];

constructor(private productService: ProductService) {
this.productService.getAll()
.subscribe(products => {
this.products$ = products;
console.log( this.products$ );
});
}
  private initiaizeTable(products: Product[]){
    this.tableResource=new DataTableResource(products);
    //this.tableResource.query({offset:0})
    this.tableResource.query({offset:0})
    .then(items=>this.items=items);
    this.tableResource.count()
    .then(count=>this.itemCount=count);
  }
  filter(query: string)
  {
    let filteredProducts=(query) ?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    this.initiaizeTable(filteredProducts);
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items=>this.items=items);
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}

