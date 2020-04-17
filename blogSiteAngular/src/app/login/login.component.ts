import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private emailId
  private password

  constructor(private wowService: NgwWowService, 
    private auth: AuthService, 
    private router: Router, 
    private cookieService: CookieService) { 
      this.wowService.init(); 
  }
  ngOnInit() {
  }

  loginUser(event) {
    this.auth.getUserDetails(this.emailId, this.password).subscribe(data => {
      if(data.success) {
        this.cookieService.set('user', data.id.toString())
        this.router.navigate(['dashboard' + `/${this.cookieService.get('user')}`])
      } else {
        window.alert(data.message)
      }
    })
  }
}