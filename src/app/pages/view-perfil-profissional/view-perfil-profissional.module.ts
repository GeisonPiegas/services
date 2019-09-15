import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPerfilProfissionalPage } from './view-perfil-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPerfilProfissionalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPerfilProfissionalPage]
})
export class ViewPerfilProfissionalPageModule {}
