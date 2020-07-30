import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUser = {};
  constructor(private _auth: AuthService,private _router:Router) { }
  ngOnInit() {
  }

  registerUser() {
    if(document.getElementById('admin')['checked'])
    {
      this.registeredUser['type']='admin';
    }
    else
    {
      this.registeredUser['type']='user';
    }
    //console.log(this.registeredUser);
    this._auth.registerUser(this.registeredUser)
    .subscribe(
      res => {
        console.log(res['message']);
       // localStorage.setItem('token',res["token"]);
        this._router.navigate(['/login'])
      }, 
      err => console.log(err)
    )
  }
  
}

