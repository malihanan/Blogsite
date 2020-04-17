import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myData {
  message: string,
  success: boolean,
  user_id: string
}
interface myUser {
  _id: string
  emailId: string,
  password: string,
  fullName: string,
  websiteName: string,
  contact
}
interface isLoggedIn {
  status: boolean
}
interface logoutStatus {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseURL = "http://localhost:3000/users/";
  constructor(private http: HttpClient) { }

  getSomeData() {
    return this.http.get<myData>(this.baseURL + '')
  }
  
  getData(id){
    return this.http.get<myUser>(this.baseURL + id)
  }

  getWebsite(websiteName: string){
    return this.http.post<myUser>(this.baseURL + '/findWebsite', { websiteName })
  }

  editUser(id, user) {
    return this.http.put<myData>(this.baseURL + id, user)
  }
}
