import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable<firebase.User>; //convert it into observable for the async pipe - user : firebase.User;use $ as convention
  
  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private userService:UserService) { 
    this.user$=afAuth.authState;
  }
  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user=>
        {
          if(user) return this.userService.get(user.uid);
          return Observable.of(null);
        }
        ));

  }
}
