import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ContrataServicoPage } from './contrata-servico.page';

const routes: Routes = [
  {
    path: '',
    component: ContrataServicoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContrataServicoPage],
  providers: [DatePipe]
})
export class ContrataServicoPageModule {}
