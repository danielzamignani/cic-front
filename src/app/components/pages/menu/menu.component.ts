import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private itemService: ItemService,
    activatedRoute: ActivatedRoute
  ) {
    let itemsObservable: Observable<Item[]>;
    
    activatedRoute.params.subscribe(params => {
      if(params.name) {
        itemsObservable = this.itemService.getAllItemsByName(params.name);
      } else {
        itemsObservable = itemService.getAllItems();
      }

      itemsObservable.subscribe(items => {
        this.items = items;
      });
    });
  }

  ngOnInit(): void {
    
  }
}
