import { BuscaPerfilPedidosComponent } from './../../Component/busca-perfil-pedidos/busca-perfil-pedidos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosPedidosPage } from './servicos-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: ServicosPedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicosPedidosPage,
  BuscaPerfilPedidosComponent]
})
export class ServicosPedidosPageModule {}
