import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'legg_til.modal.html'
})
export class LeggTilModal {
    div: any;
    objekt: any;
    //allForms: FormGroup;
    allForms: Array<FormControl>;
    inputForm: any;
    
   
    constructor(public modal: NgbActiveModal){ }

/*
    setForms(forms: FormGroup){
        this.allForms = forms;
    }
*/
    setForms(forms: Array<FormControl>){
        this.allForms = forms;

        console.log(this.allForms[0].valid);
        console.log(this.allForms[0].pristine);
    }

    setBody(body: string){
        //this.body = body;
        this.div = document.getElementById('div_body');
        this.div?.insertAdjacentHTML('beforeend', body);
    }

    lagre(){
        var childDivs = this.div.getElementsByClassName('*');
        for (var child in childDivs){
        }
    }
}