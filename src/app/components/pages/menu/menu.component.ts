import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    activatedRoute.params.subscribe(params => {
      if(params.name) {
        this.items = this.itemService.getAllItemsByName(params.name);
      } else {
        this.items = itemService.getAll();
      }
    })
  }

  ngOnInit(): void {
    
  }
}
