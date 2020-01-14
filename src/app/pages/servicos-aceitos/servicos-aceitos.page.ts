import { ChatComponentProfissional } from './../../components/chat-profissional/chat-profissional.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { Subscription } from 'rxjs';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { AvaliacaoService } from 'src/app/services/Avaliacao/avaliacao.service';


@Component({
  selector: 'app-servicos-aceitos',
  templateUrl: './servicos-aceitos.page.html',
  styleUrls: ['./servicos-aceitos.page.scss'],
})
export class ServicosAceitosPage implements OnInit, OnDestroy {
  aceitos: OrdemServico[];
  idProfissional: string;
  subscriptionOrdens: Subscription;

  constructor(private ordemServico: OrdemServicoService,
              private route: ActivatedRoute,
              private NavCtrl: NavController,
              private modal: ModalController,
              private avaliacao: AvaliacaoService) { }

  ngOnInit() {
    this.idProfissional = this.route.snapshot.params['id'];
    this.buscaOrdemServico(this.idProfissional);
  }

  buscaOrdemServico(profissional){
    this.subscriptionOrdens = this.ordemServico.getOrdemProfissional(profissional,3).subscribe( res => {
      this.aceitos = res;
    })
  }

  servicoConcluido(idOrdem, profissao, ordem){
    this.ordemServico.updateSituacaoConcluida(idOrdem);
    const avaliacao = {
      valor: 0 
    }
    this.avaliacao.addTodo(profissao, ordem, avaliacao);
    this.NavCtrl.pop();
  }


  abrirChat(idChat: string, uidUsuario: string){
    this.modal.create({
      component: ChatComponentProfissional,
      componentProps: {
        idChat: idChat,
        uidUsuario: uidUsuario
      }
    }).then( (modal) => modal.present() )
  }

  ngOnDestroy(){
    this.subscriptionOrdens.unsubscribe();
  }

}
