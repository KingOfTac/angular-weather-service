import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, NotFoundComponent } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent, DropdownComponent, LocationCardComponent, WeatherOverlayComponent, LocationDetailsComponent, LocationListComponent, WeatherDataComponent } from './components';

import { locationReducer, locationListReducer } from './store';
import { SvgIconDirective } from './directives';
import { FilterPipe, SafeHTML, GroupPipe, SortPipe } from './pipes';
import { IconsModule } from './modules/icons/icon.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    SearchComponent,
    DropdownComponent,
    LocationCardComponent,
    WeatherOverlayComponent,
    LocationDetailsComponent,
    LocationListComponent,
    SvgIconDirective,
    NotFoundComponent,
    WeatherDataComponent,
    SafeHTML,
    FilterPipe,
    GroupPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      locations: locationReducer,
      locationList: locationListReducer
    }),
    IconsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
