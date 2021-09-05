import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthUserService } from 'src/app/services/auth-user.service';
import {AddQuestionComponent} from './add-question/add-question.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  username!: string
  constructor(public dialog: MatDialog, private authService: AuthUserService, private router:Router) { }

  ngOnInit(): void {
    this.username = this.authService.usuario.nombre
    console.log("holaaaaaaaaaaaaaaaaaaaa");
    
  }



  logout(){
    this.authService.logout();
    Swal.fire('Logout',`Hola ${this.authService.usuario.nombre} has cerrado sesion con exito` , 'success')
    this.router.navigate(["/login"])

  }

  

  openDialog(){
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      autoFocus: true,
      width: "600px",
      height: "500px" 
    });
  }

}
