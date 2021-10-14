import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions-admin',
  templateUrl: './questions-admin.component.html',
  styleUrls: ['./questions-admin.component.css']
})
export class QuestionsAdminComponent implements OnInit {

  constructor(private authService: AuthUserService, private router:Router, private questionService: QuestionService) { }
  
  token: any;
  id_user:any;
  ensemble : any;
  username!: string
  cod_conjunto: any
  questions: any;
  validateResponse = true;
  public page: number = 1;

  ngOnInit(): void {
    this.username= this.authService.usuario.nombre;
    this.token = this.authService.token
    this.id_user = this.authService.usuario.id;
    this.consultEnsemble();
    // this.consultQuestionByEnsemble();
    
  }

  consultQuestionByEnsemble(){

    console.log("conjunto codigo",this.cod_conjunto);
    
    this.questionService.getQuestionByensemble(this.token, this.cod_conjunto).subscribe((res:any)=>{
      console.log(res);
      if (!res.error) {
        this.questions = res;
        
        if(this.questions.length>0){
          this.validateResponse = false;
        }

        
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
        this.router.navigate(['/login']);
      }
    })

  }

  consultEnsemble(){


    this.questionService.getEnsembleByUser(this.token, this.id_user).subscribe((res: any) =>{
      console.log(res);
      
      if (!res.error) {
         this.ensemble = res.nombre_conjunto;
         this.cod_conjunto = res.cod_conjunto;
         console.log(this.cod_conjunto);
         this.consultQuestionByEnsemble()
         
        }
      
    },error=>{

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
        this.router.navigate(['/login']);
      }
    })
  }


  logout(){
    this.authService.logout();
    Swal.fire('Logout',`Hola ${this.authService.usuario.nombre} has cerrado sesion con exito` , 'success')
    this.router.navigate(["/login"])

  }

  response(id_pregunta: any){
    console.log(id_pregunta);
    this.router.navigate([`response-questions/${id_pregunta}`])
    
  }

  viewResponse(codigo_pregunta: any){
    console.log(codigo_pregunta);
    
    
    this.router.navigate([`view-response/${codigo_pregunta}`])
  }
}
