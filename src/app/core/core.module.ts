import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class Core {
  public identForm = {
    'email': [
      { type: 'requerid', mensagem: 'Email é requirido!' },
      { type: 'minlength', mensagem: 'Minimo 6 caracter!'},
      { type: 'maxLength', mensagem: 'Maximo 30 caracter!'},
      { type: 'pattern', mensagem: 'Endereco de email invalido!'}
    ],
    'senha': [
      { type: 'requerid', mensagem: 'Senha é requirido!' },
      { type: 'minlength', mensagem: 'Minimo 6 caracter!'},
      { type: 'maxLength', mensagem: 'Maximo 30 caracter!'},
      { type: 'pattern', mensagem: 'Senha invalido!'}
    ]
  }


  constructor(public alertController: AlertController,
              public toastController: ToastController){
  }


  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000
    });
    toast.present();
  }

  async presentToast2() {
    this.toastController.create({
        message: 'Ionic 4 Auto Hide Toast on Bottom',
        showCloseButton: true,
        position: 'middle',
        closeButtonText: 'Yeah',
        animated:true
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
  }


  // ALERTAS
  async presentAlert(header: string, msg: string) {
    const alert = await this.alertController.create({
      subHeader: header,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  
  identificaError(error: any){
    switch (error) {
      case 'auth/email-already-in-use':
        this.presentAlert('Atenção','Já existir uma conta com o endereço de email fornecido!');
        break;

      case 'auth/invalid-email':
        this.presentAlert('Atenção','Endereço de e-mail inválido!');
        break;
      
      case 'auth/operation-not-allowed':
        this.presentAlert('Atenção','E-mail e senha desativadas!');
        break;
      case 'auth/weak-password':
          this.presentAlert('Atenção','Senha muito fraca!');
        break;

      case 'auth/invalid-email':
        this.presentAlert('Atenção','E-mail invalido!');
        break;
      
      case 'auth/user-disabled':
        this.presentAlert('Atenção','Usuario desativado!');
        break;

      case 'auth/user-not-found':
        this.presentAlert('Atenção','Usuario não encontrado!');
        break;
      
      case 'auth/wrong-password':
        this.presentAlert('Atenção','Senha inválida!');
        break;

      default:
        this.presentAlert('Atenção','Erro não encontrado em nosso Banco!');
        break;
    }
  }

}
