import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private fullName
  private password
  private confirmPassword
  private websiteName
  private contact

  constructor(private wowService: NgwWowService, private Auth: AuthService, private router: Router, private cookieService: CookieService, private user: UserService) { 
    this.wowService.init();
    this.user.getData(this.cookieService.get('user')).subscribe(res => {
      console.log(res)
      this.fullName = res.fullName
      this.password = res.password
      this.confirmPassword = res.password
      this.websiteName = res.websiteName
      this.contact = res.contact
    })
  }

  ngOnInit() {
  }

  registerUser(event) {
    event.preventDefault()
    const errors = []

    if(!this.fullName){
      errors.push("Full Name required")
    }
    if(!this.password){
      errors.push('Password required.')
    }
    else{
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
      this.user.editUser(this.cookieService.get('user'), {fullName: this.fullName, password: this.password, websiteName: this.websiteName, contact: this.contact}).subscribe(data => {
        console.log("Data Received");
        console.log(data)
        if(data.success) {
          window.alert(data.message)
          this.Auth.getUserDetails
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
