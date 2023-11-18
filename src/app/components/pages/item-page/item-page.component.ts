import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent {
  item: Item;

  constructor( 
    activatedRoute: ActivatedRoute,
    itemService: ItemService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.item = itemService.getAllItemById(params.id);
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.item);
    this.router.navigateByUrl('/cart-page');
  }
}
