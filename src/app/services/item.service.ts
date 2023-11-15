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
}
