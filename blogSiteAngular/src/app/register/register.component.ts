import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { match } from 'minimatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private fullName
  private emailId
  private password
  private confirmPassword
  private websiteName
  private contact

  constructor(private wowService: NgwWowService, private Auth: AuthService, private router: Router, private cookieService: CookieService) {
    this.wowService.init();
  }

  ngOnInit() {
  }

  registerUser(event) {
    event.preventDefault()
    const errors = []

    if(!this.fullName){
      errors.push("Full Name required")
    }
    if(!this.emailId){
      errors.push("Email required")
    }
    else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailId)){
        errors.push("Email Id is invalid")
      }
    }
    if(!this.password){
      errors.push('Password required.')
    }
    else{
//      if(!/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})$/.test(this.password)){
      if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/.test(this.password)){
        errors.push("Password not strong enough.")
      }
      else{
        if(this.password != this.confirmPassword){
          errors.push("Passwords don't match")
        }
      }
    }
    if(!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(this.contact)){
      errors.push("Invalid contact number.")
    }

    if(errors.length == 0) {
      this.Auth.registerUser(this.fullName, this.emailId, this.password, this.websiteName, this.contact).subscribe(data => {
        console.log("Data Received");
        console.log(data)
        if(data.success) {
          window.alert(data.message)
          this.Auth.getUserDetails
          this.Auth.sendMail({name: this.fullName, emailId: this.emailId}).subscribe(res => {
            window.alert("Mail sent, reistered successfully.")
          })
          this.cookieService.set('user', data.user_id)
          this.router.navigate(['dashboard' + `/${data.user_id}`])
        }
        else{
          window.alert(data.message)
        }
      })
    }
    else {
      window.alert(errors)
    }
  }
}
