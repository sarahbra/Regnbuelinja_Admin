import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rute } from "../Rute";
import { Baat } from "../Baat";

@Component({
  templateUrl: "ruter.html"
})

export class Ruter {
  alleRuter: Array<Rute>;
  laster: boolean;

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit() {
    this.laster = true;
    this.hentAlleRuter();
  }

  hentAlleRuter() {
    this.http.get<Rute[]>("api/ruter/")
      .subscribe(rutene => {
        this.alleRuter = rutene;
        this.laster = false;
      },
        error => console.log(error)
      );
  };

  //hentBaat(id) {
  //  this.http.get<Baat>("api/baat/" + id) {
  //    .subscribe(baat => {
  //      this.
  //    })
  //  }
  //}
}
