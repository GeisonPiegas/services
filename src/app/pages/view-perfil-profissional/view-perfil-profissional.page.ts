import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/services/Usuarios/usuario';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { Endereco } from 'src/app/services/Endereco/endereco';
import { EnderecoService } from 'src/app/services/Endereco/endereco.service';

@Component({
  selector: 'app-view-perfil-profissional',
  templateUrl: './view-perfil-profissional.page.html',
  styleUrls: ['./view-perfil-profissional.page.scss'],
})
export class ViewPerfilProfissionalPage implements OnInit {
  private subscription: Subscription;
  private uidProfissional: string;
  public usuario = new Usuario;
  public endereco = new Endereco;
  public servicos: AtuacaoProfissional[];

  constructor(private activatedRouter: ActivatedRoute,
              private usuarioService: UsuarioService,
              private enderecoService: EnderecoService,
              private atuacaoProfissional: AtuacaoProfissionalService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.uidProfissional = this.activatedRouter.snapshot.params['id'];
    this.loadDados(this.uidProfissional);
  }

  async loadDados(uid: String) {
    const loading = await this.loadingController.create({
      message: 'Carregando Dados...'
    });
    await loading.present();

    this.subscription = this.usuarioService.getUsuario(uid).subscribe( res => {
      this.usuario = res;
    });

    this.subscription = this.enderecoService.getTodo(uid).subscribe( res => {
      this.endereco = res;
    })

    this.subscription = this.atuacaoProfissional.getServicosProfissional(uid).subscribe( res => {
      loading.dismiss();
      this.servicos = res;
    })

  }

}
