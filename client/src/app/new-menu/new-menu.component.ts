import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit {
  current_user;
  input = new FormData();
  constructor(private _service: MainService, private _router: Router) { }
  new_food={
    food_name:"",
    price:"",
    description:"",
    image:null,
  };
    image;
  logout(){
    
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      console.log(event.target.files)
      let file = event.target.files[0];
      this.new_food.image = file;
      reader.onload = () => {
        this.new_food.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
    
  }
  
  create(){
    this._service.create_item(this.new_food, (res)=>{
      this.image = res[0].image;
    })
  }
  ngOnInit() {
    this.current_user = this._service.user;
  }

}
