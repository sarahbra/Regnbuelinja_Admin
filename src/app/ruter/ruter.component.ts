import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from '../models/rute';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør
  templateUrl: './ruter.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class RuterComponent implements OnInit {
  alleRuter: Array<Rute> = [];
  laster: boolean = false;

  constructor(private _http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlleRuter();
  }

  hentAlleRuter() {
    this._http.get<Rute[]>('/api/admin/ruter').subscribe(
      (rutene) => {
        this.alleRuter = rutene;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  endreRute(id: number) {}

  slettRute(id: number) {}

  leggTilRute() {}
}
