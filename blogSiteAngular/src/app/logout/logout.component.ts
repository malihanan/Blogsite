import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService, private router: Router, private auth: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    var answer = window.confirm("Are you sure you want to logout?");
    if(answer)
    {
      this.cookieService.delete('user')
    }
    this.router.navigate([''])
  }
}
