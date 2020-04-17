import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { BlogService } from './../shared/blog.service';
import { Blog } from './../shared/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private wowService: NgwWowService, 
    private auth: AuthService, 
    private cookieService: CookieService,
    private user: UserService,
    private blogService: BlogService,
    private router: Router) {
    this.wowService.init(); 
  }

  ngOnInit() {
    $(document).ready(function(){
      //(<any>$('[data-toggle="tooltip"]')).tooltip(); 
      $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        if ((<any>this).hash !== "") {
          event.preventDefault();
          var hash = (<any>this).hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 900, function(){
            window.location.hash = hash;
          });
        }
      });
    });
    this.blogService.getBlogList().subscribe((res) => {
      this.blogService.blogs = res as Blog[];
    });
  }

  onSubmit(form: NgForm) {
    this.user.getWebsite(form.value.search).subscribe(data => {
      this.router.navigate(['dashboard', data._id])
    })
  }

  get isLoggedIn(){
    return this.auth.isLoggedIn
  }

  getLoggedInUser(){
    if(this.isLoggedIn){
      return this.cookieService.get('user')
    }
    else{
      return null
    }
  }
  mouseEnter(event){
    if(this.auth.isLoggedIn){
      event.currentTarget.parentElement.parentElement.setAttribute("style", "box-shadow: 0 0 0.8em fuchsia");
    }
    else {
      event.currentTarget.parentElement.setAttribute("style", "box-shadow: 0 0 0.8em fuchsia");
    }
  }

  mouseLeave(event){
    if(this.auth.isLoggedIn){
      event.currentTarget.parentElement.parentElement.setAttribute("style", "box-shadow: 0 0 0");
    }
    else {
      event.currentTarget.parentElement.setAttribute("style", "box-shadow: 0 0 0");
    }
  }

}
