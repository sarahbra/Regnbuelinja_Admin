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
import { BestillingerComponent } from './bestillinger/bestillinger.component';
import { LoginComponent } from './login/login.component';
import { BekreftSlettModal } from './modals/bekreft-slett.modal';
import { NavbarService } from './nav-meny/nav-meny.service';
import { BillettModal } from './modals/billett.modal';
import { KundeComponent } from './kunder/kunde.component';
import { BillettComponent } from './billetter/billett.component';
import { AlertAvhengigheterFinnesModal } from './modals/alert-avhengigheter-finnes.modal';
import { SlettErrorModal } from './modals/slett-error.modal';

@NgModule({
  declarations: [
    AppComponent,
    NavMenyComponent,
    RuterComponent,
    FerderComponent,
    BaaterComponent,
    BestillingerComponent,
    LoginComponent,
    BekreftSlettModal,
    BillettModal,
    KundeComponent,
    BillettComponent,
    AlertAvhengigheterFinnesModal,
    SlettErrorModal,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [NavbarService],
  bootstrap: [AppComponent],
  entryComponents: [BekreftSlettModal],
})
export class AppModule {}
