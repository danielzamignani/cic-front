import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../shared/models/item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  createOrder(order: Order): Observable<any> {
    return this.httpClient.post<any>(environment.baseURL + `/order`, order);
  }
}
