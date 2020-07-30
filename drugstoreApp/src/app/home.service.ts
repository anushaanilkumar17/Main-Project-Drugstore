import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class HomeService {

  private _homeUrl = "http://localhost:3000/api/home";
  private _addOrderUrl = "http://localhost:3000/api/addorder";

  constructor(private http: HttpClient) { }
 
  getHome() {
    return this.http.get(this._homeUrl)
}
  getAddOrder() {
    return this.http.get(this._addOrderUrl)
  }
}