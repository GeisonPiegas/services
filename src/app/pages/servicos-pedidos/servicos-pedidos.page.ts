import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';

@Component({
  selector: 'app-servicos-pedidos',
  templateUrl: './servicos-pedidos.page.html',
  styleUrls: ['./servicos-pedidos.page.scss'],
})
export class ServicosPedidosPage implements OnInit, OnDestroy {
  pedidos: OrdemServico[];
  pedido: string;
  subscriptionPedidos: Subscription;

  constructor(private ordemServico: OrdemServicoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.pedido = this.route.snapshot.params['servico'];
    this.buscaOrdemServico(this.pedido);
  }

  buscaOrdemServico(uidpedido){
    this.subscriptionPedidos = this.ordemServico.getOrdemEnviada(uidpedido).subscribe( res => {
      this.pedidos = res;
    })
  }

  ngOnDestroy(){
    this.subscriptionPedidos.unsubscribe();
  }
}
