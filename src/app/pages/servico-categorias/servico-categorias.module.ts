import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicoCategoriasPage } from './servico-categorias.page';

const routes: Routes = [
  {
    path: '',
    component: ServicoCategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicoCategoriasPage]
})
export class ServicoCategoriasPageModule {}
