import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CheckinService } from 'src/app/core/services/checkin.service';

// Custom Validator for ceck if user name contains only letters or not
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
export class InputModalComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  userForm: FormGroup;
  namePattern = "([a-zA-Z])\w+/g";


  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private checkinService: CheckinService
  ) {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]]
    },
      {
        validators: CustomValidators.nameControl
      })
  }

  ngOnInit(): void {
    // set current user name if exist 
    if (this.checkinService.getNameLocalStr()) {
      this.userForm.get('name')?.setValue(this.checkinService.getNameLocalStr());
    }

  }

  checkIn() {
    const nameObj = this.userForm.value;
    const userLocation = {
      location:
      {
        coordinates: Object.values(this.checkinService.coordinates)
      }
    };
    const userInfo = Object.assign({}, userLocation, nameObj);
    const userUniqName = this.checkinService.getNameLocalStr();

    if (userUniqName) {
      // update userinfo if user checkin not for the first time
      this.checkinService.updateCheckIn(userInfo, userUniqName)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(() => {
          this.checkinService.saveNameLocalStr(this.userForm.get('name')?.value);
        });

    } else {
      // save user when first time checkin
      this.checkinService.checkInUserCurrentLocation(userInfo)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(() => {
          this.checkinService.saveNameLocalStr(this.userForm.get('name')?.value);
        });
    }
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}




