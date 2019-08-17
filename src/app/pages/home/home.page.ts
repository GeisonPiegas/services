import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  ordem: OrdemServico[];
  ordemAceitas: OrdemServico[];
  uidUsuario: string;



  constructor(private ordemServicoService: OrdemServicoService,
              private auth: AngularFireAuth,
              private platform: Platform,
              private splashScreen: SplashScreen
              ) { 

  }

  ngOnInit() {
      this.splashScreen.hide(); // <-- aqui
  

    this.uidUsuario = this.auth.auth.currentUser.uid;
    this.ordemServicoService.getOrdemRespondida(this.uidUsuario).subscribe( res => {
      this.ordem = res;
    })

    this.ordemServicoService.getOrdemAceitaCliente(this.uidUsuario).subscribe( res => {
      this.ordemAceitas = res;
    })
  }

  aceitarPropostaOrdem(idOrdem){
    this.ordemServicoService.updateSituacaoAceita(idOrdem);
  }

  cancelarOrdem(idOrdem){
    this.ordemServicoService.updateSituacaoCancelar(idOrdem);
  }

  ngOnDestroy(){

  }
}
