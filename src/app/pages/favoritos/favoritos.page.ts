import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Favoritos } from 'src/app/services/Favoritos/favoritos';
import { Subscription } from 'rxjs';
import { FavoritosService } from 'src/app/services/Favoritos/favoritos.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, OnDestroy {
  idUsuario: string;
  favoritos = new Array<Favoritos>();
  favoritoSubescription: Subscription;
  subsList: Subscription;

  constructor(private favoritoService: FavoritosService,
              private actionSheetController: ActionSheetController,
              private auth: AngularFireAuth,
              private router: Router) { 

  }

  ngOnInit() {
    this.idUsuario = this.auth.auth.currentUser.uid;
    this.favoritoSubescription = this.favoritoService.procuraTodos(this.idUsuario).subscribe( res => {
      this.favoritos = res;
    });
  }

  ngOnDestroy() { 
    this.favoritoSubescription.unsubscribe();
  }

  async presentActionSheet(id: string, uid: string) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: '',
      mode: 'ios',
      buttons: [{
        text: 'Desfavoritar',
        role: 'destructive',
        icon: 'heart-dislike',
        handler: () => {
          this.favoritoService.removeTodo(id);
        }
      }, {
        text: 'Perfil',
        icon: 'person',
        handler: () => {
          console.log(uid);
          this.router.navigateByUrl('menu/view-perfil-profissional/'+uid); 
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
}
