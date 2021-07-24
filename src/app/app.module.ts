import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItacaNsiniesComponent } from './components/itaca-nsinies/itaca-nsinies.component';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [AppComponent, ItacaNsiniesComponent],
  imports: [BrowserModule, AppRoutingModule, IMaskModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
