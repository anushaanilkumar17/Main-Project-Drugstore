import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {}

  constructor(private _auth: AuthService, private _router:Router, private fb:FormBuilder) { }
  
  loginForm = this.fb.group(
    {
      email:['',[Validators.required, Validators.pattern('')]],
      password:['', [Validators.required, Validators.pattern('')]]
    }
  )

  ngOnInit() {
    
  }

  loginUser()
  {
    this._auth.loginUser(this.loginUserDetails)
    .subscribe(
      res => {
        localStorage.setItem('token', res["token"]);
        this._router.navigate(['/contact'])
      },

      err => console.log(err)
    )
  }

}
  
