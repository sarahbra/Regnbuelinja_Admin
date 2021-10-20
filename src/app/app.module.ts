import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';


import { NavMenyComponent } from './nav-meny/nav-meny.component';
import { RuterComponent } from './ruter/ruter.component';
import { FerderComponent } from './ferder/ferder.component';
import { BaaterComponent } from './baater/baater.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenyComponent,
    RuterComponent,
    FerderComponent,
    BaaterComponent,
    LoginComponent,
  ],

  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
