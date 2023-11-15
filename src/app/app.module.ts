import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ItemCardComponent } from './components/pages/menu/components/item-card/item-card.component';
import { StartRatingComponent } from './shared/components/start-rating/start-rating.component';
import { SearchComponent } from './components/pages/menu/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ItemCardComponent,
    StartRatingComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
