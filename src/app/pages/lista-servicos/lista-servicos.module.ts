import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaServicosPage } from './lista-servicos.page';
import { StarRatingComponent } from '../../Component/star-rating/star-rating.component';
import { BuscaEnderecoComponent } from 'src/app/Component/busca-endereco/busca-endereco.component';
import { SharedModule } from 'src/app/Component/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ListaServicosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListaServicosPage,
  ]
})
export class ListaServicosPageModule {}
