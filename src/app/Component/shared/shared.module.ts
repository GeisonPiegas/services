import { BuscaEnderecoComponent } from './../busca-endereco/busca-endereco.component';
import { BuscaPerfilProfissionalComponent } from './../busca-perfil-profissional/busca-perfil-profissional.component';
import { BuscaPerfilComponent } from './../busca-perfil/busca-perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChatComponent } from '../chat/chat.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],

  declarations: [
    BuscaPerfilComponent,
    BuscaPerfilProfissionalComponent,
    StarRatingComponent,
    BuscaEnderecoComponent
    
  ],

  exports: [
    BuscaPerfilComponent,
    BuscaPerfilProfissionalComponent,
    StarRatingComponent,
    BuscaEnderecoComponent
    
  ],

  entryComponents: [
    
  ]
})
export class SharedModule { }
