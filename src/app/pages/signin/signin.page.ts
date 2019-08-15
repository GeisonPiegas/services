import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})


export class SigninPage{
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public router: Router,
              private authService: AuthService,
              private toastController: ToastController,
              private network: Network){ 
  
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast('NetWork Desconectada! :-(');
    });

  
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  createAccount(){
    this.router.navigate(['/cadastro']);
  }

  resetPassword(){
    this.router.navigate(['/resetpassword']);
  }

  signIn(){
    if(this.form.form.valid){
      this.authService.signIn(this.user)
      .then(() => {
        this.router.navigate(['menu']);
      })
      .catch((error: any) => {
        if(error.code == 'auth/invalid-email'){
          this.presentToast('E-mail invalido');
        }else if(error.code == 'auth/user-disabled'){
          this.presentToast('Usuario desativado');
        }else if(error.code == 'auth/user-not-found'){
          this.presentToast('Usuario não encontrado');
        }else if(error.code == 'auth/wrong-password'){
          this.presentToast('Senha invalida');
        }
      })
    }
  }

}
