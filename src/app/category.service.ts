import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Observable<any[]>;
  constructor(private db:AngularFireDatabase) {

   }
   //getCategories(){
   //  return this.db.list('/categories');
  // }
/* for firestore
getCategories() {
    return this.db.collection('/categories').snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.doc.id, ...a.payload.doc.data() }))
        )
      );
  }
*/
  getAll () {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

}
