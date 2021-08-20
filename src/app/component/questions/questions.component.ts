import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddQuestionComponent} from './add-question/add-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("holaaaaaaaaaaaaaaaaaaaa");
    
  }

  

  openDialog(){
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      autoFocus: true,
      width: "600px",
      height: "500px" 
    });
  }

}
