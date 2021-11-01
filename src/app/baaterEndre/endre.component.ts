/* import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { Baat } from '../models/baat';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BaaterComponent } from '../baater/baater.component';


@Component({
  templateUrl: './endre.component.html',
})

export class EndreComponent implements OnInit {
  skjema: FormGroup;

  validering = {
    id: [""],
    navn: [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])]
  }

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    public nav: NavbarService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.hentEnBaat(params.id);
    })
  }

  vedSubmit() {
    this.endreBaat();
  }

  hentEnBaat(id: number) {
    this._http.get<Baat>("api/admin/baat/" + id)
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

}
 */