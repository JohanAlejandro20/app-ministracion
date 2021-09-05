import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions-admin',
  templateUrl: './questions-admin.component.html',
  styleUrls: ['./questions-admin.component.css']
})
export class QuestionsAdminComponent implements OnInit {

  constructor(private authService: AuthUserService, private router:Router) { }

  username!: string

  ngOnInit(): void {
    this.username= this.authService.usuario.nombre;
  }

  logout(){
    this.authService.logout();
    Swal.fire('Logout',`Hola ${this.authService.usuario.nombre} has cerrado sesion con exito` , 'success')
    this.router.navigate(["/login"])

  }
}
