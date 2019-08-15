import { ChatComponentProfissional } from './../../Component/chat-profissional/chat-profissional.component';
import { BuscaPerfilComponent } from './../../Component/busca-perfil/busca-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosAceitosPage } from './servicos-aceitos.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    ServicosAceitosPage,
    BuscaPerfilComponent,
    ChatComponentProfissional
  ],
  entryComponents: [
    ChatComponentProfissional
  ]
})
export class ServicosAceitosPageModule {}
