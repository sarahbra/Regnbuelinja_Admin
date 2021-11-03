import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Baat } from '../models/baat';
import { Rute } from '../models/rute';
import { Kunde } from '../models/kunde';
import { Ferd } from '../models/ferd';
import { formatDate } from '@angular/common';



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
  visEndreFerd: boolean = false;
  alleBaater: Array<Baat> = [];
  alleRuter: Array<Rute> = [];
  dateArray: Array<string> = [];
  datoSplittet: Array<string> = [];
  tidSplittet: Array<string> = [];
  dato: Date;
  isoDato: string = "";

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
    startpunkt: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZæøåÆØÅ. -]{2,20}'),
      ]),
    ],
    endepunkt: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZæøåÆØÅ. -]{2,20}'),
      ]),
    ],
    //Fortsett HER! Det er noe galt med JSON og pris
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
    ankomstTid: [null, Validators.required],
  };

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
    this.skjemaFerd = _fb.group(this.valideringFerd);
  }

  ngOnInit() {
    this.nav.hide();
    this._route.params.subscribe(
      (params) => {
        switch (params.type) {
          case 'baat':
            this.visEndreBaat = true;
            this.hentEnBaat(params.id);
            break;
          case 'rute':
            this.visEndreRute = true;
            this.hentEnRute(params.id);
            break;
          case 'kunde':
            this.visEndreKunde = true;
            this.hentEnKunde(params.id);
            break;
          case 'ferd':
            this.visEndreFerd = true;
            this.hentEnFerd(params.id);
            break;
          default:
            console.log(params.type)
            break;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  vedSubmit(type: string) {
    switch (type) {
      case 'baat': this.endreBaat();
        break;
      case 'rute': this.endreRute();
        break;
      case 'kunde': this.endreKunde();
        break;
      case 'ferd': this.endreFerd();
        break;
      default:
        console.log(type)
        break;
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

  hentEnFerd(fId: number) {
    this.hentAlleBaater()
    this.hentAlleRuter()

    this._http.get<Ferd>('/api/admin/ferd/' + fId).subscribe(
      (ferd) => {
        this.skjemaFerd.patchValue({ fId: ferd.fId });
        this.skjemaFerd.patchValue({ bId: ferd.bId });
        this.skjemaFerd.patchValue({ rId: ferd.rId });
        this.skjemaFerd.patchValue({ avreiseTid: formatDate(ferd.avreiseTid, 'dd/MM/yyyy HH:mm', 'en-US') });
        this.skjemaFerd.patchValue({ ankomstTid: formatDate(ferd.ankomstTid, 'dd/MM/yyyy HH:mm', 'en-US') });
      },
      (error) => console.log(error)
    );
  }

  endreFerd() {
    const fId = this.skjemaFerd.value.fId;
    const bId = this.skjemaFerd.value.bId;
    const rId = this.skjemaFerd.value.rId;
    const avreiseTid = this.formaterDato(this.skjemaFerd.value.avreiseTid);
    const ankomstTid = this.formaterDato(this.skjemaFerd.value.ankomstTid);

    const endretFerd = new Ferd(bId, rId, avreiseTid, ankomstTid)
    endretFerd.fId = fId;


    this._http.put('/api/admin/ferd/' + fId, endretFerd).subscribe(
      (retur) => {
        this._router.navigate(['/ferder']);
      },
      (error) => console.log(error)
    )

  }

  formaterDato(datoString: string) {
    //Splitter til to deler. Del 1 = dato, del 2 = tid
    this.dateArray = datoString.split(" ", 2);

    //Splitter dato i tre deleer ved "/"
    this.datoSplittet = this.dateArray[0].split("/", 3);

    //Splitter tid i to deler ved ":"
    this.tidSplittet = this.dateArray[1].split(":", 2);

    //Lager ny dato med dato
    this.dato = new Date(parseInt(this.datoSplittet[2]), parseInt(this.datoSplittet[1]) - 1, parseInt(this.datoSplittet[0]));

    //Legger til tid
    this.dato.setHours(parseInt(this.tidSplittet[0]));
    this.dato.setMinutes(parseInt(this.tidSplittet[1]));

    //konvertere til isoString
    return this.isoDato = this.dato.toISOString();

  }




  hentAlleBaater() {
    this._http.get<Baat[]>('/api/admin/baater').subscribe(
      (baater) => {
        this.alleBaater = baater;
      },
      (error) => console.log(error)
    );
  }

  hentAlleRuter() {
    this._http.get<Rute[]>('/api/admin/ruter').subscribe(
      (rutene) => {
        this.alleRuter = rutene;
      },
      (error) => console.log(error)
    );
  }



}
