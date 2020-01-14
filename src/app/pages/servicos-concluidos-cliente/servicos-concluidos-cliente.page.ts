import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { Subscription } from 'rxjs';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-servicos-concluidos-cliente',
  templateUrl: './servicos-concluidos-cliente.page.html',
  styleUrls: ['./servicos-concluidos-cliente.page.scss'],
})
export class ServicosConcluidosClientePage implements OnInit, OnDestroy{

  concluidos: OrdemServico[];
  idCliente: string;
  subscriptionConcluidos: Subscription;

  constructor(private ordemServicoServico: OrdemServicoService,
              private auth: AngularFireAuth) { }

  ngOnInit() {
    this.idCliente = this.auth.auth.currentUser.uid;
    this.buscaOrdemServico(this.idCliente);
    console.log(this.idCliente);
  }

  buscaOrdemServico(cliente){
    this.subscriptionConcluidos = this.ordemServicoServico.getOrdemUsuario(cliente,4).subscribe( res => {
      this.concluidos = res;
    })
  }

  ngOnDestroy(){
    this.subscriptionConcluidos.unsubscribe();
  }
}
