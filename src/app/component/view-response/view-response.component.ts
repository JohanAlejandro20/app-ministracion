import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.css']
})
export class ViewResponseComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute, private questionService: QuestionService, private authService: AuthUserService, private router: Router) { }

  id_pregunta: any;
  id_usuario: any
  token: any;
  username!: string;
  validateResponse = true;
  user_data = {
    nombre_pregunta: "",
    descripcion_pregunta: "",
    nombre_usuario: "",
    telefono_usuario: "",
    correo_usuario: "",
    nombre_conjunto: "",
  };

  
  response_data = {
    nombre_usuario: "",
    descripcion_respuesta: ""
  };

  ngOnInit(): void {
    this.token = this.authService.token;
    this.username = this.authService.usuario.nombre;
    this.obtainQuestion();
    this.consultQuestion();
    this.consultResponse();

  }



  obtainQuestion() {
    this.activeRouter.params.subscribe(
      (params: Params) => {
        this.id_pregunta = params.id_pregunta;
      }
    );
  }

  consultQuestion() {
    console.log(this.id_pregunta);

    this.questionService.getQuestionById(this.id_pregunta, this.token).subscribe((res: any) => {
      console.log("soy resssssssssssssssss");

      console.log(res);

      this.user_data = res;

    }, error => {
      console.error(error);

      // Swal.fire('Pregunta', `Lo sentimos esta pregunta no existe`, 'info')
      // this.router.navigate(['/questions-admin']);


      if (error.status == 401) {
        if (this.authService.isAuthenticated()) {
          Swal.fire('Logout', `Hola ${this.authService.usuario.nombre} el token de autenticacion ah expirado`, 'info')
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
      if (error.status == 403) {
        Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} usted no tiene permisos para realizar esta operacion`, 'info')
        this.authService.logout();
        this.router.navigate(['/question']);
      }

      Swal.fire('Error', "Ocurrio un error al consultar la pregunta", 'error')

    });
  }

  consultResponse() {


    this.questionService.getResponseQuestionByIdQuestion(this.id_pregunta, this.token).subscribe((res: any) => {
      console.log("soy resssssssssssssssss");

      console.log(res);
      if(res.error){
        this.validateResponse = false;
      }else{
        this.response_data = res;
        console.log(this.response_data);
      }
      

    }, error => {
      console.error(error);

      // Swal.fire('Pregunta', `Lo sentimos esta pregunta no existe`, 'info')
      // this.router.navigate(['/questions-admin']);


      if (error.status == 401) {
        if (this.authService.isAuthenticated()) {
          Swal.fire('Logout', `Hola ${this.authService.usuario.nombre} el token de autenticacion ah expirado`, 'info')
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
      if (error.status == 403) {
        Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} usted no tiene permisos para realizar esta operacion`, 'info')
        this.authService.logout();
        this.router.navigate(['/question']);
      }

      Swal.fire('Error', "Ocurrio un error al consultar la respuesta", 'error')

    });

  }

  logout() {
    this.authService.logout();
    Swal.fire('Logout', `Hola ${this.authService.usuario.nombre} has cerrado sesion con exito`, 'success')
    this.router.navigate(["/login"])

  }

  backTo(){
    if(this.authService.usuario.roles[0] == "ROLE_ADMINISTRADOR" ){
      this.router.navigate(['/questions-admin'])
    }else{
      this.router.navigate(['/questions'])
      
    }

  }


  profile(){
    this.router.navigate(["/profile"])
  }

}
