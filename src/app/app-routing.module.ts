import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'search/:name', component: MenuComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/:orderId',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
