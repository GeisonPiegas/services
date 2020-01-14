import { AngularFireAuth } from '@angular/fire/auth';
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
  private idUsuario: string;
  public idOrdem: string;
  public avaliacao: boolean = false;

  constructor(private ordemServicoService: OrdemServicoService,
              private route: ActivatedRoute,
              private auth: AngularFireAuth) { 
  }

  ngOnInit() {
    this.idOrdem = this.route.snapshot.params['id'];
    this.idUsuario = this.auth.auth.currentUser.uid;
    this.subscriptionOrdem = this.ordemServicoService.getTodo(this.idOrdem).subscribe( res => {
      this.ordem = res;
      if(res.uidUsuario == this.idUsuario){
        this.avaliacao = true;
      }
    })
  }

  ngOnDestroy(){
    this.subscriptionOrdem.unsubscribe();
  }
}
