import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user;
  constructor(private _service: MainService, private _router: Router) { }

  ngOnInit() {
    this.user = this._service.social_user;
    console.log(this.user);
  }

}
