import { Component, OnInit, Input } from '@angular/core';
import { EnderecoService } from 'src/app/services/Endereco/endereco.service';

@Component({
  selector: 'app-busca-endereco',
  templateUrl: './busca-endereco.component.html',
  styleUrls: ['./busca-endereco.component.scss'],
})
export class BuscaEnderecoComponent implements OnInit {
  public lougradouroEndereco: String;
  public numeroEndereco: Number;
  @Input() uidUsuario: string = '';
  constructor(private enderecoService: EnderecoService) { }

  ngOnInit() {
    this.enderecoService.getTodo(this.uidUsuario).subscribe( res => {
      this.lougradouroEndereco = res.lougradouro;
      this.numeroEndereco = res.numero;
    })
  }

}
