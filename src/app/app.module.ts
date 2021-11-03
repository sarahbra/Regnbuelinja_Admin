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
import { SlettModal } from './modals/slett.modal';
import { NavbarService } from './nav-meny/nav-meny.service';
import { BillettModal } from './modals/billett.modal';
import { KundeComponent } from './kunder/kunde.component';
import { BillettComponent } from './billetter/billett.component';
import { LeggTilRuteModal } from './ruter/legg_tilRute.modal';
import { LeggTilBaatModal } from './baater/legg_tilBaat.modal';
import { LeggTilFerdModal } from './ferder/legg_tilFerd.modal';
import { LeggTilKundeModal } from './kunder/legg_tilKunde.modal';
import { LeggTilBillettModal } from './billetter/legg_tilBillett.modal';
import { LeggTilBestillingModal } from './bestillinger/legg_tilBestilling.modal';

@NgModule({
  declarations: [
    AppComponent,
    NavMenyComponent,
    RuterComponent,
    FerderComponent,
    BaaterComponent,
    BestillingerComponent,
    LoginComponent,
    SlettModal,
    BillettModal,
    KundeComponent,
    BillettComponent,
    LeggTilRuteModal,
    LeggTilBaatModal,
    LeggTilFerdModal,
    LeggTilKundeModal,
    LeggTilBillettModal,
    LeggTilBestillingModal
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
  entryComponents: [SlettModal, LeggTilRuteModal, LeggTilBaatModal, 
    LeggTilFerdModal, LeggTilKundeModal, LeggTilBillettModal, LeggTilBestillingModal], 
})
export class AppModule { }
