import { OrderStatusEnum } from '../constants/order_status';
import { Address } from './address';
import { CartItem } from './cart-item';

export class Order {
  items: CartItem[];
  totalPrice: number;
  name: string;
  address: Address;
}
