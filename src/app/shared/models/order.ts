import { Address } from './address';
import { CartItem } from './cart-item';

export class Order {
  items: CartItem[];
  totalPrice: number;
  name: string;
  address: Address;
  id?: string;
  createdAt?: string;
  paymentId?: string;
  status?: string;
  orderName?: string;
}
