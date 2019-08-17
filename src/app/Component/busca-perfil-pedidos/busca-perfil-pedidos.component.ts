import { Component, OnInit, Input, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';

@Component({
  selector: 'app-busca-perfil-pedidos',
  templateUrl: './busca-perfil-pedidos.component.html',
  styleUrls: ['./busca-perfil-pedidos.component.scss'],
})
export class BuscaPerfilPedidosComponent implements OnInit {
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
