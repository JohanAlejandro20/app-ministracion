import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthUserService,
    private router: Router
  )
  { 

  }

  ngOnInit(): void {


    if(this.authService.isAuthenticated()){
      if(this.authService.usuario.roles[0] == "ROLE_ADMINISTRADOR"){
        this.router.navigate(['/questions-admin']);
      }else{
        this.router.navigate(['/questions']);

      }
      Swal.fire('Login',`Hola ${this.authService.usuario.nombre} ya estas autenticado` , 'info')
    }else{
      console.log("holi");
      
    }

    this.createForm();

  }

  createForm(){
    this.form = this.fb.group({
      email : ["",(Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))  ],
      password: ["",Validators.required]
    })
  }


  logIn(){
    if(this.form.valid){
      this.sendLogin();
    }
  }

  sendLogin(){
    
    const request = 
    {
      usuario: this.form.get("email")?.value,
      contraseña: this.form.get("password")?.value,
    }

    this.authService.login(request).subscribe((res: any) =>{

      this.authService.saveUser(res.access_token);
      this.authService.saveToken(res.access_token);
      
      let usuario = this.authService.usuario;
      let token = this.authService.token;
      
      console.log(usuario.roles[0]);
      

      if(usuario.roles[0] == "ROLE_ADMINISTRADOR" ){
        this.router.navigate(['/questions-admin'])
      }else{
        this.router.navigate(['/questions'])
        
      }
      Swal.fire('Login',`Hola ${this.authService.usuario.nombre} has iniciado sesion con exito` , 'success')
      
    },error => {

      Swal.fire('Error Login', "Error al ingresar el usuario", 'error')

      if(error.status == 400){
        Swal.fire('Error Login', "Usuario o clave incorrecta!! ", 'error')
      }
    });

  }
}
