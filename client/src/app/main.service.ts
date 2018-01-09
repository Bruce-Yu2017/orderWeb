import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { error } from 'selenium-webdriver';
import {BehaviorSubject} from "Rxjs";
@Injectable()
export class MainService {
  user;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private _http: Http) {
    if (localStorage.user != undefined) {
      this.user = JSON.parse(localStorage.user);
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

  social_login(social_user, callback) {
    this._http.post("/social", social_user).subscribe(
      (res) => {
        console.log("social login: ", res);
        callback(res.json());
      })
  }

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

  logout() {
    localStorage.removeItem("user");
    
  }

}
