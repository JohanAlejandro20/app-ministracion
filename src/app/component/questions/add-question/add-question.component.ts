import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { QuestionsComponent } from '../questions.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  form!: FormGroup;
  token: any;
  ensemble: any;
  id_user:any

  constructor(private fb: FormBuilder, 
    private questionService: QuestionService, 
    private authService: AuthUserService, 
    private router: Router,
    private dialogRef:MatDialogRef<QuestionsComponent>) { }

  ngOnInit(): void {
    this.token = this.authService.token;
    this.id_user = this.authService.usuario.id;
    this.createForm();
    this.consultEnsemble();
  }


  consultEnsemble(){


    this.questionService.getEnsembleByUser(this.token, this.id_user).subscribe((res: any) =>{
      if (!res.error) {
        console.log("soy ad questions");
        
         this.ensemble = res.nombre_conjunto;
         this.form.get("ensemble")?.setValue(this.ensemble);
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



  createForm(){
    this.form= this.fb.group({
      ensemble: [{value: "", disabled: true}, Validators.required],
      name: ["",[Validators.required,Validators.maxLength(80), Validators.minLength(10)]],
      question:["", [Validators.required, Validators.minLength(10)]]
    })
  }

  submit(){
    console.log(this.form);
    if(this.form.valid){
      this.createQuestion();
    }
  }

  createQuestion(){
    let createQuestion = true;
    
    const request = 
    {
      cod_usuario: this.id_user,
      nombre_pregunta: this.form.get("name")?.value,
      descripcion: this.form.get("question")?.value,
    }
    this.questionService.createQuestion(this.token, request).subscribe((res:any)=>{
      if(!res.error){
        Swal.fire('Pregunta', `Pregunta agregada correctamente`, 'success')
        createQuestion = true;
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
    });

    this.dialogRef.close(createQuestion);

  }

}
