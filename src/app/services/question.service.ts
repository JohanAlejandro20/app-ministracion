import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }


  getQuestionsByUser(token: any, id_user: any) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/buscar-preguntas-usuario?id=${id_user}`

    console.log(url);
    

    return this.http.get(url,{headers:httpHeaders})

  }


  getEnsembleByUser(token: any, id_user: any){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/buscar-nombre-conjunto-usuario?id=${id_user}`

    console.log(url);
    

    return this.http.get(url,{headers:httpHeaders})

  }

  createQuestion(token: any, request: any){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/realizar-pregunta`

    return this.http.post(url, request, {headers:httpHeaders})

  }

}
