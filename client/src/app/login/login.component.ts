import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user_reg = {
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    password: ""
  }

  password_confirm = {
    con: ""
  }

  error_message = {
    email: "",
    login: ""
  }

  user_log = {
    email: "",
    password: ""
  }
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._service.login(this.user_log, 
      (res) => {
        // console.log("from login com: ", res);
        if(res.error == undefined) {
          this._router.navigate(['/']);
        }
        else {
          this.error_message.login = res.error;
        }
      });
    this.user_log = {
      email: "",
      password: ""
    };
  }

  register() {
    console.log("from com login: ", this.user_reg);
    this._service.register(this.user_reg,
      (res) => {
        if (res.success === "success") {
          this._router.navigate(['/'])
        }
        else {
          this.error_message.email = "This email has been registered.";
        }
        this.user_reg = {
          first_name: "",
          last_name: "",
          email: "",
          location: "",
          password: ""
        };
        this.password_confirm = {
          con: ""
        };
      })
  }



}
