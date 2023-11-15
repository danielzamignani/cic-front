import { Injectable } from '@angular/core';
import { sample_items } from 'src/data';
import { Item } from '../shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  getAll(): Item[] {
    return sample_items;
  }

  getAllItemsByName(name: string) {
    return this.getAll()
    .filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
  }
  
  getAllItemById(id: string) {
    return this.getAll()
    .find(item => item.id === id) || new Item();
  }
}
