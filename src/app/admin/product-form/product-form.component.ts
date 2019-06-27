import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$=categoryService.getAll();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).pipe(take(1)).subscribe(p => {
      return this.product = p;
    }); }
  }
  delete(){
    if(!confirm('are you sure to delete it?'))return;
    
      this.productService.delete(this.id);
      this.router.navigate(["/admin/products"]);
    
  }
save(product)
{
  //based on the fact that if an id exists it will update else create
  if(this.id) this.productService.update(this.id, product)
  else this.productService.create(product);

this.router.navigate(["/admin/products"]);
}
  ngOnInit() {
  }

}
