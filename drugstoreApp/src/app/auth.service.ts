import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post(this._loginUrl, user)
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  getToken()
  {
    return localStorage.getItem('token')
  }

  userId()
  {
  let token=localStorage.getItem('token');
  let user="None";
  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    let userId=decodedToken['subject'];
    return userId;
  }
  return user;
}

userRole()
  {
  let token=localStorage.getItem('token');
  let user="None";
  if(!!token)
  {
    let decodedToken = jwt_decode(token);
    let userType=decodedToken['type'];
    return userType;
  }
  return user;
}
}