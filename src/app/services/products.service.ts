import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data_type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  cartData = new EventEmitter<product[] | []>()

  constructor(private http: HttpClient) { }
  getProduct(id: any) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  popularProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=4");
  }
  trendyProducts() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=10");
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((element: product) => productId !== element.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items)
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData)
  }
  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      })


  }
}
