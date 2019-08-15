import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage{
  user: User = new User;
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private AuthService: AuthService,
    private menu: MenuController){
      menu.enable(false);
  }

  createAccount(){
    async function presentAlert(subHeader, message) {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();
    
      const alert = await alertController.create({
        header: 'Alert',
        subHeader: subHeader,
        message: message,
        buttons: ['OK']
      });
      return await alert.present();
    }
    
    /*if(this.form.form.valid){

      this.AuthService.createUser(this.user)
      .then((user: any) => {
        user.sendEmailVerification();
        presentAlert('Sucesso', 'Usuario cadastrado com sucesso');
        this.navCtrl.navigateRoot('HomePage');

      }).catch((error: any) => {
        if(error.code == 'auth/expired-action-code'){
          presentAlert('Erro', 'Usuario ja esta em uso');
        }else if(error.code == 'auth/invalid-action-code'){
          presentAlert('Erro', 'E-mail invalido');
        }else if(error.code == 'auth/user-disabled'){
          presentAlert('Erro', 'Operação não é abilitada');
        }else if(error.code == 'auth/user-not-found'){
          presentAlert('Erro', 'Senha é fraca');
        }

      })
    }
    */
  }


}
