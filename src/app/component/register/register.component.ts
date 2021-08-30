import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  conjuntos: any;
  constructor(private fb: FormBuilder, private authService: AuthUserService) { }

  ngOnInit(): void {
    this.createForm();
    this.chargeAssembles();    
  }


  createForm(){
    this.form = this.fb.group({
      options: ['1'],
      name: ["",Validators.required],
      ensemble: ["",Validators.required],
      phone: ["",[Validators.required,Validators.pattern('^[0-9]+'),Validators.minLength(4),Validators.maxLength(10)]],
      email: ["",[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password:["", [Validators.required]],
      confirmPassword: ["",[Validators.required]],
      address:[{value:"", disabled: true},"",Validators.required],
      nit:[{value:"", disabled: true}, [Validators.required]]
    },{
      validators: this.samePasswords('password','confirmPassword')
    })

  }

  submit(){
    console.log(this.form);
    console.log("Envio a la bd");
    
    
  }

  chargeAssembles(){
    this.authService.getAssembles().subscribe(res => {
      console.log(res);
      this.conjuntos = res;
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
