import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {QuestionsModule} from './component/questions/questions.module'
import { QuestionsAdminComponent } from './component/questions-admin/questions-admin.component';




const routes: Routes = [

  {
    path: "login", component: LoginComponent
  },
  
  {
    path: "questions", loadChildren: ()=>  QuestionsModule
  },

  {
    path: "questions-admin", component: QuestionsAdminComponent
  },

  {
    path: "register", component: RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
