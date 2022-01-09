import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DropdownComponent, LocationCardComponent, WeatherOverlayComponent } from './components';

import { LocationReducer, UserReducer } from './store';
import { SvgIconDirective } from './directives';
import { SafeHTML } from './pipes';
import { IconsModule } from './modules/icons/icon.module';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    SearchComponent,
    DropdownComponent,
    LocationCardComponent,
    WeatherOverlayComponent,
    SvgIconDirective,
    SafeHTML
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      locations: LocationReducer,
      user: UserReducer
    }),
    IconsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
