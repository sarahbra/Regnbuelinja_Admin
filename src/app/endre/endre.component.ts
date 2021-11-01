import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { Baat } from '../models/baat';
import { Rute } from '../models/rute';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  templateUrl: './endre.component.html',
})

export class EndreComponent implements OnInit {
  skjemaBaat: FormGroup;
  skjemaRute: FormGroup;
  visEndreBaat: boolean = false;
  visEndreRute: boolean = false;


  valideringBaat = {
    id: [null, Validators.compose([Validators.required, Validators.pattern("[0-9][0-9]?$|^100")])],
    navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])]
  }

  valideringRute = {
    id: [null, Validators.compose([Validators.required, Validators.pattern("[0-9][0-9]?$|^100")])],
    startpunkt: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])], //må endres
    endepunkt: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])], //må endres
    pris: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])] //må endres
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
  }

  ngOnInit() {
    this.nav.hide();
    this._route.params.subscribe(params => {
      if (params.type == "baat") {
        this.visEndreBaat = true;
        this.hentEnBaat(params.id)
      }
      if (params.type == "rute") {
        this.visEndreRute = true;
        this.henteEnRute(params.id)
      }
    },
      error => console.log(error)
    )
  }


  vedSubmit(type: string) {
    if(type == 'baat'){
      this.endreBaat()
    }
    if(type == 'rute'){
      this.endreRute()
    }
  }



  hentEnBaat(id: number) {
    this._http.get<Baat>("api/admin/baat/" + id)
      .subscribe(
        baat => {
          this.skjemaBaat.patchValue({ id: baat.id });
          this.skjemaBaat.patchValue({ navn: baat.navn });
        },
        error => console.error(error)
      );
  }

  endreBaat() {
    const endretBaat = new Baat();
    endretBaat.id = this.skjemaBaat.value.id;
    endretBaat.navn = this.skjemaBaat.value.navn;

    this._http.put("api/admin/baat/" + endretBaat.id, endretBaat).subscribe( //kan kanskje fjerne id fra backend. Http failure during parsing for 
      retur => {
        this._router.navigate(['/baater'])
      },
      error => console.log(error)
    );
  }




  henteEnRute(id: number) {
    this._http.get<Rute>("api/admin/rute/" + id)
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

    this._http.put("api/admin/rute/" + endretRute.id, endretRute).subscribe( //kan kanskje fjerne id fra backend. F
      retur => {
        this._router.navigate(['/ruter'])
      },
      error => console.log(error)
    );
  }

}
