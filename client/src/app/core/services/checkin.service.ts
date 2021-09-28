import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICheckin } from '../interfaces/ICheckin';
import { BehaviorSubject, Observable } from 'rxjs';

const NAME = 'name';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  private _coordinates: any;
  nearCheckinList$: BehaviorSubject<any> = new BehaviorSubject(null);


  get coordinates(): any {
    return this._coordinates
  }

  set coordinates(coord: any) {
    this._coordinates = coord;

  }

  getNameLocalStr(): any {
    return localStorage.getItem(NAME);
  }

  saveNameLocalStr(name: string): void {
    localStorage.setItem(NAME, name);
  }
  constructor(private httpClient: HttpClient) { }

  checkInUserCurrentLocation(userCheckIn: ICheckin): Observable<any> {
    return this.httpClient.post<ICheckin>(`api/checkins`, userCheckIn);

  }

  updateCheckIn(userCheckIn: ICheckin, name: string): Observable<any> {
    return this.httpClient.put(`api/checkins/${name}`, userCheckIn);
  }


  getNearCheckins(): any {
    return this.httpClient.get(`api/checkins`).subscribe((res: any )=> {
      this.nearCheckinList$.next(res.data);
    });
  }


}
