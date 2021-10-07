import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from  'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private router: Router) { }


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

  getQuestionByensemble(token: any, id_ensemble:any){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/buscar-preguntas-usuario-conjunto?id=${id_ensemble}`

    console.log(url);
    

    return this.http.get(url,{headers:httpHeaders})

  }


  public getQuestionById (id_question: any, token: any){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/buscar-preguntas-Byid?id=${id_question}`

    console.log(url);
    let request = {
      nombre_pregunta: "",
      descripcion_pregunta: "",
      nombre_usuario: "",
      telefono_usuario: "",
      correo_usuario: "",
      nombre_conjunto: "",
    };



    // return this.http.get(url,{headers:httpHeaders})


    return this.http.get(url,{headers:httpHeaders}).pipe( map( (data: any) =>{

      if(data.error){
        Swal.fire('Preguta', `Lo sentimos ${data.Mensaje}`, 'info')
        this.router.navigate(['/questions-admin'])
      }

      console.log("holanda");
      
      console.log(data);
      

        request.nombre_pregunta = data.nombre
        request.descripcion_pregunta = data.descripcion
        request.nombre_usuario  = data.usuario.nombre
        request.telefono_usuario = data.usuario.telefono
        request.correo_usuario = data.usuario.correo
        request.nombre_conjunto = data.usuario.conjunto.nombre
        // request2.nombre.rol= data.usuario.roles

        return request;
       
    }));


  }

  public responseQuestion(request: any, token: any){


    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/responder-pregunta`;

    return this.http.post(url, request, {headers:httpHeaders})


  }

}
