import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';


class CustomValidators {

  static nameControl(control: AbstractControl): ValidationErrors | null {
    const name = control.get('name')?.value;
    const nameControl = /^[a-zA-Z]+$/.test(name);
    if (!nameControl) {
      return null;
    } else {
      return { nameFalseSymbols: true };
      }
    }
  }
  @Component({
    selector: 'app-input-modal',
    templateUrl: './input-modal.component.html',
    styleUrls: ['./input-modal.component.scss']
  })
  export class InputModalComponent implements OnInit {

  userForm: FormGroup;

  namePattern = "([a-zA-Z])\w+/g";

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]]
    },
    {
      validators: CustomValidators.nameControl
    })
    

  }

  ngOnInit(): void {
  }

}
