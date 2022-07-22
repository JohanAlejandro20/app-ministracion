import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  constructor(private authService: AuthUserService, private router:Router, private activeRouter : ActivatedRoute, private fb: FormBuilder, private questionService: QuestionService ) { }



  id_pregunta: any;
  id_usuario: any
  token : any
  username!: string;
  form!: FormGroup;
  user_data = {
    nombre_pregunta: "",
    descripcion_pregunta: "",
    nombre_usuario: "",
    telefono_usuario: "",
    correo_usuario: "",
    nombre_conjunto: "",
  };

  ngOnInit(): void {

    this.obtainQuestion();
    console.log(this.id_pregunta);
    this.token = this.authService.token;
    this.username= this.authService.usuario.nombre;
    this.id_usuario= this.authService.usuario.id;

    this.consultQuestion();
    this.createForm();
    

  }

  obtainQuestion(){
    this.activeRouter.params.subscribe(
      (params: Params) => {
        this.id_pregunta = params.id_pregunta;
      }
    );
  }

  consultQuestion(){
    this.questionService.getQuestionById(this.id_pregunta, this.token).subscribe((res: any) =>{
      console.log("soy resssssssssssssssss");

      console.log(res);
      
      this.user_data = res;
      
    }, error =>{
      console.log(error);
      
      Swal.fire('Pregunta', `Lo sentimos esta pregunta no existe`, 'info')
      this.router.navigate(['/questions-admin']);


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
    });
  }

  createForm(){
    this.form = this.fb.group({
      name_response: [''],
      description_response:["", Validators.required]
    })
  }

  adminQuestion(){
    this.router.navigate(['/questions-admin'])
  }

  logout(){
    this.authService.logout();
    Swal.fire('Logout',`Hola ${this.authService.usuario.nombre} has cerrado sesion con exito` , 'success')
    this.router.navigate(["/login"])

  }

  submit(){
    console.log("hola");
    console.log(this.form);
    
    if(this.form.valid){
      this.responseQuestion();
    }
  }


  responseQuestion(){
    console.log("hola");
    
    const request = {
      cod_pregunta: parseInt(this.id_pregunta) ,
      cod_usuario: this.id_usuario,
      descripcion: this.form.get("description_response")?.value
    }
    console.log(request);
    

    this.questionService.responseQuestion(request, this.token).subscribe((res:any) =>{
      console.log(res);
      if(!res.error){
        Swal.fire('Pregunta',`Pregunta respondida correctamente` , 'success')
        this.router.navigate(['/questions-admin'])
      }else{
        Swal.fire('Error', "Ocurrio un error al responder la pregunta", 'error')
      }
    }, error =>{
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

      Swal.fire('Error', "Ocurrio un error al responder la pregunta", 'error')

    })
  }


  profile(){
    this.router.navigate(["/profile"])
  }

}
