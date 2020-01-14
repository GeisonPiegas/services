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
  idProfissional: string;
  subscriptionConcluidos: Subscription;

  constructor(private ordemServicoServico: OrdemServicoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.idProfissional = this.route.snapshot.params['id'];
    this.buscaOrdemServico(this.idProfissional);
  }

  buscaOrdemServico(profissional){
    this.subscriptionConcluidos = this.ordemServicoServico.getOrdemProfissional(profissional,4).subscribe( res => {
      this.concluidos = res;
    })
  }

  ngOnDestroy(){
    this.subscriptionConcluidos.unsubscribe();
  }
}
