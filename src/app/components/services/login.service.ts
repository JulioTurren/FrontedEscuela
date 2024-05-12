import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

// @Injectable({
//   providedIn: 'root'
// })

export class LoginService {

  constructor(private http: HttpClient) {}

  URL: string = "http://localhost:3000/api"


  LoginAlumno(body: any): Observable<any> {

    try {
      return this.http.post<any>(this.URL + '/login', body)
    } catch (error) {
      throw(error)
    }

  }



}
