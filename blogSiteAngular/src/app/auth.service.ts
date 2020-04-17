import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

interface myData {
  success: boolean,
  message: string,
  id: number
}
interface registerResponse {
  success: boolean
  message: string
  user_id: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseURL = "http://localhost:3000/users/";
  private httpOptions = {
    //headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };  

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  get isLoggedIn() {
    return this.cookieService.check('user')
  }
  getUserDetails(emailId, password) {
    return this.http.post<myData>(this.baseURL + 'login', {
      emailId,
      password
    })
  }
  registerUser(fullName, emailId, password, websiteName, contact){
    return this.http.post<registerResponse>(this.baseURL + 'register', {
      fullName,
      emailId,
      password,
      websiteName,
      contact
    })
  }
  sendMail(user){
    return this.http.post("http://localhost:3000/sendmail", user)
  }
}
