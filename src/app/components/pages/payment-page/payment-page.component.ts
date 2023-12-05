import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/order';
import { Payment } from 'src/app/shared/models/payment';
import { ValidateCardExpiry } from 'src/app/shared/validators/validate-card-expiry.validator';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent {
  order: Order = new Order();
  orderAddress: string = '';
  paymentForm: FormGroup;
  isSubmitted: boolean = false;
  orderId: string = '';

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private cartService: CartService,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((param) => {
      if (param.orderId) {
        this.orderId = param.orderId;

        orderService.getOrderById(this.orderId).subscribe({
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

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', [Validators.required, Validators.minLength(3)]],
      cardHolderDocument: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          ValidateCardExpiry,
        ],
      ],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      paymentMethod: ['debit', Validators.required],
    });
  }

  get fc() {
    return this.paymentForm.controls;
  }

  finishPayment() {
    this.isSubmitted = true;
    if (this.paymentForm.invalid) {
      this.toastrService.warning(`Please fill the inputs`, `Invalid Inputs`);

      console.log(this.paymentForm.controls);

      return;
    }

    const payment = new Payment();
    payment.cardHolderName = this.fc.cardHolderName.value;
    payment.cardHolderDocument = this.fc.cardHolderDocument.value;
    payment.cardNumber = this.fc.cardNumber.value;
    payment.cvv = this.fc.cvv.value;
    payment.expirationDate = this.fc.expirationDate.value;
    payment.paymentMethod = this.fc.paymentMethod.value;

    this.cartService.clearCart();

    this.orderService.finishPayment(this.orderId, payment).subscribe({
      next: (res) => {
        this.router.navigateByUrl(`/track/${this.orderId}`)
      },
      error: () => {},
    });
  }
}
