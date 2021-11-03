import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { Baat } from '../models/baat';
import { Rute } from '../models/rute';
import { Kunde } from '../models/kunde';
import { Ferd } from '../models/ferd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './endre.component.html',
})
export class EndreComponent implements OnInit {
  skjemaBaat: FormGroup;
  skjemaRute: FormGroup;
  skjemaKunde: FormGroup;
  skjemaFerd: FormGroup;
  visEndreBaat: boolean = false;
  visEndreRute: boolean = false;
  visEndreKunde: boolean = false;

  valideringBaat = {
    id: [null, Validators.required],
    navn: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZæøåÆØÅ. -]{2,20}'),
      ]),
    ],
  };

  valideringRute = {
    id: [null, Validators.required],
    startpunkt: [null, Validators.required], //må endres
    endepunkt: [null, Validators.required], //må endres
    pris: [null, Validators.required], //må endres
  };

  valideringKunde = {
    id: [null, Validators.required],
    fornavn: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZæøåÆØÅ. -]{2,30}'),
      ]),
    ],
    etternavn: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZæøåÆØÅ. -]{2,30}'),
      ]),
    ],
    epost: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}'),
      ]),
    ],
    telefonnr: [
      null,
      Validators.compose([Validators.required, Validators.pattern('[0-9]{8}')]),
    ],
  };

  valideringFerd = {
    fId: [null, Validators.required],
    bId: [null, Validators.required],
    rId: [null, Validators.required],
    avreiseTid: [null, Validators.required],
    ankomstTid: [null, Validators.required]
  }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    public nav: NavbarService
  ) {
    this.skjemaBaat = _fb.group(this.valideringBaat);
    this.skjemaRute = _fb.group(this.valideringRute);
    this.skjemaKunde = _fb.group(this.valideringKunde);
  }

  ngOnInit() {
    this.nav.hide();
    this._route.params.subscribe(
      (params) => {
        //Endre til switch case
        if (params.type == 'baat') {
          this.visEndreBaat = true;
          this.hentEnBaat(params.id);
        }
        if (params.type == 'rute') {
          this.visEndreRute = true;
          this.hentEnRute(params.id);
        }
        if (params.type == 'kunde') {
          this.visEndreKunde = true;
          this.hentEnKunde(params.id);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  vedSubmit(type: string) {
    if (type == 'baat') {
      this.endreBaat();
    }
    if (type == 'rute') {
      this.endreRute();
    }
    if (type == 'kunde') {
      this.endreKunde();
    }
  }

  hentEnBaat(id: number) {
    this._http.get<Baat>('/api/admin/baat/' + id).subscribe(
      (baat) => {
        this.skjemaBaat.patchValue({ id: baat.id });
        this.skjemaBaat.patchValue({ navn: baat.navn });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  endreBaat() {
    const id = this.skjemaBaat.value.id;
    const navn = this.skjemaBaat.value.navn;
    const endretBaat = new Baat(navn);
    endretBaat.id = id;
    this._http.put('/api/admin/baat/' + id, endretBaat).subscribe(
      (retur) => {
        this._router.navigate(['/baater']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  hentEnRute(id: number) {
    this._http.get<Rute>('/api/admin/rute/' + id).subscribe((rute) => {
      this.skjemaRute.patchValue({ id: rute.id });
      this.skjemaRute.patchValue({ startpunkt: rute.startpunkt });
      this.skjemaRute.patchValue({ endepunkt: rute.endepunkt });
      this.skjemaRute.patchValue({ pris: rute.pris });
    });
  }

  endreRute() {
    const id = this.skjemaRute.value.id;
    const startpunkt = this.skjemaRute.value.startpunkt;
    const endepunkt = this.skjemaRute.value.endepunkt;
    const pris = parseFloat(this.skjemaRute.value.pris);

    const endretRute = new Rute(startpunkt, endepunkt, pris);
    endretRute.id = id;    
    this._http.put('/api/admin/rute/' + id, endretRute).subscribe(
      (retur) => {
        this._router.navigate(['/ruter']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  hentEnKunde(id: number) {
    this._http.get<Kunde>('/api/admin/kunde/' + id).subscribe(
      (kunde) => {
        this.skjemaKunde.patchValue({ id: kunde.id });
        this.skjemaKunde.patchValue({ fornavn: kunde.fornavn });
        this.skjemaKunde.patchValue({ etternavn: kunde.etternavn });
        this.skjemaKunde.patchValue({ epost: kunde.epost });
        this.skjemaKunde.patchValue({ telefonnr: kunde.telefonnr });
      },
      (error) => console.log(error)
    );
  }

  endreKunde() {
    const id = this.skjemaKunde.value.id;
    const fornavn = this.skjemaKunde.value.fornavn;
    const etternavn = this.skjemaKunde.value.etternavn;
    const epost = this.skjemaKunde.value.epost;
    const telefonnr = this.skjemaKunde.value.telefonnr;

    const endretKunde = new Kunde(fornavn, etternavn, epost, telefonnr);
    endretKunde.id = id;

    this._http.put('/api/admin/kunde/' + id, endretKunde).subscribe(
      (retur) => {
        this._router.navigate(['/kunder']);
      },
      (error) => console.log(error)
    );
  }
}