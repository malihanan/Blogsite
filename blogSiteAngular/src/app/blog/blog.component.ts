import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogService } from './../shared/blog.service';
import { Blog } from './../shared/blog.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {

  private tagString: string
  private getAllFlag: boolean

  constructor(private blogService: BlogService, private cookieService: CookieService, private router: Router) { 
    this.getAllFlag = false
  }

  ngOnInit() {
    this.resetForm();
    this.refreshBlogList();
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
    }
    this.blogService.selectedBlog = {
      _id: "",
      user_id: "",
      title: "",
      content: "",
      tags: [],
      likes: [],
      comments: [],
      date: null
    }
  }

  onSubmit(form: NgForm) {
    if(!this.cookieService.check('user')) {
      this.router.navigate(['login'])
    }
    form.value.tags = []
    var tagslistarr = this.tagString.split(' ')
    tagslistarr.forEach(element => {
      if(element.indexOf('#') == 0){
        form.value.tags.push(element)
      }
    })
    if(form.value._id == ""){
      this.blogService.postBlog(form.value, this.cookieService.get('user')).subscribe((res)=> {
        this.resetForm(form);
        this.refreshBlogList();
        //can display successful message here
      });
    }
    else {
      this.blogService.putBlog(form.value).subscribe((res)=> {
        this.resetForm(form);
        this.refreshBlogList();
      });
    }
  }

  refreshBlogList() {
    if(this.cookieService.check('user')){
      this.blogService.getBlogList(this.cookieService.get('user')).subscribe((res) => {
        this.blogService.blogs = res as Blog[];
      });
    }
    else{
      this.blogService.blogs = undefined
    }
  }

  onEdit(blog: Blog) {
    this.blogService.selectedBlog = blog
    this.tagString = blog.tags.join(' ')
  } 

  onDelete(_id: string, form: NgForm){
    if(confirm('are you sure you want to delete this record?') == true){
      this.blogService.deleteBlog(_id).subscribe((res) => {
        this.refreshBlogList();
        this.resetForm(form);
      });
    }
  }

  getAllBlogs() {
    this.getAllFlag = true
  }

  getLessBlogs() {
    this.getAllFlag = false
  }
}
