import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';

@Component({
  selector: 'app-contrata-servico',
  templateUrl: './contrata-servico.page.html',
  styleUrls: ['./contrata-servico.page.scss'],
})
export class ContrataServicoPage implements OnInit {
  public contrato: OrdemServico = {
    foto: '',
    descricao: '',
    dataHora: null,
    dataHoraFinal: null,
    uidUsuario: '',
    idProfissao: '',
    situacao: null
  }
  public idProfissao: string;

  constructor(private ordemServico: OrdemServicoService,
              private router: ActivatedRoute,
              private route: Router,
              private auth: AngularFireAuth,
              private alertController: AlertController) { }

  ngOnInit() {
    this.idProfissao = this.router.snapshot.params['idProfissao'];
  }

  async concluiContrato(){
    this.contrato.idProfissao = this.idProfissao;
    this.contrato.dataHora = new Date();
    this.contrato.uidUsuario = this.auth.auth.currentUser.uid;
    this.contrato.situacao = 1;

    this.ordemServico.addTodo(this.contrato).then(() => {
      this.presentAlert();
      this.route.navigateByUrl('/menu/home');
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Olá',
      subHeader: 'Pedido',
      message: 'Seu pedido foi encaminhado, por favor aguarde!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
