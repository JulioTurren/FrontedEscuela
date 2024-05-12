import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()

export class RegistroService {

  constructor(private http: HttpClient) { }

  URL: string = "http://localhost:3000/api"
  public id: any;


  //Registro
  RegistroAlumno(body:any): Observable <any> {
    try {
      return this.http.post<any>(this.URL + '/registro-estudiante', body)
    } catch (error) {
      throw (error)
      console.log(error)
    }

  }

    //traer usuario por id
    ApiGetById(id: String): Observable<any>{
      try {

        const token = localStorage.getItem('token');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get<any>(this.URL + '/lista-alumno/' + id, {headers: headers })

      } catch (error) {
        throw (error)
        console.log(error)
      }
    }

}
