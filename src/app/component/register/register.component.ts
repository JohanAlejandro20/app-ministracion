import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  conjuntos: any;
  constructor(private fb: FormBuilder, private authService: AuthUserService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.chargeAssembles();    
  }


  createForm(){
    this.form = this.fb.group({
      options: ['1', Validators.required],
      name: ["",Validators.required],
      ensemble: ["",Validators.required],
      phone: ["",[Validators.required,Validators.pattern('^[0-9]+'),Validators.minLength(4),Validators.maxLength(10)]],
      email: ["",[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password:["", [Validators.required, Validators.minLength(5)]],
      confirmPassword: ["",[Validators.required, Validators.minLength(5),]],
      address:[{value:"", disabled: true},"",Validators.required],
      nit:[{value:"", disabled: true}, [Validators.required]]
    },{
      validators: this.samePasswords('password','confirmPassword')
    })

  }

  submit(formDirective: FormGroupDirective){
    console.log(this.form);
    console.log("Envio a la bd");
    if(this.form.valid){
      this.sendRegister(formDirective);
    } 
  }

  resetForm(){
    this.form.reset()
    this.form.get("options")?.setValue("1");
  }


  sendRegister(formDirective: FormGroupDirective){
    const request = 
    {
      activo: true,
      contraseña: this.form.get("password")?.value,
      correo: this.form.get("email")?.value,
      nombre: this.form.get("name")?.value,
      telefono: this.form.get("phone")?.value,
      cod_conjunto: this.form.get("ensemble")?.value,
      cod_rol: parseInt(this.form.get("options")?.value)  
    }

    this.authService.registerUser(request).subscribe((res: any) =>{
      console.log("hola ");
      console.log(res);
      
       if(!res.error){

        this.router.navigate(['/login']);
        Swal.fire('Usuario registrado correctamente', res.Mensaje, 'success')
          
       }else{
        Swal.fire('Error al registrar el usuario', res.Mensaje, 'error')
       }
    },
    error => {
      console.log(error);

      Swal.fire('Error al registrar el usuario', error.message, 'error')
      
    })
    formDirective.resetForm();
    this.resetForm();
  }

  chargeAssembles(){
    this.authService.getAssembles().subscribe(res => {
      console.log(res);
      this.conjuntos = res;
    }, error =>{
      console.log("F");
      
    })
  }

  chargeValuesAssemble(ensemble: any){
    // console.log(this.conjuntos.nombre);
    if(ensemble){
      this.conjuntos.forEach((element:any) => {
          if(ensemble == element.cod_conjunto){
            this.form.get("nit")?.setValue(element.nit);
            this.form.get("address")?.setValue(element.direccion);
          }
      });
    }else{
      console.log(this.form.get("nit")?.setValue(""));
      console.log(this.form.get("address")?.setValue(""));
    }
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

}
