import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';

@Component({
  selector: 'app-busca-perfil-lista',
  templateUrl: './busca-perfil-lista-servicos.component.html',
  styleUrls: ['./busca-perfil-lista-servicos.component.scss'],
})
export class BuscaPerfilListaComponent implements OnInit {
  fotoUsuario: String;
  nomeUsuario: String;
  @Input() uidUsuario: string = '';


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuario(this.uidUsuario).subscribe( res => {
      this.nomeUsuario = res.nome;
      this.fotoUsuario = res.foto;
    })
  }

}
