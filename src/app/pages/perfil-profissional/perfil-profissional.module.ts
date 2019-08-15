import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilProfissionalPage } from './perfil-profissional.page';
import { StarRatingComponent } from 'src/app/Component/star-rating/star-rating.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilProfissionalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilProfissionalPage]
})
export class PerfilProfissionalPageModule {}
