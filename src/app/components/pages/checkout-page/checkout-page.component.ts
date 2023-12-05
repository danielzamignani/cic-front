import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Address } from 'src/app/shared/models/address';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private addressService: AddressService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { name } = this.userService.currentUser;

    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      zipCode: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      street: ['', Validators.required],
      city: ['', Validators.required],
      number: [''],
      complement: [''],
    });

    this.fc.street.disable();
    this.fc.city.disable();

    this.fc.zipCode.valueChanges.subscribe(() => {
      if (this.fc.zipCode.invalid) {
        return;
      }

      this.addressService
        .searchAddress(this.fc.zipCode.value)
        .subscribe({
          next:(res) => {
            if(res.city.includes('undefined')) {
              this.toastrService.warning(`Error searching Zip Code`, `Invalid ZipCode`);

              return;
            }

            this.fc.street.setValue(res.street);
            this.fc.city.setValue(res.city);
          },
          error: (err) => {
            this.toastrService.warning(`Invalid ZipCode`, `${err.message}`);

            return;
          }
      });
    });

    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    this.isSubmitted = true;
    if (this.checkoutForm.invalid) {
      this.toastrService.warning(`Please fill the inputs`, `Invalid Inputs`);

      return;
    }

    const address = new Address();
    address.zipCode = this.fc.zipCode.value;
    address.city = this.fc.city.value;
    address.complement = this.fc.complement.value;
    address.number = this.fc.number.value;
    address.street = this.fc.street.value;

    this.order.address = address;
    this.order.name = this.fc.name.value;

    this.orderService.createOrder(this.order).subscribe({
      next:(res) => {
        this.router.navigateByUrl(`/payment/${res.orderId}`);
      },
      error: ((err) =>{
        this.toastrService.error(`Creating order Error`, `${err.message}`);
      })
    });
  }
}
