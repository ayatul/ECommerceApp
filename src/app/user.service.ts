import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import {AngularFirestore } from '@angular/fire/firestore';
//import {AngularFirestore } from 'angularfire2/firestore'
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //constructor(private db: AngularFirestore) { } //works for the firestore cloud db
  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User){
    this.db.object('/users/'+user.uid).update({   
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges() as Observable<AppUser>;
  }

  /*
  //works for the firestore cloud db
  save(user: firebase.User) {
    this.db.doc('/users/' + user.uid).set({
      name: user.displayName,
      email: user.email
    }, { merge: true })
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => console.log('user save failed:', reason));
  }*/
}
