import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { QuestionsComponent } from './component/questions/questions.component';



const routes: Routes = [

  {
    path: "login", component: LoginComponent
  },
  
  {
    path: "questions", component: QuestionsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
