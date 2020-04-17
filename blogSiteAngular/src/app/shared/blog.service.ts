import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';/*
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';*/

import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  selectedBlog: Blog;
  blogs: Blog[];
  readonly baseURL = "http://127.0.0.1:3000/blogs";
  
  constructor(private http: HttpClient) {
    this.blogs = null
  }

  postBlog(blog: Blog, user_id: string) {
    return this.http.post(this.baseURL + `/${user_id}`, blog);
  }

  getBlogList(user_id?: string) {
    if(user_id == null){
      return this.http.get(this.baseURL);
    }
    else{
      return this.http.get(this.baseURL + `/${user_id}`);
    }
  }

  getBlog(blog: Blog) {
    return this.http.get(this.baseURL + `/blog/${blog._id}`);
  }

  putBlog(blog: Blog) {
    return this.http.put(this.baseURL + `/${blog._id}`, blog);
  }

  deleteBlog(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  addLike(blog:Blog, user_id:string){
    return this.http.put(this.baseURL + `/addLike/${blog._id}`, { user_id: user_id })
  }

  addComment(blog:Blog, user_id:string, content:string){
    console.log(content)
    return this.http.put(this.baseURL + `/addComment/${blog._id}`, { user_id: user_id, content: content })
  }
}
