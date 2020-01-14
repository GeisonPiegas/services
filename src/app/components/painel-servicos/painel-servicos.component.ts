import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painel-servicos',
  templateUrl: './painel-servicos.component.html',
  styleUrls: ['./painel-servicos.component.scss'],
})
export class PainelServicosComponent implements OnInit, OnDestroy{
  @Input() idProfissao: string = '';
  public pedidos: number;
  public aceitos: number;
  public concluidos: number;
  private subscriptionnOrdens: Subscription;


  constructor(private ordemServico: OrdemServicoService,
              private router: Router) { 

  }

  ngOnInit() {
    //Ordem Pedidas
    this.subscriptionnOrdens = this.ordemServico.getSituacao(this.idProfissao, 1).subscribe( res => {
      this.pedidos = 0;
      res.forEach( x => {
        this.pedidos += 1;
        console.log("I --> ", this.pedidos);
      })
    })

    //Ordem aceitas
    this.subscriptionnOrdens = this.ordemServico.getSituacao(this.idProfissao, 3).subscribe( res => {
      this.aceitos = 0;
      res.forEach( x => {
        this.aceitos += 1;
        console.log("I --> ", this.aceitos);
      })
    })

    this.subscriptionnOrdens = this.ordemServico.getSituacao(this.idProfissao, 4).subscribe( res => {
      this.concluidos = 0;
      res.forEach( x => {
        this.concluidos += 1;
        console.log("I --> ", this.concluidos);
      })
    })
  }

  servicosPedidos(idProfissao){
    this.router.navigate(['/menu/servicos-pedidos', idProfissao]);
  }

  servicosAceitos(idProfissao){
    this.router.navigate(['/menu/servicos-aceitos', idProfissao]);
  }

  servicosConcluidos(idProfissao){
    this.router.navigate(['/menu/servicos-concluidos', idProfissao]);
  }

  ngOnDestroy(){
    this.subscriptionnOrdens.unsubscribe();
  }
}
