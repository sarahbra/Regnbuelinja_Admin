import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Baat } from '../models/baat';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør ingenting
  templateUrl: './baater.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class BaaterComponent implements OnInit {
  alleBaater: Array<Baat> = [];
  laster: boolean = false;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit() {
    this.laster = true;
    this.hentAlleBaater();
  }

  hentAlleBaater() {
    this.http
      //Endre til nytt endepunkt som henter alle båter.
      .get<Baat[]>('/api/Bestilling/HentBaat', {
        params: {
          id: '1',
          Startpunkt: 'Oslo',
        },
      })
      .subscribe(
        (baater) => {
          this.alleBaater = baater;
          this.laster = false;
        },
        (error) => console.log(error)
      );
  }

  endreBaat(bid: number) {}

  slettBaat(bid: number) {}

  leggTilBaat() {}
}
