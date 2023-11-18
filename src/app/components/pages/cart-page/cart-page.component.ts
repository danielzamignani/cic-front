import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart: Cart;

  constructor(
    private cartService: CartService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.item.id);
  }

  changeQuantity(cartItem: CartItem, quantity: string) {
    this.cartService.changeQuantity(cartItem.item.id, parseInt(quantity));
  }
} 
