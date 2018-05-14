import { Component, OnInit,TemplateRef,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService,ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import {projApi} from './apis';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  opportunitiesList;
  modalRef: BsModalRef;
  bsValue = new Date();
  dropdownList = [];
  bgdropdownSettings = {};
  skilldropdownSettings={};
  allbackgroundList;
  allskillList;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @ViewChild('staticModal') public staticModal: ModalDirective;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private api : projApi
) {

  }
  ngOnInit() {
    this.getOpportunitiesList();
    this.getAllBackgroundList();
    this.getAllSkillList();

  this.bgdropdownSettings = {
      singleSelection: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      idField: "id",
      textField: "name",
      limitSelection: 3
  };

  this.skilldropdownSettings = {
    singleSelection: true,
    itemsShowLimit: 3,
    allowSearchFilter: true,
    idField: "id",
    textField: "name"
};
  }

  getAllBackgroundList(){
    this.api.getAllBackgroundList().subscribe(backgroundList => {
      this.allbackgroundList = backgroundList;
    });

  }

  getAllSkillList(){
    this.api.getAllSkillList().subscribe(skillList => {
      this.allskillList = skillList;
    })
  }

getOpportunitiesList() {

    this.api.getOpportunitiesList().subscribe(opportunitiesList => {
     this.opportunitiesList = opportunitiesList;
     this.opportunitiesList.lat = parseInt(this.opportunitiesList.lat);
     this.opportunitiesList.lng = parseInt(this.opportunitiesList.lng);
     this.opportunitiesList.earliest_start_date = new Date(this.opportunitiesList.earliest_start_date);
     this.opportunitiesList.latest_end_date = new Date(this.opportunitiesList.latest_end_date);
     this.opportunitiesList.applications_close_date = new Date(this.opportunitiesList.applications_close_date);
     console.log(this.opportunitiesList);
     this.loadMap();
    });
    
  }

  loadMap(){
    var latlng = new google.maps.LatLng(this.opportunitiesList.lat, this.opportunitiesList.lng);
    let map = new google.maps.Map(document.getElementById('googleMap'), {
      center: latlng,
      zoom: 12
    });

    new google.maps.Marker({
      position: latlng,
      map: map
  });
  }

  submit(){

    var currentDate = new Date();
    if (this.opportunitiesList.applications_close_date < currentDate) {
      alert("Close Date should be between 30 to 90 days from current date");
      return;
    }
    var diff = Math.abs(this.opportunitiesList.applications_close_date.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    if (diffDays >= 30 && diffDays <= 90) {

     this.opportunitiesList.lat = this.opportunitiesList.lat.toString();
     this.opportunitiesList.lng = this.opportunitiesList.lng.toString();
     this.opportunitiesList.earliest_start_date = this.opportunitiesList.earliest_start_date.toISOString();
     this.opportunitiesList.latest_end_date = this.opportunitiesList.latest_end_date.toISOString();
     this.opportunitiesList.applications_close_date = this.opportunitiesList.applications_close_date.toISOString();
     console.log(this.opportunitiesList);
      this.staticModal.hide();
      // post api
    } else {
      alert("Close Date should be between 30 to 90 days from current date")
    }

  }
    
  handleAddressChange(address) {
    console.log(address);
    if (address) {
      this.opportunitiesList.lat = address.geometry.location.lat();
      this.opportunitiesList.lng = address.geometry.location.lng();
      this.opportunitiesList.role_info.city = address.name;
    }
    }

  closeModal() {
    this.staticModal.hide();
    this.getOpportunitiesList();
  }

  onValueChange(value: Date,flag): void {
    if (flag === 'startdate') {
      this.opportunitiesList.earliest_start_date = value;
    }
    if (flag === 'endDate') {
      this.opportunitiesList.latest_end_date = value;
    }
    if (flag === 'closeDate') {
      this.opportunitiesList.applications_close_date = value;
    }
  }

}
