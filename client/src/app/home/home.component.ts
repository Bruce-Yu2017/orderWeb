import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  current_user;
  all_foods;
  item = null;
  user: SocialUser;
  loggedIn: boolean;

  constructor(private _service: MainService, private _router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.current_user = this._service.user;
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      localStorage.social_user = JSON.stringify(user)
      if(this.user !== null) {
        this._service.check_user(this.user, (res) => {
        if(res == "exist") {
          console.log("success social login");
        }
        else {
          console.log(res);
          this._router.navigate(["/update"]);
        }
      })
      }
      
      this._service.social_user = user;
      this.loggedIn = (user != null);
    });
    this._service.retrieveAllFood((res) => {
      res.map((ele)=>{
        return ele.quantity = null;
      })
      this.all_foods = res;
    })

    
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    
    
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this._service.check_user(this.user, (res) => {
      if(res == "exist") {
        console.log("success social login");
      }
      else {
        console.log("need update");
        this._router.navigate(["/update"]);
      }
    })
  }

  signOut(): void {
    this.authService.signOut();
    this._service.retrieveAllFood((res) => {
      res.map((ele)=>{
        return ele.quantity = null;
      })
      this.all_foods = res;
    })
  }

  create_order(food) {
    const new_food = Object.assign({},food);
    this._service.updateData(new_food);
    
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/login']);
    
  }

}
