import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';

@Component({
  selector: 'app-view-concluido',
  templateUrl: './view-concluido.page.html',
  styleUrls: ['./view-concluido.page.scss'],
})

export class ViewConcluidoPage implements OnInit, OnDestroy {
  ordem = new OrdemServico;

  private subscriptionOrdem: Subscription;
  public idOrdem: string;

  constructor(private ordemServicoService: OrdemServicoService,
              private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.idOrdem = this.route.snapshot.params['id'];
    this.subscriptionOrdem = this.ordemServicoService.getTodo(this.idOrdem).subscribe( res => {
      this.ordem = res;
      console.log(res.uidUsuario);
    })
  }

  ngOnDestroy(){
    this.subscriptionOrdem.unsubscribe();
  }
}
