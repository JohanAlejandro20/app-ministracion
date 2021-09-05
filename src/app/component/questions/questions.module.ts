import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionsComponent } from './questions.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {AppRoutingModule} from './questions.routing.module';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [QuestionsComponent,AddQuestionComponent],
  exports:[AddQuestionComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    AppRoutingModule,
    MatMenuModule
  ],
  entryComponents:[AddQuestionComponent] 
})
export class QuestionsModule { 
  
}
