import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';

@Component({
  selector: 'app-busca-perfil-profissional2',
  templateUrl: './busca-perfil-profissional2.component.html',
  styleUrls: ['./busca-perfil-profissional2.component.scss'],
})
export class BuscaPerfilProfissional2Component implements OnInit {
  public fotoUsuario: String;
  public nomeUsuario: String;
  public nomeServico: String;
  public uidUsuario: String;
  @Input() idProfissao: string = '';


  constructor(private usuarioService: UsuarioService,
              private profissaoService: AtuacaoProfissionalService) { }

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

}
