import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css'],
})
export class OrderTrackPageComponent {
  order: Order = new Order();
  orderAddress: string = '';

  constructor(
    orderService: OrderService,
    activatedRoute: ActivatedRoute,
    router: Router,
  ) {
    activatedRoute.params.subscribe((param) => {
      if (param.orderId) {
        orderService.getOrderById(param.orderId).subscribe({
          next: (order) => {
            this.order = order;

            const address = this.order.address;
            this.orderAddress = `${address.street}, ${
              address.number ? 'N' + address.number : 'S/N'
            } - ${this.order.address.city}/${this.order.address.uf}`;
          },
          error: () => {
            router.navigateByUrl('/checkout');
          },
        });
      }
    });
  }
}
