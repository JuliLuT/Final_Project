import { Component, OnInit } from '@angular/core';
import { cart, logIn, product } from '../data_type';
import { LoginAuthService } from '../services/login-auth.service';
import { Router } from '@angular/router'
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {
  authError: string = '';
  constructor(private login: LoginAuthService, private product:ProductsService) { }
  ngOnInit(): void {
    this.login.reloadUser();
  }

  logIn(data: logIn): void {
    this.login.userLogin(data);
    this.login.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'El email o la contraseña son incorrectos'
      }
      else {
        
      }
    })
  }
  
}