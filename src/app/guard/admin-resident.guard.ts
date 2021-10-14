import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminResidentGuard implements CanActivate {



  constructor(
    private router: Router,
    private authService: AuthUserService,
  )
  {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      let token  = this.authService.token;
      
      
      console.log("soy guard y token", token)
      
      if(token == null){
        Swal.fire('Login', `Necesita iniciar sesion`, 'info')
        this.router.navigate(['/login']);
        return false;
      }

      let role = this.authService.usuario.roles;
      console.log("soy el rolllllllllll", role[0]);
      
      if(role[0] == "ROLE_RESIDENTE" || role[0] == "ROLE_ADMINISTRADOR"){
        console.log("entre");
        
          return true;
        
      }else{
        console.log("entrewwwwwwwwwwwwwwwww");
        
        Swal.fire('Acceso denegado', `Permisos denegados`, 'info')
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
  }

  
}
