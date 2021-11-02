import { NgModule } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
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
import { BekreftSlettModal } from './modals/slett-modaler/bekreft-slett.modal';
import { NavbarService } from './nav-meny/nav-meny.service';
import { VisAvhengigheterModal } from './modals/slett-modaler/vis-avhengigheter.modal';
import { KundeComponent } from './kunder/kunde.component';
import { BillettComponent } from './billetter/billett.component';
import { AlertAvhengigheterFinnesModal } from './modals/slett-modaler/alert-avhengigheter-finnes.modal';
import { SlettErrorModal } from './modals/slett-modaler/slett-error.modal';
import { EndreComponent } from './endre/endre.component';
import { VisBilletterForBestilling } from './modals/vis-billetter-for-bestilling.modal';

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
    VisAvhengigheterModal,
    KundeComponent,
    BillettComponent,
    AlertAvhengigheterFinnesModal,
    SlettErrorModal,
    EndreComponent,
    VisBilletterForBestilling,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],

  providers: [
    NavbarService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [BekreftSlettModal],
})

export class AppModule { }

function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}
