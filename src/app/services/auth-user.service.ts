import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient) { }


  public getAssembles(){
    return this.http.get("http://localhost:8080/api/conjuntos")
  }

}
