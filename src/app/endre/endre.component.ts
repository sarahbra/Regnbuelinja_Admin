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
  skjema: FormGroup;
  visEndreBaat: boolean = false;
  visEndreRute: boolean = false;
  

   validering = {
    id: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])],
    navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ. \-]{2,20}")])]
  } 

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    public nav: NavbarService
    
  ) { 
    this.skjema = _fb.group(this.validering);
  }

  ngOnInit() {
    this.nav.hide();
    this._route.queryParams.subscribe(params => {
      if(params.cat == "baat"){
        this.visEndreBaat = true;
        this.hentEnBaat(params.id)
      }
      if(params.cat == "rute"){
        this.visEndreRute = true;
        this.henteEnRute(params.id)
      }
    },
    error=>console.log(error)
    )
  }
  
/*     this._route.params.subscribe(params => {
      if(params.cat == "baat"){
        this.visEndreBaat = true;
        this.hentEnBaat(params.id)
      }
      if(params.cat == "rute"){
        this.visEndreRute = true;
        this.henteEnRute(params.id)
      }
    },
    error=> console.log(error)
    ) */

  vedSubmit() {
    this.endreBaat()
    
  }

  hentEnBaat(id: number) {
    this._http.get<Baat>("api/admin/baat/"+ id)
      .subscribe(
        baat => {
          this.skjema.patchValue({ id: baat.id });
          this.skjema.patchValue({ id: baat.navn });
        },
        error => console.error(error)
      );
  }

  endreBaat(){
    const endretBaat = new Baat();
    endretBaat.id = this.skjema.value.id;
    endretBaat.navn = this.skjema.value.navn;

    this._http.put("api/admin/baat/", endretBaat).subscribe(
      retur => {
        this._router.navigate(['/baater'])
      },
      error => console.log(error)
    );
  }

  henteEnRute(id: number){
    this._http.get<Rute>("api/admin/rute/"+ id)
    .subscribe(
      rute => {
        this.skjema.patchValue({ id: rute.id })
        this.skjema.patchValue({ startpunkt: rute.startpunkt })
        this.skjema.patchValue({ endepunkt: rute.endepunkt })
        this.skjema.patchValue({ pris: rute.pris })
      }
    )
  }

}