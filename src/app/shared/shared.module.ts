import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BuscaPerfilComponent } from '../components/busca-perfil/busca-perfil.component';
import { BuscaPerfilProfissionalComponent } from '../components/busca-perfil-profissional/busca-perfil-profissional.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { BuscaEnderecoComponent } from '../components/busca-endereco/busca-endereco.component';
import { PainelServicosComponent } from '../components/painel-servicos/painel-servicos.component';
import { StarRatingVoteComponent } from '../components/star-rating-vote/star-rating-vote.component';
import { BuscaPerfilProfissional2Component } from '../components/busca-perfil-profissional2/busca-perfil-profissional2.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],

  declarations: [
    BuscaPerfilComponent,
    BuscaPerfilProfissionalComponent,
    BuscaPerfilProfissional2Component,
    StarRatingComponent,
    BuscaEnderecoComponent,
    PainelServicosComponent,
    StarRatingVoteComponent
    
  ],

  exports: [
    BuscaPerfilComponent,
    BuscaPerfilProfissionalComponent,
    BuscaPerfilProfissional2Component,
    StarRatingComponent,
    BuscaEnderecoComponent,
    PainelServicosComponent,
    StarRatingVoteComponent
    
  ],

  entryComponents: [
    
  ]
})
export class SharedModule { }
