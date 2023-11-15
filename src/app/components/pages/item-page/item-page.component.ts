import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent {
  item: Item;

  constructor( 
    activatedRoute: ActivatedRoute,
    itemService: ItemService
  ) {
    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.item = itemService.getAllItemById(params.id);
      }
    });
  }
}
