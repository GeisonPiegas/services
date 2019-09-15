import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-pedido',
  templateUrl: './view-pedido.page.html',
  styleUrls: ['./view-pedido.page.scss'],
})
export class ViewPedidoPage implements OnInit, OnDestroy {
  ordem: OrdemServico = {
    id: '',
    foto: '',
    descricao: '',
    valor: null,
    dataHora: null,
    dataHoraFinal: null,
    uidUsuario: '',
    idProfissao: '',
    situacao: null
  };

  private subscriptionOrdem: Subscription;
  public idOrdem: string;
  @ViewChild('form') form: NgForm;

  constructor(private ordemServicoService: OrdemServicoService,
              private route: ActivatedRoute,
              private navCTRL: NavController) { 
  }

  ngOnInit() {
    this.idOrdem = this.route.snapshot.params['id'];
    this.subscriptionOrdem = this.ordemServicoService.getTodo(this.idOrdem).subscribe( res => {
      this.ordem = res;
      console.log(res.uidUsuario);
    })
  }

  enviaResposta(idOrdem: string, valor: number){
    this.ordemServicoService.updateValor(idOrdem, valor);
    this.navCTRL.pop();
  }

  ngOnDestroy(){
    this.subscriptionOrdem.unsubscribe();
  }

}
