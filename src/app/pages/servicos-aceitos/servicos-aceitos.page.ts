import { ChatComponentProfissional } from './../../Component/chat-profissional/chat-profissional.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { Subscription } from 'rxjs';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-servicos-aceitos',
  templateUrl: './servicos-aceitos.page.html',
  styleUrls: ['./servicos-aceitos.page.scss'],
})
export class ServicosAceitosPage implements OnInit, OnDestroy {
  aceitos: OrdemServico[];
  servico: string;
  subscriptionOrdens: Subscription;

  constructor(private ordemServico: OrdemServicoService,
              private route: ActivatedRoute,
              private NavCtrl: NavController,
              private modal: ModalController) { }

  ngOnInit() {
    this.servico = this.route.snapshot.params['id'];
    this.buscaOrdemServico(this.servico);
  }

  buscaOrdemServico(idServico){
    this.subscriptionOrdens = this.ordemServico.getOrdemAceita(idServico).subscribe( res => {
      this.aceitos = res;
    })
  }

  servicoConcluido(idOrdem){
    this.ordemServico.updateSituacaoConcluida(idOrdem);
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
