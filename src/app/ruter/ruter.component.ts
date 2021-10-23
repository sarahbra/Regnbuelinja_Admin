import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from '../models/rute';
import { Ferd } from '../models/ferd';
import { Router } from '@angular/router';
import { SlettModal } from '../modals/slett.modal';

@Component({
  //selector: 'app-ruter', -> Det er routing som gjelder så denne gjør
  templateUrl: './ruter.component.html',
  //styleUrls: ['./app.ruter.css'],
})
export class RuterComponent implements OnInit {
  alleRuter: Array<Rute> = [];
  laster: boolean = false;

  constructor(private _http: HttpClient, private _router: Router, private modalService: NgbModal) {}

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

  leggTilRute() {}

  hentFerder(id: number) : string {
    let svar = "Mislykket";
    this._http.get<Ferd[]>('/api/admin/ferder/' + id).subscribe(
      (ferdene) => {
        console.log(ferdene);
        console.log(ferdene.length)
        if (ferdene.length == 0){
          console.log("Ingen ferder funnet for rute " + id);
        } else {
          svar = "Rute " + id + " brukes av følgene ferd(er): ";
          console.log("looping")
          for (let i = 0; i < ferdene.length; i++){
            if (i < ferdene.length -1){
              svar += ferdene[i].baat +", ";
            } else {
              svar += ferdene[i].baat;
            }
          }
        }
        
        
      },
      (error) => console.log(error)
    );

    return svar;
  }

  visModalOgSlett(id: number) {
    console.log(id);
    const modalRef = this.modalService.open(SlettModal, {
      backdrop: 'static', keyboard: false
    });

    let textBody: string = "Ruten med id "+ id + "kan slettes. Vil du slette Rute " +id+"?";

    this._http.get<Ferd[]>('/api/admin/ferder/' + id).subscribe(
      (ferdene) => {
        console.log(ferdene);
        console.log(ferdene.length)
        if (ferdene.length == 0){
          modalRef.componentInstance.updateBody(textBody);
          textBody += "Er du sikker "
        } else {
          textBody = "Rute " + id + " kan ikke slettes. Den brukes av følgene ferd(er): ";
          console.log("looping")
          for (let i = 0; i < ferdene.length; i++){
            if (i < ferdene.length -1){
              textBody += ferdene[i].id + ", ";
            } else {
              textBody += ferdene[i].id + ". ";
            }
          }

          //updated tsconfig.json
          textBody += "Slett gjeldene ferder for å kunne slette rute "+ id;
          modalRef.componentInstance.updateBody(textBody);
        }
        
        
      },
      (error) => console.log(error)
    );

    modalRef.result.then(retur => {
        console.log('Lukket med:' + retur);
        if (retur == "Slett") {
          
          this._http.delete("api/admin/rute/slett/" + id)
            .subscribe(retur => {
              this.hentAlleRuter();
            },
              error => console.log(error)
            );
        }
        this._router.navigate(['/ruter']);
     });
  }


}
