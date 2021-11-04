import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NavbarService } from '../nav-meny/nav-meny.service';
import { AdminBruker } from '../models/adminBruker';

@Component({
  templateUrl: './admin-bruker.component.html',
})
export class AdminBrukerComponent implements OnInit {
  adminBruker: AdminBruker;
  laster: boolean;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private modalService: NgbModal,
    public nav: NavbarService
  ) {}

  ngOnInit() {
    this.nav.show();
    this.laster = true;
    this.hentAdminBruker();
  }

  hentAdminBruker() {
    this._http.get<AdminBruker>('/api/admin/hentLoggetInn').subscribe(
      (adminBruker) => {
        this.adminBruker = adminBruker;
        this.laster = false;
      },
      (error) => console.log(error)
    );
  }

  visModalOgEndrePassord() {}
}
