import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  readonly baseURL = "http://localhost:3000/userInputs/";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form){
      form.reset();
    }
  }

  onSubmit(form: NgForm) {
    this.http.post(this.baseURL, {fullName: form.value.fullName, emailId: form.value.emailId, comment: form.value.comment}).subscribe( res => {
      window.alert('Posted your input.')
      this.resetForm(form)
    })
  }

}
