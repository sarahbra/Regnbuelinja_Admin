import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RuterComponent } from './ruter/ruter.component';
import { BaaterComponent } from './baater/baater.component';
import { FerderComponent } from './ferder/ferder.component';

const routes: Routes = [
  { path: 'ruter', component: RuterComponent },
  { path: 'ferder', component: FerderComponent },
  { path: 'baater', component: BaaterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'ruter', pathMatch: 'full' }, //Dette er default: Hvis ingenting er oppgitt
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
