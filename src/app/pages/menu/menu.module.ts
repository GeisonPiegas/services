import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { 
        path: 'home', 
        loadChildren: '../home/home.module#HomePageModule', 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'categorias', 
        loadChildren: '../categorias/categorias.module#CategoriasPageModule' ,
        canActivate: [AuthGuard]
      },
      { 
        path: 'details-categoria', 
        loadChildren: '../details-categoria/details-categoria.module#DetailsCategoriaPageModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'details-categoria/:nome', 
        loadChildren: '../details-categoria/details-categoria.module#DetailsCategoriaPageModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'update-usuario', 
        loadChildren: '../update-usuario/update-usuario.module#UpdateUsuarioPageModule', 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'controle', 
        loadChildren: '../controle/controle.module#ControlePageModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'servico-categorias', 
        loadChildren: '../servico-categorias/servico-categorias.module#ServicoCategoriasPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'lista-servicos/:categoria', 
        loadChildren: '../lista-servicos/lista-servicos.module#ListaServicosPageModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'perfil-profissional/:id', 
        loadChildren: '../perfil-profissional/perfil-profissional.module#PerfilProfissionalPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'favoritos', 
        loadChildren: '../favoritos/favoritos.module#FavoritosPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'new-profissao', 
        loadChildren: '../new-profissao/new-profissao.module#NewProfissaoPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'new-profissao/:id', 
        loadChildren: '../new-profissao/new-profissao.module#NewProfissaoPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'cidades', 
        loadChildren: '../cidades/cidades.module#CidadesPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'details-cidade', 
        loadChildren: '../details-cidade/details-cidade.module#DetailsCidadePageModule',
        canActivate: [AuthGuard] 
      },
      {
        path: 'details-cidade/:id', 
        loadChildren: '../details-cidade/details-cidade.module#DetailsCidadePageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'servicos', 
        loadChildren: '../servicos/servicos.module#ServicosPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'usuarios', 
        loadChildren: '../usuarios/usuarios.module#UsuariosPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'contrata-servico/:idProfissao',
        loadChildren: '../contrata-servico/contrata-servico.module#ContrataServicoPageModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'servicos-ofertados', 
        loadChildren: '../servicos-ofertados/servicos-ofertados.module#ServicosOfertadosPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'servicos-pedidos/:servico', 
        loadChildren: '../servicos-pedidos/servicos-pedidos.module#ServicosPedidosPageModule',
        canActivate: [AuthGuard] 
      },
      { 
        path: 'view-pedido/:id', 
        loadChildren: '../view-pedido/view-pedido.module#ViewPedidoPageModule',
        canActivate: [AuthGuard]  
      },{ 
        path: 'servicos-aceitos/:id', 
        loadChildren: '../servicos-aceitos/servicos-aceitos.module#ServicosAceitosPageModule',
        canActivate: [AuthGuard]
      },
      { 
        path: 'details-endereco', 
        loadChildren: '../details-endereco/details-endereco.module#DetailsEnderecoPageModule'
      },
      {
        path: '',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
