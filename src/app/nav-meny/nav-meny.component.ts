import { Component } from '@angular/core';

@Component({
  //Denne skal erstatte app-navn-meny i app.component.html
  selector: 'app-nav-meny',
  templateUrl: './nav-meny.component.html',
  styleUrls: ['./nav-meny.css'],
})
export class NavMenyComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
