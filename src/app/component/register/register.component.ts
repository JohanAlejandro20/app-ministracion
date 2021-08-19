import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
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
      address:["",Validators.required],
      nit:["", [Validators.required]]
    },{
      validators: this.samePasswords('password','confirmPassword')
    })

  }

  submit(){
    console.log(this.form);
    console.log("Envio a la bd");
    
    
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
