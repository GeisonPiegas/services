import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ServicosOfertadosPage } from './servicos-ofertados.page';
import { PainelServicosComponent } from 'src/app/Component/painel-servicos/painel-servicos.component';

const routes: Routes = [
  {
    path: '',
    component: ServicosOfertadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ServicosOfertadosPage, PainelServicosComponent]
})
export class ServicosOfertadosPageModule {}
