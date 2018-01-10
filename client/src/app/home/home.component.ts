import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { google } from '@agm/core/services/google-maps-types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  current_user;
  all_foods;
  item = null;
  user: SocialUser;
  loggedIn: boolean;

  lat: number = 37.335480;
  lng: number = -121.893028;


  constructor(private _service: MainService, private _router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.current_user = this._service.user;
    this.authService.authState.subscribe((user) => {
      this.user = user;

      if (this.user !== null) {
        this._service.social_login(this.user, (res) => {

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
      res.map((ele) => {
        return ele.quantity = null;
      })
      this.all_foods = res;
    })
  }


  ngAfterViewInit() {
    // console.log('AfterViewInit');
    function initMap() {
      var options = { lat: 37.335480, lng: -121.893028 };
      var map = new google.maps.Map(document.getElementById('mapCanvas'), {
        zoom: 14
      });
    }

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
    const new_food = Object.assign({}, food);
    this._service.updateData(new_food);

  }

  onChoseLocation(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  logout() {
    this._service.logout();
    this._router.navigate(['/login']);

  }

}
