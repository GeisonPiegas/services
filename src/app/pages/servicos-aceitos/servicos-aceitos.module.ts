import { ChatComponentProfissional } from './../../components/chat-profissional/chat-profissional.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosAceitosPage } from './servicos-aceitos.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ServicosAceitosPage
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
    ServicosAceitosPage,
    ChatComponentProfissional
  ],
  entryComponents: [
    ChatComponentProfissional
  ]
})
export class ServicosAceitosPageModule {}
