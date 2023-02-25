import { Component, OnInit } from '@angular/core';
import { signUp } from '../data_type';
import { RegisterAuthService } from '../services/register-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.css']
})
export class RegisterAuthComponent implements OnInit {
  constructor(private register:RegisterAuthService){}
  ngOnInit():void{
    this.register.reloadUser();
  }
  signUp(data:signUp):void{
    this.register.userSignup(data);
  }
}
