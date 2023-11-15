import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'search/:name', component: MenuComponent},
  { path: 'item/:id', component: ItemPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
