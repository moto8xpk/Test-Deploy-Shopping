import { Component, OnInit } from '@angular/core';
import { Item } from 'src/model/Item.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/service/product.service';
import { Product } from 'src/model/product.model';
import { ProductConfirm } from '../../../model/productConfirm.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

   items: Item[] = [];
   total: number = 0;
  product= new ProductConfirm();

  constructor(private activatedRoute: ActivatedRoute,private productService: ProductService) { }

  ngOnInit() {
   

    this.activatedRoute.params.subscribe(params => {
			var id = params['id'];
			if (id) {
        this.productService.getProduct(id)
      .subscribe(data => {
        let Oject = Object.entries(data[0]);
        console.log(data);
        this.product.id = Number(Oject[0][1]);
        this.product.name = String(Oject[1][1]);
        this.product.productCategoryId = Number(Oject[2][1]["id"]);
        this.product.productCategoryName = String(Oject[2][1]["name"]);
        this.product.price = Number(Oject[3][1]);
        this.product.desc = String(Oject[4][1]);
        this.product.imagelink = String(Oject[5][1]);

        var item: Item = {
					product: this.product,
					quantity: 1
        };
        console.log(item);
				if (localStorage.getItem('cart') == null) {
					let cart: any = [];
          cart.push(JSON.stringify(item));
          console.log(JSON.stringify(cart));
          localStorage.setItem('cart', JSON.stringify(cart));
          console.log("dk1");
				} else {
          console.log("dk2");
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.id == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));
					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart();
      }, error => console.log(error));

				
			} else {
				this.loadCart();
			}
		});
  }

  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == Number(id)) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}

}
