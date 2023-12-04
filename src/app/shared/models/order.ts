import { Address } from "./address";
import { CartItem } from "./cart-item";

export class Order {
    id: number;
    items: CartItem[];
    totalPrice: number;
    name: string;
    paymentId: string;
    address: Address;
    createdAt: string;
    status: string;
}