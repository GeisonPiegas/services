import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

//GUARD, SERVE PARA CUIDAR SE O USUARIO ESTA LOGADO, DEFENE AS PAGINAS QUE PODE DIRETO NAS ROTAS.
//SE NÃO ESTIVER LOGADO ELE LEVA PARA A PAGINA DE LOGIN
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private navCTRL: NavController){

  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if(!user) this.navCTRL.navigateRoot('signin');

        resolve(user ? true : false);
      });
    });
  }

}
