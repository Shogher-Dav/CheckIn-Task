import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { InputModalComponent } from './components/input-modal/input-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserCheckinListComponent } from './components/user-checkin-list/user-checkin-list.component';
import { DateDiffHoursPipe } from './core/helpers/DateDiffHoursPipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InputModalComponent,
    UserCheckinListComponent,
    DateDiffHoursPipe
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
