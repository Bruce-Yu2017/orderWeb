import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { error } from 'selenium-webdriver';

import { BehaviorSubject } from "rxjs";


@Injectable()
export class MainService {
  user;
  social_user;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private _http: Http) {
    if (localStorage.user != undefined) {
      this.user = JSON.parse(localStorage.user);
    }
    if (localStorage.social_user != undefined) {
      this.social_user = JSON.parse(localStorage.social_user);
    }
  }

  updateData(newData: any): void {
    const tempData = this.data.getValue();
    var exist = false;
    var index = null;
    for(var i = 0; i < tempData.length; i++) {
      if(tempData[i]._id == newData._id) {
        if(newData.quantity == 0) {
          index = i;
        }
        else {
          tempData[i].quantity = newData.quantity;
          
        }
        exist = true;
      }
    }
    if(index !== null) {
      tempData.splice(index, 1);
      console.log("true");
    }

    if(!exist) {
      tempData.push(newData);
    }
    this.data.next(tempData);
  }

  register(userdata, callback) {
    this._http.post("/register", userdata).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if (res.json().success == "success") {
          this.user = res.json().user;
          localStorage.user = JSON.stringify(res.json().user);
        }
      },
      (err) => {
        console.error("from service register error: ", err);
      }
      )
  }

  login(userdata, callback) {
    // console.log(userdata);
    this._http.post("/login", userdata).subscribe(
      (res) => {
        callback(res.json());
        this.user = res.json();
        if (res.json().error == undefined) {
          this.user = res.json();
          // console.log("from service login: ", this.user);
          localStorage.user = JSON.stringify(res.json());
        }
      },
      (err) => {
        console.log("error from login service: ", err);
      })
  }

  //add a new user by admin
  add_new(userdata, callback) {
    this._http.post("/register", userdata).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
      },
      (err) => {
        console.log("from service add_new error: ", err);
      }
      )
  }

  create_item(food,callback){

    this._http.post('/foods', food).subscribe(
      (res) => {
        console.log("from service create_item: ", res.json());
        callback(res.json());
      },
      (err) => {
        console.log("from service add_new error: ", err);
      }
      )
  };

  

  retrieveAllFood(callback) {
    this._http.get("/foods").subscribe((res) => {
      callback(res.json());
    })
  }

  place_order(order, callback) {
    this._http.post("/orders", order).subscribe((res) => {
      callback(res.json())
    })
  }

  check_user(social_user, callback) {
    console.log(social_user);
    this._http.post("/checkuser", social_user).subscribe((res) => {
      callback(res.json());
    })
  }

  logout() {
    localStorage.removeItem("user");
    
  }

}
