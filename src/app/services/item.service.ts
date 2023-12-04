import { Injectable } from '@angular/core';
import { sample_items } from 'src/data';
import { Item } from '../shared/models/item';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(environment.baseURL + '/items');
  }

  getAllItemsByName(name: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(
      environment.baseURL + `/items/search?name=${name}`,
    );
  }

  getItemById(id: string): Observable<Item> {
    return this.httpClient.get<Item>(environment.baseURL + `/items/${id}`);
  }
}
