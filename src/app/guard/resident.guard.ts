import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ResidentGuard implements CanActivate {

  constructor(private authService: AuthUserService, private router: Router){

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
      if(role[0] != "ROLE_RESIDENTE"){
        Swal.fire('Acceso denegado', `Permisos denegados`, 'info')
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
    
    return true;
  }

}
