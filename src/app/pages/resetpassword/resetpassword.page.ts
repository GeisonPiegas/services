import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage {
  userEmail: string = '';
  @ViewChild('form') form: NgForm;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    private authService: AuthService,
    private menu: MenuController){
      menu.enable(false);
  }

  resetPassword(){
    async function presentAlert(txt: string, msg: string) {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();
    
      const alert = await alertController.create({
        header: 'Alert',
        subHeader: txt,
        message: msg,
        buttons: ['OK']
      });
      return await alert.present();
    }
    
    if (this.form.form.valid) {
      this.authService.resetPassword(this.userEmail)
        .then(() => {
          presentAlert('Aviso','Solicitação foi enviada para o seu e-mail.');
          this.router.navigate(['/signin']);
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            presentAlert('Erro','O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-not-found') {
            presentAlert('Erro','O usuário não foi encontrado.');
          }
        });
    }
  }

  voltarPage(){
    this.navCtrl.pop();
  }


}
