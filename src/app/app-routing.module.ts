import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {QuestionsModule} from './component/questions/questions.module'




const routes: Routes = [

  {
    path: "login", component: LoginComponent
  },
  
  {
    path: "questions", loadChildren: ()=>  QuestionsModule
  },

  // {
  //   path: "questions",
  //   loadChildren: './component/questions/questions.module#QuestionsModule'
  // },

  {
    path: "register", component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
