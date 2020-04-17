import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private emailId
  private password
  private fullName
  private websiteName
  private sameUser: boolean
  private dash_id
  
  constructor(private user: UserService, 
    private cookieService: CookieService, 
    private router: Router, 
    private route: ActivatedRoute) { 
    router.events.subscribe( s => {
      if(s instanceof NavigationEnd){
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if(element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.dash_id = params['id'].toString()
      this.sameUser = (this.dash_id == this.cookieService.get('user'))
    })
    this.user.getData(this.dash_id).subscribe(data => {
      this.emailId = data.emailId,
      this.password = data.password,
      this.fullName = data.fullName,
      this.websiteName = data.websiteName
    })
  }

  confirmLogout() {
    var answer = window.confirm("Are you sure you want to logout?");
    if(answer)
    {
      this.cookieService.delete('user')
      this.router.navigate([''])
    }
  }
}
