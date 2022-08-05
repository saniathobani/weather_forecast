/// <reference types="@types/googlemaps" />
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ForecastComponent } from './components/forecast/forecast.component';

@NgModule({
  declarations: [AppComponent, ForecastComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsJ459Ft7flC-TxVJSO9P19WH2fwJdqTY',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
