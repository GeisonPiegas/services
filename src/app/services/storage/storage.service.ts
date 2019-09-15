import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs: AngularFireStorage,
    private alertController: AlertController) { 

  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  uploadImagemUsuario(uidUsuario: string, photo: string){
    console.log(photo);
    const ref = this.afs.ref('Usuario/'+uidUsuario);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();     
  }

  uploadImagemCategoria(idCategoria: string, photo: string){
    console.log(photo);
    const ref = this.afs.ref('Categoria/'+idCategoria);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();     
  }

  uploadImagemOrdemServico(idOrdem: string, photo: string){
    const ref = this.afs.ref('OrdemServico/'+idOrdem);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();     
  }
}
