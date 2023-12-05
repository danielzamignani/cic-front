export class Payment {
  cardHolderName: string;
  cardHolderDocument: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  paymentMethod: 'debit' | 'credit';
}
