import { Injectable } from '@angular/core';
import { Router,CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
//import { subscribeTo } from 'rxjs/internal-compatibility';
//import {Observable} from 'rxjs/observable'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth:AuthService, private router:Router) {

   }
  canActivate(route, state: RouterStateSnapshot):Observable<boolean>| Promise<boolean> | boolean{
    return this.auth.user$.pipe(
      map(user =>{
        if (user){
          return true;
        } 
        this.router.navigate(["/login"],{queryParams: {returnUrl: state.url}});
        //this.router.navigate(["/login"]);
        return false;
      })
    );
  };
 }

