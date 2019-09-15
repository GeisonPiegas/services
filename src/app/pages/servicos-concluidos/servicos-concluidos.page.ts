import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { Subscription } from 'rxjs';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicos-concluidos',
  templateUrl: './servicos-concluidos.page.html',
  styleUrls: ['./servicos-concluidos.page.scss'],
})

export class ServicosConcluidosPage implements OnInit, OnDestroy {
  concluidos: OrdemServico[];
  concluido: string;
  subscriptionConcluidos: Subscription;

  constructor(private ordemServicoServico: OrdemServicoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.concluido = this.route.snapshot.params['id'];
    this.buscaOrdemServico(this.concluido);
  }

  buscaOrdemServico(concluido){
    this.subscriptionConcluidos = this.ordemServicoServico.getOrdemConcluidas(concluido).subscribe( res => {
      this.concluidos = res;
    })
  }

  ngOnDestroy(){
    this.subscriptionConcluidos.unsubscribe();
  }
}
