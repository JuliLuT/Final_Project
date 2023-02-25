import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { signUp } from '../data_type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterAuthService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: signUp) {
    this.http.post('http://localhost:3000/users',
      data,
      { observe: 'response' }).subscribe((result) => {
        console.log(result)
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['userHome'])
        }
      })
  }
  reloadUser() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn.next(true);
      this.router.navigate(['userHome']);
    }
  }
}
