import { ChatComponent } from 'src/app/Component/chat/chat.component';
import { Component, OnInit, Input, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-busca-perfil-profissioal',
  templateUrl: './busca-perfil-profissional.component.html',
  styleUrls: ['./busca-perfil-profissional.component.scss'],
})
export class BuscaPerfilProfissionalComponent implements OnInit {
  public fotoUsuario: String;
  public nomeUsuario: String;
  public nomeServico: String;
  public uidUsuario: String;
  public 
  @Input() idProfissao: string = '';
  @Input() idOrdem: string = '';
  @Input() situacaoOrdem: number = 0;

  constructor(private usuarioService: UsuarioService,
              private profissaoService: AtuacaoProfissionalService,
              private modal: ModalController) { }

  ngOnInit() {
    
    this.profissaoService.getTodo(this.idProfissao).subscribe( res => {
      this.nomeServico = res.profissao;
      this.uidUsuario = res.uidUsuario
      this.usuarioService.getUsuario(this.uidUsuario).subscribe( pessoa => {
        this.nomeUsuario = pessoa.nome;
        this.fotoUsuario = pessoa.foto;
      })
    })
  }

  abrirChat(){
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        idChat: this.idOrdem,
        uidUsuario: this.uidUsuario
      }
    }).then( (modal) => modal.present() )
  }

}
