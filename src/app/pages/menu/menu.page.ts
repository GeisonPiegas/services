import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { Subscription } from 'rxjs';
import { Core } from 'src/app/core/core.module';

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
      icon: 'home',
      native: false
    },
    {
      title: 'Meus Dados',
      url: '/menu/update-usuario',
      icon: 'contact',
      native: true
    },
    {
      title: 'Meu Controle',
      url: '/menu/controle',
      icon: 'pie',
      native: false
    },
    {
      title: 'Favoritos',
      url: '/menu/favoritos',
      icon: 'heart',
      native: false
    },
    {
      title: 'Ofertar Serviço',
      url: '/menu/new-profissao',
      icon: 'contacts',
      native: false
    },
    {
      title: 'Buscar Serviço',
      url: '/menu/servico-categorias',
      icon: 'construct',
      native: false
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
              private usuarioService: UsuarioService,
              private core: Core){}
  

  ngOnInit(){
    this.subscriptionList = this.usuarioService.getUsuario(this.authService.auth.currentUser.uid).subscribe(res => {
      this.nome = res.nome;
      this.foto = res.foto;
      this.isAdmin = res.isAdmin;
      if(!res.isAtivo){
        this.core.presentAlert("Ops","Você foi desativado, entre em contato com um de nossos moderadores");
        this.signOut();
      }
    });
  }

  signOut(){
    this.authService.auth.signOut();
  }

  ngOnDestroy(){
    this.subscriptionList.unsubscribe();
  }
}
