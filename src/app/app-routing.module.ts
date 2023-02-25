import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import { SeachComponent } from './seach/seach.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: LoginAuthComponent,
    path: 'login'
  },
  {
    component: RegisterAuthComponent,
    path: 'registro'
  },
  {
    component: UserHomeComponent,
    path: 'userHome',
    canActivate: [AuthGuard]
  },
  {
    component:CartComponent,
    path:'cart',
    canActivate: [AuthGuard]
  },
  {
    component:SeachComponent,
    path:'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productId'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
