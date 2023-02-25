import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logIn, signUp } from '../data_type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  isUserLoggedIn= new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
 

  constructor(private http: HttpClient, private router: Router) { }
  userLogin(data: logIn) {
    this.http.get<logIn[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
      ).subscribe((result) => {
        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['userHome'])
        }
        else {
          this.isLoginError.emit(true);
        }
      })
     
  }
  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserLoggedIn.next(true);
      this.router.navigate(['userHome']);
    }
  }
  
}