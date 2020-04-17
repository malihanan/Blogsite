import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';

import { UserService } from './../user.service';
import { BlogService } from './../shared/blog.service';
import { Blog } from './../shared/blog.model';

@Component({
  selector: 'app-show-blogs',
  templateUrl: './show-blogs.component.html',
  styleUrls: ['./show-blogs.component.css']
})
export class ShowBlogsComponent implements OnInit {
  
  @Input() public parentData
  private getAllFlag: boolean
  private likes
  private totalLikes
  private totalComments
  private showComments
  private comments
  private commentBy
  private by

  constructor(private blogService: BlogService, 
    private cookieService: CookieService, 
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.refreshBlogList();
  }

  getAllBlogs() {
    this.getAllFlag = true
  }

  getLessBlogs() {
    this.getAllFlag = false
  }

  like(blog: Blog, i){
    if(this.cookieService.check('user')){
      this.blogService.addLike(blog, this.cookieService.get('user')).subscribe((res) => {
        this.likes[i] = true
        this.totalLikes[i] += 1
      });
    }
    else{
      this.router.navigate(['login'])
    }
  }

  unLike(blog: Blog){
  }

  onSubmit(form: NgForm, blog: Blog, i){
    if(this.cookieService.check('user')){
      this.blogService.addComment(blog, this.cookieService.get('user'), form.value.comment).subscribe((res) => {
        this.totalComments[i] += 1
        form.reset()
        this.refreshBlogList()
        this.showComment(blog, i)
      });
    }
    else{
      this.router.navigate(['login'])
    }
  }
  showComment(blog: Blog, i){
    this.showComments[i] = !this.showComments[i]
    if(this.showComments[i]){
      this.commentBy = []
      if(blog.comments != undefined){
        for(let c of blog.comments){
          this.userService.getData(c.user_id).subscribe( res => {
            this.commentBy.push(res.fullName + " @" + res.websiteName)
          })
        }
      }
    }
  }

  refreshBlogList(){
    this.blogService.getBlogList(this.parentData).subscribe((res) => {
      this.blogService.blogs = res as Blog[];
      this.likes = []
      this.totalLikes = []
      this.totalComments = []
      this.showComments = []
      this.comments = []
      this.by = []
      var b, u
      for(b of this.blogService.blogs){
        this.showComments.push(false)
        this.comments.push(null)
        var user = this.userService.getData(b.user_id).subscribe((res) => {
          this.by.push(res.fullName + " @" + res.websiteName)
        })
        if(b.likes){ this.totalLikes.push(b.likes.length) }
        else{ this.totalLikes.push(0) }
        if(b.comments){ this.totalComments.push(b.comments.length) }
        else{ this.totalComments.push(0) }
        for(u of b.likes){
          if(u == this.cookieService.get('user')){
            this.likes.push(true)
            break
          }
        }
        this.likes.push(false)
      }
    });
  }
}
