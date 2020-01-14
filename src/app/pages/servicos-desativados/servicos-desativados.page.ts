  import { AngularFireAuth } from '@angular/fire/auth';
  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
  import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
  import { Subscription } from 'rxjs';
  import { ToastController } from '@ionic/angular';
  
  @Component({
    selector: 'app-servicos-desativados',
    templateUrl: './servicos-desativados.page.html',
    styleUrls: ['./servicos-desativados.page.scss'],
  })

  export class ServicosDesativadosPage implements OnInit, OnDestroy {
    uidUsuario: string;
    profissoes: AtuacaoProfissional[];
    subscriptionServicos: Subscription;
  
    constructor(private atuacaoProfissional: AtuacaoProfissionalService,
                private auth: AngularFireAuth,
                private toastController: ToastController,
                ){}
  
    ngOnInit() {
      this.uidUsuario = this.auth.auth.currentUser.uid;
      this.buscaServicos(this.uidUsuario);
    }
  
    buscaServicos(uid){
      this.subscriptionServicos = this.atuacaoProfissional.getServicosDesativados(uid).subscribe( res => {
        this.profissoes = res;
        console.log(res);
      })
    }
  
    ngOnDestroy(){
      this.subscriptionServicos.unsubscribe();
    }
  
    isAtivo(id: string){
      this.atuacaoProfissional.updateAtivo(id,true).then(() => {
        this.presentToast("Serviço Ativado");
      });
    }
  
    async presentToast(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }
  }