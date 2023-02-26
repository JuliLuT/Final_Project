import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from '../data_type';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    total: 0
  }
  constructor(private product: ProductsService) {

  }
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price+ (+ item.price*item.quantity)
        }
      })
      this.priceSummary.price=price;
      this.priceSummary.total=price;
      console.log(this.priceSummary)
    })
  }

}
