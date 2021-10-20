import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Bruker } from "../models/bruker"

@Component({
    templateUrl: "./login.component.html"
})

export class LoginComponent {
    loginSkjema: FormGroup;



    validering = {
        brukernavn: [
            null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZøæåØÆÅ\\-. ]{2,30}")])
        ],
        passord: [
            null, Validators.compose([Validators.required, Validators.pattern("(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}")])
            // regex kopiert fra backend hender det bruker en annen syntaks her.
        ]
    }

    constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
        this.loginSkjema = fb.group(this.validering);

    }

    vedSubmit() {
        const brukernavn = this.loginSkjema.value.brukernavn;
        const passord = this.loginSkjema.value.passord
        const login = new Bruker(brukernavn, passord)

        this.http.post("api/LoggInn", login)
            .subscribe(ok => {
                if (ok) {
                    this.router.navigate(['/ruter'])
                } //else hva ? 
            },
                error => console.log(error))
    }
}