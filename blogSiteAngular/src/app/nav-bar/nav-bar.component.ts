import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthService, 
    private router: Router,
    private user: UserService) { }

  ngOnInit() {
  }

  get isLoggedIn(){
    return this.auth.isLoggedIn
  }

  onSubmit(form: NgForm) {
    this.user.getWebsite(form.value.search).subscribe(data => {
      this.router.navigate(['dashboard', data._id])
    })
  }
}
