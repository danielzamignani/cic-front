import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  name = '';
  
  constructor(
    activatedRoute: ActivatedRoute,
    private router: Router
    ) {
      activatedRoute.params.subscribe((params) => {
        if(params.name) this.name = params.name;
      });
    }

  search(name: string): void {
    if(name) {
      this.router.navigateByUrl(`/search/${name}`);
    }
  }
}
