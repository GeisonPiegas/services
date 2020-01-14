import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';

@Component({
  selector: 'app-servicos-ofertados',
  templateUrl: './servicos-ofertados.page.html',
  styleUrls: ['./servicos-ofertados.page.scss'],
})
export class ServicosOfertadosPage implements OnInit, OnDestroy {
  public uidUsuario: string;
  public profissoes: AtuacaoProfissional[];
  private subscriptionServicos: Subscription;
  private cont: number;

  constructor(private atuacaoProfissional: AtuacaoProfissionalService,
              private auth: AngularFireAuth,
              private toastController: ToastController,
              private ordemServico: OrdemServicoService
              ){}

  ngOnInit() {
    this.uidUsuario = this.auth.auth.currentUser.uid;
    this.buscaServicos(this.uidUsuario);
  }

  buscaServicos(uid){
    this.subscriptionServicos = this.atuacaoProfissional.getServicosProfissional(uid).subscribe( res => {
      this.profissoes = res;
      console.log(res);
    })
  }

  ngOnDestroy(){
    this.subscriptionServicos.unsubscribe();
  }

  isAtivo(id: string){
    this.cont = 0;
    this.ordemServico.getOrdemProfissional(id, 3).subscribe( res => {
      console.log(res);
      res.forEach(() => {
        this.cont += 1;
        console.log(this.cont);
      });
    });
    setTimeout(() => {
      if(this.cont > 0){
        this.presentToast("Há serviços em andamento!");
      }else{
        this.atuacaoProfissional.updateAtivo(id,false).then(() => {
          this.presentToast("Serviço Desativado");
        });
      }
    }, 1500)
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
