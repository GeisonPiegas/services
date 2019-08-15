import { Component, OnInit, Input, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';

@Component({
  selector: 'app-busca-perfil-validacao',
  templateUrl: './busca-perfil-validacao.component.html',
  styleUrls: ['./busca-perfil-validacao.component.scss'],
})
export class BuscaPerfilValidacaoComponent implements OnInit {
  fotoUsuario: String;
  nomeUsuario: String;
  @Input() uidUsuario: string = '';


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getTodo(this.uidUsuario).subscribe( res => {
      this.nomeUsuario = res.nome;
      this.fotoUsuario = res.foto;
    })
  }

}
