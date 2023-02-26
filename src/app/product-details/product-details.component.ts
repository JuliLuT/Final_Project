import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, logIn, product } from '../data_type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductsService) { }

  ngOnInit(): void {
    let ProductId = this.activeRoute.snapshot.paramMap.get('productId');
    ProductId && this.product.getProduct(ProductId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (ProductId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((element: product) => ProductId === element.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user) {
        let userId = user && (user[0]).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => ProductId?.toString() == item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }
  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
    }
  }
  /*ADD TO CART IF USER IS NOT LOGGED IN AND ELSE IF THEY ARE LOGGED*/
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true
      } else {
        let user = JSON.parse(localStorage.getItem('user')!)
        let userId = user && (user[0]).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
      this.removeCart = false
    } else {
      console.warn('cardata', this.cartData)
      this.cartData && this.product.removeTocart(this.cartData.id).subscribe((result) => {
        let user = JSON.parse(localStorage.getItem('user')!)
        let userId = user && (user[0]).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false;
  }
}
