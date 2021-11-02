import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { Baat } from '../models/baat';
import { Rute } from '../models/rute';
import { Kunde } from '../models/kunde';
import { Ferd } from '../models/ferd';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KundeComponent } from '../kunder/kunde.component';


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
    navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])]
  }

  valideringRute = {
    id: [null, Validators.required],
    startpunkt: [null, Validators.required], //må endres
    endepunkt: [null, Validators.required], //må endres
    pris: [null, Validators.required] //må endres
  }

  valideringKunde = {
    id: [null, Validators.required],
    fornavn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,30}")])],
    etternavn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,30}")])],
    epost: [null, Validators.compose([Validators.required, Validators.pattern("[a-z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})")])],
    telefonnr: [null, Validators.compose([Validators.required, Validators.pattern("[0-9]{8}")])]
  }

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
    this._route.params.subscribe(params => {
      if (params.type == "baat") {
        this.visEndreBaat = true;
        this.hentEnBaat(params.id)
      }else if (params.type == "rute") {
        this.visEndreRute = true;
        this.henteEnRute(params.id)
      }else {
        this.visEndreKunde = true;
        this.henteEnKunde(params.id)
      }
    },
      error => {
        console.log(error)
      }
    )
  }


  vedSubmit(type: string) {
    if (type == 'baat') {
      this.endreBaat()
    }
    if (type == 'rute') {
      this.endreRute()
    }
    if (type == 'kunde') {
      this.endreKunde()
    }
  }



  hentEnBaat(id: number) {
    this._http.get<Baat>("/api/admin/baat/" + id)
      .subscribe(
        baat => {
          this.skjemaBaat.patchValue({ id: baat.id });
          this.skjemaBaat.patchValue({ navn: baat.navn });
        },
        error => {
          console.error(error)
        }
      );
  }

  endreBaat() {
    const endretBaat = new Baat();
    endretBaat.id = this.skjemaBaat.value.id;
    endretBaat.navn = this.skjemaBaat.value.navn;

    this._http.put("/api/admin/baat/" + endretBaat.id, endretBaat).subscribe(
      retur => {
        this._router.navigate(['/baater'])
      },
      error => {
        console.log(error)
      }
    );
  }


  henteEnRute(id: number) {
    this._http.get<Rute>("/api/admin/rute/" + id)
      .subscribe(
        rute => {
          this.skjemaRute.patchValue({ id: rute.id })
          this.skjemaRute.patchValue({ startpunkt: rute.startpunkt })
          this.skjemaRute.patchValue({ endepunkt: rute.endepunkt })
          this.skjemaRute.patchValue({ pris: rute.pris })
        }
      )
  }

  endreRute() {
    const endretRute = new Rute();
    endretRute.id = this.skjemaRute.value.id;
    endretRute.startpunkt = this.skjemaRute.value.startpunkt;
    endretRute.endepunkt = this.skjemaRute.value.endepunkt;
    endretRute.pris = this.skjemaRute.value.pris;

    this._http.put("/api/admin/rute/" + endretRute.id, endretRute).subscribe(
      retur => {
        this._router.navigate(['/ruter'])
      },
      error => {
        console.log(error)
      }
    );
  }

  henteEnKunde(id: number) {
    this._http.get<Kunde>("/api/admin/kunde/" + id)
      .subscribe(
        kunde => {
          this.skjemaKunde.patchValue({ id: kunde.id })
          this.skjemaKunde.patchValue({ fornavn: kunde.fornavn })
          this.skjemaKunde.patchValue({ etternavn: kunde.etternavn })
          this.skjemaKunde.patchValue({ epost: kunde.epost })
          this.skjemaKunde.patchValue({ telefonnr: kunde.telefonnr })
        }
      )
  }

  endreKunde(){
    const endretKunde = new Kunde();
    endretKunde.id = this.skjemaKunde.value.id;
    endretKunde.fornavn = this.skjemaKunde.value.fornavn;
    endretKunde.etternavn = this.skjemaKunde.value.etternavn;
    endretKunde.epost = this.skjemaKunde.value.epost;
    endretKunde.telefonnr = this.skjemaKunde.value.telefonnr;

    this._http.put("/api/admin/kunde/"+ endretKunde.id, endretKunde).subscribe(
      retur => {
        this._router.navigate(['/kunder'])
      },
      error => {
        console.log(error)
      }
    );
  }

}
