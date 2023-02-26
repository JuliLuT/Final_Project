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
  constructor(private login: LoginAuthService, private product: ProductsService) { }
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
        this.LocalCartToRemoteCart();
      }
    })
  }
  LocalCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = JSON.parse(localStorage.getItem('user')!)
    let userId = user && (user[0]).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      console.warn(userId)
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.warn("añadiddaaaaa")
            }
          })
        }, 500);
        if(cartDataList.length===index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }
}