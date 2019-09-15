import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewConcluidoPage } from './view-concluido.page';

const routes: Routes = [
  {
    path: '',
    component: ViewConcluidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewConcluidoPage]
})
export class ViewConcluidoPageModule {}
