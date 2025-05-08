import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-app-loder',
  templateUrl: './app-loder.component.html',
  styleUrls: ['./app-loder.component.css']
})
export class AppLoderComponent implements OnInit {

  constructor(
    private userService:UserService,
    private route:Router
  ) { }

  ngOnInit(): void {
this.userService.isLoginStatusObservable.subscribe((status)=>{
  console.log(status);
  
  if(status){
    console.log(status);
    this.route.navigate([''])
  }else{
    this.route.navigate(['/login'])
  }
})
  }

}
