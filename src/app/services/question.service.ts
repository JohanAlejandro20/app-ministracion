import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {map} from  'rxjs/operators'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthUserService) { }


  getQuestionsByUser(token: any, id_user: any, is_response: any, filter: any ) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const params = new HttpParams()
      .set('id_usuario', id_user)
      .set('is_response', is_response)
      .set('filter', filter);


    const url = `${environment.apiUrl}/api/buscar-preguntas-usuario`

    console.log(url);
    

    return this.http.get(url,{headers:httpHeaders,params})

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

  getQuestionByensemble(token: any, id_ensemble:any, filterResponse: any){

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    let params = new HttpParams()
    .set('id', id_ensemble)
    .set('filterResponse',filterResponse )


    const url = `${environment.apiUrl}/api/buscar-preguntas-usuario-conjunto`

    console.log(url);
    

    return this.http.get(url, {headers:httpHeaders, params})

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

      console.log(data);

      if(data.error){
        Swal.fire('Preguta', `Lo sentimos ${data.Mensaje}`, 'info')
        let role = this.authService.usuario.roles;

        if(role[0] == "ROLE_ADMINISTRADOR"){
          console.log("entre");          
          this.router.navigate(['/questions-admin'])
        }else{
          this.router.navigate(['/questions'])

        }
    }

      console.log("holanda");
      
      console.log(data);
      

        request.nombre_pregunta = data.nombre
        request.descripcion_pregunta = data.descripcion
        request.nombre_usuario  = data.usuario.nombre
        request.telefono_usuario = data.usuario.telefono
        request.correo_usuario = data.usuario.correo
        request.nombre_conjunto = data.usuario.conjunto.nombre

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

  public getResponseQuestionByIdQuestion(id_question: any,token: any,){


    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const url = `${environment.apiUrl}/api/buscar-respuesta-by-id-pregunta?id=${id_question}`

    console.log(url);

    return this.http.get(url,{headers:httpHeaders})

  }


  getFilterQuestions(token: any, id_user: any, is_response: boolean) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const params = new HttpParams()
      .set('id_usuario', id_user)
      .set('is_response', is_response);

    const url = `${environment.apiUrl}/api/filtrar-pregunta-usuario-by-respuesta`

    console.log(url);
    

    return this.http.get(url,{headers:httpHeaders, params})

  }


}
