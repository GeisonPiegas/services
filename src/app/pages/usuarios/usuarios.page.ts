import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { Usuario } from 'src/app/services/Usuarios/usuario';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit, OnDestroy {
  todosUsuarios: Usuario[];
  filterUsuarios: Usuario[];
  subscriptionUsuarios: Subscription;
  
  constructor(private usuarioService: UsuarioService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.subscriptionUsuarios = this.usuarioService.getUsuarios().subscribe( res => {
      this.todosUsuarios = res;
      this.filterUsuarios = res;
    })
  }

  modificaAdmin(id: string, valor: boolean){
    if(valor == true){valor = false;}else{valor = true;}

    this.usuarioService.updateUsuarioAdmin(id,valor).then(() => {
      if(valor == true){ this.presentToast("Usuario é Administrador")}else{ this.presentToast("Usuario é Normal")}
    });
  }

  modificaAtivo(id: string, valor: boolean){
    if(valor == true){valor = false;}else{valor = true;}

    this.usuarioService.updateUsuarioAtivo(id,valor).then(() => {
      if(valor == true){ this.presentToast("Usuario Ativado")}else{ this.presentToast("Usuario Desativado")}
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  initializeItens(): void{
    this.todosUsuarios = this.filterUsuarios;
  }

  filterList(evt){
    this.initializeItens();

    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return
    }

    this.todosUsuarios = this.todosUsuarios.filter(categoriaNome => {
      if(categoriaNome.nome && searchTerm){
        if(categoriaNome.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

  ngOnDestroy(){
    this.subscriptionUsuarios.unsubscribe();
  }
}
