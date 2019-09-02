import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  public ordem: OrdemServico[];
  public ordemAceitas: OrdemServico[];
  private uidUsuario: string;
  private pedidosServicos: number;
  private subscriptionOrdens: Subscription;



  constructor(private ordemServicoService: OrdemServicoService,
              private auth: AngularFireAuth,
              private localNotifications: LocalNotifications,
              private atuacaoProfissionalService: AtuacaoProfissionalService){ 

  }

  ngOnInit() {
    // PEGA O UID DO USUARIO NO MOMENTO
    this.uidUsuario = this.auth.auth.currentUser.uid;

    // BUSCA AS ORDEM RESPONDIDADAS PELOS PROFISSIONAIS COM O VALOR, E PERMITE ACEITAR OU CANCELAR A ORDEM.
    this.subscriptionOrdens = this.ordemServicoService.getOrdemRespondida(this.uidUsuario).subscribe( res => {
      this.ordem = res;
    });

    // BUSCA AS ORDEM ACEITAS E QUE ESTEJAM EM ANDAMENTO, E LIBERA O CHAT PARA OS INTERSSADOS.
    this.subscriptionOrdens = this.ordemServicoService.getOrdemAceitaCliente(this.uidUsuario).subscribe( res => {
      this.ordemAceitas = res;
    });

    // PROCURA POR ORDENS PEDIDAS E EMITE UMA NOTIFICAÇÃO
    this.atuacaoProfissionalService.getServicosProfissional(this.uidUsuario).subscribe( res => {
      res.forEach( profissoes => {
        
        this.ordemServicoService.getSituacao(profissoes.id,1).subscribe( pedidos => {
          this.pedidosServicos = 0;
          pedidos.forEach( () => {
            this.pedidosServicos += 1;
          });
          if (this.pedidosServicos != 0) {
            this.openNotificacao(this.pedidosServicos);
          };
        });
      });
    });
  }

  // FUNÇÃO QUE EMITE A NOTIFICAÇÃO
  openNotificacao(quant: number){
    this.localNotifications.schedule({
      text: 'Você tem '+quant+' pedidos de serviços pendentes!',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });
  }

  // FUNÇÃO QUE ACEITA A ORDEM
  aceitarPropostaOrdem(idOrdem){
    this.ordemServicoService.updateSituacaoAceita(idOrdem);
  }

  // FUNÇÃO QUE CANCELA A ORDEM
  cancelarOrdem(idOrdem){
    this.ordemServicoService.updateSituacaoCancelar(idOrdem);
  }

  // LIBERA A BUSCA AO SAIR DA PAGINA, PARA LIBERAR MEMORIA.
  ngOnDestroy(){
    this.subscriptionOrdens.unsubscribe();
  }
}
