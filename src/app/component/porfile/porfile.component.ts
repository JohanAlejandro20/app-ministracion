import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.css']
})
export class PorfileComponent implements OnInit {

  form!: FormGroup;
  token: any;
  id_user:any;
  ensemble:any;
  username!: string

  constructor(private fb: FormBuilder, private authService: AuthUserService, private miDatePipe: DatePipe,private questionService: QuestionService, private router:Router,) { }

  ngOnInit(): void {
    this.username= this.authService.usuario.nombre;
    this.token = this.authService.token
    this.id_user = this.authService.usuario.id;
    this.createForm();
    this.consultEnsemble();
  }

  createForm(){
    this.form = this.fb.group({
      name: ["",Validators.required],
      ensemble: [{disabled:true,value:""}],
      phone: ["",[Validators.required,Validators.pattern('^[0-9]+'),Validators.minLength(4),Validators.maxLength(10)]],
      email: ["",[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      statusActivate:[{disabled:true,value:""},],
      changePassword:[false],
      newPassword:[""],
      confirmPassword:[""],
      createdAt:[{disabled:true,value:""},],
      Role:[{disabled:true,value:""}]

    },{
      validators: this.samePasswords('newPassword','confirmPassword')
    })
  }
  
  chargueForm(){


    this.form.get("name")?.setValue(this.authService.usuario.nombre)
    this.form.get("phone")?.setValue(this.authService.usuario.telefono)
    this.form.get("email")?.setValue(this.authService.usuario.correo)
    this.form.get("statusActivate")?.setValue(this.authService.usuario.estado)
    const fechaFormateada = this.miDatePipe.transform(this.authService.usuario.creacion, 'yyyy-MM-dd');
    this.form.get("createdAt")?.setValue(fechaFormateada);
    this.form.get("ensemble")?.setValue(this.ensemble);
    let role = this.authService.usuario.roles;
    const RolUser = role[0] == "ROLE_RESIDENTE" ? "RESIDENTE": "ADMINISTRADOR";
    this.form.get("Role")?.setValue(RolUser);
    

  }

  validPassword(confirmPassword: any){ 
      console.log(confirmPassword);
      
    
    if(confirmPassword.checked){
      this.form.get("newPassword")?.setValidators([Validators.required]);
      this.form.get("confirmPassword")?.setValidators([Validators.required])
    }else{
      
      this.form.get("newPassword")?.setValidators([]);
      this.form.get("confirmPassword")?.setValidators([])
    }
    this.form.get("newPassword")?.updateValueAndValidity();
    this.form.get("confirmPassword")?.updateValueAndValidity();


  }


  submit(){
    if(this.form.valid){
      Swal.fire({
        title: 'Estas seguro',
        text: "Si actualizas tus datos se cerrara la sesion y deberas ingresar con los datos actualizados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si,enviar!',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const request = {
            cod_user:  this.id_user,
            nombre:    this.form.get("name")?.value,
            telefono:  this.form.get("phone")?.value,
            correo:    this.form.get("email")?.value,
            cambiaContraseña: this.form.get("changePassword")?.value,
            nuevaContraseña:   this.form.get("confirmPassword")?.value,
          }
  
  
          console.log(request);
          
          this.authService.updateUser(request,this.token).subscribe((res:any) =>{
            console.log(res);
            
            if(!res.error){
              this.logout();
            }else{
              Swal.fire('Error', "Ocurrio un error al actualizar el usuario " + res.Mensaje , 'error')
            }
            
          }, error=>{
            console.log(error);
            console.log("holaaaaaaaa");
            
  
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
  
            Swal.fire('Error', "Ocurrio un error al actualizar el usuario ", 'error')
  
          })
        }
      })




    }
   
    
  } 

  
  logout() {
    this.authService.logout();
    Swal.fire('Logout', `Hola ${this.authService.usuario.nombre} has cerrado sesion con exito`, 'success')
    this.router.navigate(["/login"])

  }

  
  consultEnsemble(){


    this.questionService.getEnsembleByUser(this.token, this.id_user).subscribe((res: any) =>{
      console.log(res);
      
      if (!res.error) {
         this.ensemble = res.nombre_conjunto;
         this.chargueForm();
        }else{
          Swal.fire('Error', "Ocurrio un error al consultar el conjunto ", 'error')
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


  samePasswords(password: string, confirmPassword:string){
    
    return( formGroup: FormGroup)=>{
      const pass1Control = formGroup.controls[password];
      const pass2Control = formGroup.controls[confirmPassword];

      if(pass1Control.value == pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual: true})
      }

    }

  }


  backTo(){
    if(this.authService.usuario.roles[0] == "ROLE_ADMINISTRADOR" ){
      this.router.navigate(['/questions-admin'])
    }else{
      this.router.navigate(['/questions'])
      
    }

  }




}
