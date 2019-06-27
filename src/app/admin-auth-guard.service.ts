import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }
  canActivate(): Observable<boolean> {
    //return this.auth.user$
    //.pipe(switchMap(user => this.userService.get(user.uid)))  //replaced by the reuseable code below
    return this.auth.appUser$
    .pipe(map (appUser => appUser.isAdmin));
  }

}
