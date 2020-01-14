import { AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public dowloadURL: Observable<string>;
  public foto: string;
  public url: string;
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
    const ref = this.afs.ref('Usuario/'+uidUsuario);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();     
  }

  uploadImagemCategoria(nomeCategoria: string, photo: string){
    console.log(photo);
    const ref = this.afs.ref('Categoria/'+nomeCategoria);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();
    
  }

  uploadImagemOrdemServico(idOrdem: string, photo: string){
    const ref = this.afs.ref('OrdemServico/'+idOrdem);
    ref.putString(photo, 'data_url');
    return ref.getDownloadURL();     
  }
}
