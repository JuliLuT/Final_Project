import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data_type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  userName: string = '';
  searchResult: undefined | product[]
  cartItems=0;
  constructor(private router: Router, private product: ProductsService) { }
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        if (localStorage.getItem('user') && value.url.includes('user')) {
          let userPage = localStorage.getItem('user');
          let userData = userPage && JSON.parse(userPage)[0];
          this.userName = userData.name
          this.menuType = 'user'
        }
        else {
          this.menuType = 'default'
        }
      }
    });
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      this.cartItems=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }
  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }
  redirectToDetails(id:number){
this.router.navigate(['/details/'+id])
  }
  submitSearch(value: string) {
    console.log(value)
    this.router.navigate([`search/${value}`]);
  }
}
