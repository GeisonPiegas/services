import { BuscaPerfilProfissionalComponent } from './../../Component/busca-perfil-profissional/busca-perfil-profissional.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PainelServicosComponent } from 'src/app/Component/painel-servicos/painel-servicos.component';
import { ChatComponent } from 'src/app/Component/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
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
    HomePage,
    BuscaPerfilProfissionalComponent,
    ChatComponent
  ],
  entryComponents: [
    ChatComponent,
  ]
  
})
export class HomePageModule {}
