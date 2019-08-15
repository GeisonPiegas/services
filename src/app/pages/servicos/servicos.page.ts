import { Component, OnInit } from '@angular/core';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {
  todoServicos: AtuacaoProfissional[];
  tdServicos: AtuacaoProfissional[];

  constructor(private atuacaoService: AtuacaoProfissionalService,
              private toastController: ToastController,
              public alertController: AlertController) { }

  ngOnInit() {
    this.atuacaoService.getTodos().subscribe( res => {
      this.tdServicos = res;
      this.todoServicos = this.tdServicos.filter( filtro => {
        if(filtro.isVerificado == false){
          return true;
        }
          return false;
      })
    })
  }

  async presentAlertPrompt(id: string) {
    const alert = await this.alertController.create({
      header: 'Mensagem!',
      inputs: [
        {
          name: 'msg',
          type: 'text',
          placeholder: 'Mensagem'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.atuacaoService.updateObs(id, data.msg);
          }
        }
      ]
    });

    await alert.present();
  }

  verificacao(id: string, valor: boolean){
    if(valor == true){valor = false;}else{valor = true;}
    
    this.atuacaoService.updateVerificacao(id,valor).then(() => {
      this.presentToast("Serviço Liberado");
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
