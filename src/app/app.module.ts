import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ButtonsModule,ModalModule,BsDatepickerModule} from 'ngx-bootstrap';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { HttpModule } from '@angular/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import {projApi} from './apis';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ButtonsModule.forRoot(),
    ModalModule .forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    GooglePlaceModule,
    HttpModule
    ],
  providers: [projApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
