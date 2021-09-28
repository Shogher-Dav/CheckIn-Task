import { Component, OnDestroy, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CheckinService } from 'src/app/core/services/checkin.service';

@Component({
  selector: 'app-user-checkin-list',
  templateUrl: './user-checkin-list.component.html',
  styleUrls: ['./user-checkin-list.component.scss']
})
export class UserCheckinListComponent implements OnInit {

  nearCheckins$: any;
  randomUsersCheckins = [];

  constructor(private checkinService: CheckinService) { }


  ngOnInit(): void {
    this.checkinService.getNearCheckins();
    this.nearCheckins$ = this.checkinService.nearCheckinList$;
  }


}
