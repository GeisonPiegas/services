import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

//GUARD, SERVE PARA CUIDAR SE O USUARIO ESTA LOGADO, DEFENE AS PAGINAS QUE PODE DIRETO NAS ROTAS.
//SE USUARIO ESTIVER LOGADO ELE DIRECIONA DIRETO PARA A PAGINA INICIAL DO APLICATIVO 'MENU'
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navCTRL: NavController){
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if(user) this.navCTRL.navigateRoot('menu/home');

        resolve(!user ? true : false);
      });
    });
  }
}
