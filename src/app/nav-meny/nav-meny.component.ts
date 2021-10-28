import { Component } from '@angular/core';
import { NavbarService } from './nav-meny.service';


@Component({
  //Denne skal erstatte app-navn-meny i app.component.html
  selector: 'app-nav-meny',
  templateUrl: './nav-meny.component.html',
  styleUrls: ['./nav-meny.css'],
})
export class NavMenyComponent {

  constructor(public nav: NavbarService) {
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
