import { Component, OnInit, Input} from '@angular/core';
import { MainService } from './../../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  total_item = [];
  constructor(private _service: MainService, private _router: Router, private authService: AuthService) { }

  
  ngOnInit() {
    this._service.data.subscribe(
      (data) => {
        this.total_item = data;
        console.log(this.total_item.length);

      });
  }

  place_order() {
    this._service.place_order(this.total_item, (res) => {
      console.log(res);
    })
  }

}
