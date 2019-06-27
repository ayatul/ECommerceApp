import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
  create(product){
    return this.db.list('/products').push(product);
  }
  update(productId, product)
  {
    return this.db.object('products/'+productId).update(product);
  }
  //getAll(){
    //return this.db.list('/products');
  //}
  getAll() {    
    //return this.db.list('/products');
         
    //return this.db.list('/products').valueChanges(); 
    
    //return changes.map(c => ({ key: c.payload.key, ...c.payload.val() })); 
       return this.db.list('/products')    
              .snapshotChanges()
              .pipe(map(changes => {      
          return changes.map(c => ({ key: c.key, ...c.payload.val() }));   
      }));
  }
  get(productId){
    return this.db.object('/products/'+ productId).valueChanges();
  }
}
//getAll() {    // return this.db.list('/products').valueChanges();    return this.db.list('/products')    .snapshotChanges().map(changes => {      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));    });  }
