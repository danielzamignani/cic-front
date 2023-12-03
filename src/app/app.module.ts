import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ItemCardComponent } from './components/pages/menu/components/item-card/item-card.component';
import { StartRatingComponent } from './shared/components/start-rating/start-rating.component';
import { SearchComponent } from './components/pages/menu/components/search/search.component';
import { ItemPageComponent } from './components/pages/item-page/item-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './shared/components/title/title.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputContainerComponent } from './shared/components/input-container/input-container.component';
import { InputValidationComponent } from './shared/components/input-validation/input-validation.component';
import { TextInputComponent } from './shared/components/text-input/text-input.component';
import { DefaultButtonComponent } from './shared/components/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ItemCardComponent,
    StartRatingComponent,
    SearchComponent,
    ItemPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
