import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {QuestionsModule} from './component/questions/questions.module'
import { QuestionsAdminComponent } from './component/questions-admin/questions-admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ResidentGuard } from './guard/resident.guard';
import { ResponsesComponent } from './component/responses/responses.component';




const routes: Routes = [

  {
    path: "login", component: LoginComponent
  },
  
  {
    path: "questions", loadChildren: ()=>  QuestionsModule,
    canActivate: [ResidentGuard]
  },

  {
    path: "questions-admin", component: QuestionsAdminComponent,
    canActivate: [AdminGuard]
  },

  {
    path: "register", component: RegisterComponent
  },
  {
    path: "response-questions/:id_pregunta", component: ResponsesComponent,
    canActivate: [AdminGuard]
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
