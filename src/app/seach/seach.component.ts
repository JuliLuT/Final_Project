import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { product } from '../data_type';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.css']
})
export class SeachComponent {
searchResult: undefined|product[];
constructor(private activeRoute:ActivatedRoute, private product:ProductsService) { }

ngOnInit():void{
let query=this.activeRoute.snapshot.paramMap.get('query');
console.log(query);
query && this.product.searchProduct(query).subscribe((result)=>{
this.searchResult=result;
})
}
}
