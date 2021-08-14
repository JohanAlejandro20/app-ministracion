import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  public form!: FormGroup;
  constructor(
    private fb: FormBuilder,
  )
  { 

  }

  ngOnInit(): void {

    this.createForm();

  }

  createForm(){
    this.form = this.fb.group({
      email : ["",(Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))  ],
      password: ["",Validators.required]
    })
  }


  logIn(){
    console.log("envio a la base de datos xd");
    console.log(this.form);
    
  }

}
