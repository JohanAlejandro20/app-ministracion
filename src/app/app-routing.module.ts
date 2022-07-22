import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {QuestionsModule} from './component/questions/questions.module'
import { QuestionsAdminComponent } from './component/questions-admin/questions-admin.component';
import { AdminGuard } from './guard/admin.guard';
import { ResidentGuard } from './guard/resident.guard';
import { ResponsesComponent } from './component/responses/responses.component';
import { ViewResponseComponent } from './component/view-response/view-response.component';
import { AdminResidentGuard } from './guard/admin-resident.guard';
import { PorfileComponent } from './component/porfile/porfile.component';




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
    
  },
  {
    path: "view-response/:id_pregunta", component: ViewResponseComponent,
    canActivate: [AdminResidentGuard]
    
  },
  {
    path: "profile", component: PorfileComponent,
    canActivate: [AdminResidentGuard]
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
