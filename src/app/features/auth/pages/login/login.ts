import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
  selector:'app-login',
  standalone:true,
  imports:[FormsModule],
  templateUrl:'./login.html',
  styleUrls:['./login.css']
})

export class Login{

  email: string=''

  constructor(private router:Router){}

  login(){
    console.log("login con",this.email)

    this.router.navigate(['/tasks'])
  }

}
