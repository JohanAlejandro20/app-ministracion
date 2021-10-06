import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from  'rxjs/operators'

class  usuario {
  nombre!: string;
  telefono!: string;
  id!:number;
  correo!: string;
  username!:string;
  roles:any;
}
 

@Injectable({
  providedIn: 'root'
})

export class AuthUserService {


  private _usuario!: usuario;
  private _token: any = null;

  constructor(private http: HttpClient) { }



  public getAssembles(){
    return this.http.get(environment.apiUrl  + "/api/conjuntos");
  }

  public registerUser(request: any){
    return this.http.post( environment.apiUrl + "/api/registrar", request);
  }

  public login(request: any):Observable<any> {

    console.log(request);
    

    const UrlEndpoint = environment.apiUrl  + "/oauth/token";
    
    const credentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credentials});

    let params = new URLSearchParams();

    params.set('grant_type', 'password')
    params.set('username', request.usuario)
    params.set('password', request.contraseña)


    return this.http.post<any>(UrlEndpoint,params,{headers: httpHeaders})
  } 
 
  
  public saveUser(access_token: string): void{

      let payLoad = this.getDataToken(access_token);
      console.log(payLoad.nombre);
      
      this._usuario = new usuario();

      this._usuario.nombre = payLoad.nombre; 
      this._usuario.telefono = payLoad.telefono; 
      this._usuario.id = payLoad.id_usuario; 
      this._usuario.correo = payLoad.correo; 
      this._usuario.username = payLoad.user_name;
      this._usuario.roles = payLoad.authorities;

      sessionStorage.setItem("Usuario", JSON.stringify(this._usuario));

  }

  public saveToken(access_token: any): void{

    this._token = access_token;
    sessionStorage.setItem("token", this._token);
    
  }

  public getDataToken(access_token: any): any {
    
    if(access_token!= null){
      return JSON.parse(atob(access_token.split('.')['1']));
    }else{
      return null;
    }
  }

  public get usuario(): usuario{

    if(this._usuario!= null){
      return this._usuario
    }else if (this._usuario == null && sessionStorage.getItem("Usuario")){
      this._usuario = JSON.parse(sessionStorage.getItem("Usuario")  || '{}') as usuario;
      return this._usuario;
    }else{
      return new usuario();
    }

  }

  public get token(): any{

    console.log(sessionStorage.getItem("token"));
    console.log(this._token);
    

    if(this._token!= null){
      console.log("f");
      
      return this._token
    }else if (this._token == null && sessionStorage.getItem("token")){
      return this._token =  sessionStorage.getItem("token");
    }else{
      console.log("f");
      
      return null;
    }

    
  }

  public isAuthenticated(): boolean{
    let payload = this.getDataToken(this.token);
    console.log(payload);
    
    if(payload!=  null && payload.user_name && payload.user_name.length > 0 ){
      return true;
    }else{
      return false;
    } 

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

  public logout(){
    this._usuario!=null;
    this._token = null;

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("Usuario")

  }

}
