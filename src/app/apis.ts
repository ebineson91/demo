import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpParams } from '@angular/common/http';

export interface opportunitiesList {
  earliest_start_date?: string;
  latest_end_date?: string;
  applications_close_date?:string;
}

export interface UpdateUser {
  userName: string;
  password?: string;
  otp?: string;
}

export interface ChangePwd {
  otp?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface Module {
  moduleId?: number;
  moduleDesc?: string;
  icon?: string;
  displayFnType: boolean;
  types?: FnType[];
}

export interface FnType {
  typeId?: number;
  typeDesc?: string;
  functions?: Function[];
}

export interface Function {
  functionId?: number;
  functionDesc?: string;
  url?: string;
  visible?: boolean;
  tasks? : number[];
}

@Injectable()
export class projApi {
  constructor(private http: HttpClient) { }
  params = new HttpParams().set('access_token', 'dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c');

  getOpportunitiesList() {
    return this.http.get('http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/1624',{params:this.params})
      .map((res) => {
        return res;
      });
  }

  getAllBackgroundList() {
    return this.http.get('http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/backgrounds',{params:this.params})
      .map((res) => {
        return res;
      });
  }

  getAllSkillList() {
    return this.http.get('http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/lists/skills',{params:this.params})
      .map((res) => {
        return res;
      });
  }

}
