import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  username!: string
  token: any;
  questions: any;
  validateQuestions = true;
  id_user: any;
  ensemble : any;
  public page: number = 1;
  constructor(public dialog: MatDialog,
    private authService: AuthUserService,
    private router: Router,
    private questionService: QuestionService
  ) {

  }

  ngOnInit(): void {
    this.username = this.authService.usuario.nombre
    this.token = this.authService.token
    this.id_user = this.authService.usuario.id;

    this.consultQuestions();
    this.consultEnsemble();

  }



  logout() {
    this.authService.logout();
    Swal.fire('Logout', `Hola ${this.authService.usuario.nombre} has cerrado sesion con exito`, 'success')
    this.router.navigate(["/login"])

  }

  consultEnsemble(){


    this.questionService.getEnsembleByUser(this.token, this.id_user).subscribe((res: any) =>{
      if (!res.error) {
         this.ensemble = res.nombre_conjunto
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


  consultQuestions() {

    this.questionService.getQuestionsByUser(this.token, this.id_user).subscribe((res: any) => {
      if (!res.error) {
        this.questions = res;
        
        if(this.questions.length>0){
          this.validateQuestions = false;
        }

        
      }
    }, error => {
      console.log(error);

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

  openDialog() {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      autoFocus: true,
      width: "600px",
      height: "400px"
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        console.log("si entre");
        setTimeout(() => {
          this.consultQuestions();
        }, 200);
      }
      
    })
  }

  viewResponse(id_pregunta: any){  

    console.log(id_pregunta);
    
    
    this.router.navigate([`view-response/${id_pregunta}`])

  }

}
