import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy{
  paginas = [
    {
      title: 'Inicio',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'Meus Dados',
      url: '/menu/update-usuario',
      icon: 'contact'
    },
    {
      title: 'Meu Controle',
      url: '/menu/controle',
      icon: 'pie'
    },
    {
      title: 'Favoritos',
      url: '/menu/favoritos',
      icon: 'heart'
    },
    {
      title: 'Ofertar Serviço',
      url: '/menu/new-profissao',
      icon: 'contacts'
    },
    {
      title: 'Buscar Serviço',
      url: '/menu/servico-categorias',
      icon: 'construct'
    }
  ];

  paginasAdmin = [
    {
      title: 'Categorias',
      url: '/menu/categorias',
      icon: 'information-circle'
    },
    {
      title: 'Cidades',
      url: '/menu/cidades',
      icon: 'information-circle'
    },
    {
      title: 'Usuarios',
      url: '/menu/usuarios',
      icon: 'information-circle'
    },
    {
      title: 'Serviços',
      url: '/menu/servicos',
      icon: 'information-circle'
    }
  ];

  
  public isAdmin: boolean;
  public nome: String;
  public foto: any;
  private subscriptionList: Subscription;

  constructor(private authService: AngularFireAuth,
              private usuarioService: UsuarioService){}
  

  ngOnInit(){
    this.subscriptionList = this.usuarioService.getUsuario(this.authService.auth.currentUser.uid).subscribe(res => {
      this.nome = res.nome;
      this.foto = res.foto;
      this.isAdmin = res.isAdmin;
    });
  }

  signOut(){
    this.authService.auth.signOut();
  }

  ngOnDestroy(){
    this.subscriptionList.unsubscribe();
  }
}
