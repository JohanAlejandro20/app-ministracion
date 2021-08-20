import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form= this.fb.group({
      ensemble: ["", Validators.required],
      name: ["",Validators.required],
      lastName: ["",Validators.required],
      email: ["",[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]+")]],
      question:["", Validators.required]
    })
  }

  submit(){
    console.log(this.form);
    console.log("envio a la base de datos :V");
    
    console.log("ya vineeeeeeeeeeee");
    

  }

}
