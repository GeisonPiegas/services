import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servico-categorias',
  templateUrl: './servico-categorias.page.html',
  styleUrls: ['./servico-categorias.page.scss'],
})
export class ServicoCategoriasPage implements OnInit, OnDestroy {

  constructor(private cat: CategoriaService,
              private router: Router) { }

  public listCategorias = new Array<Categorias>();
  public filterCategorias = new Array<Categorias>();
  private list: Subscription;
  ngOnInit() {
    // LISTA TODAS AS CATEGORIAS EXISTENTE NO BANCO.
    this.list = this.cat.getTodos().subscribe( res => {
      this.listCategorias = res;
      this.filterCategorias = res;
    })
  }
  // FUNÇÃO QUE MANDA PARA A TELA DE LITAGEM COM A CATEGORIA A SER BUSCADA.
  listaServicos(categoria: String){
    this.router.navigate(['/menu/lista-servicos/'+categoria]);
  }

  ngOnDestroy() {
    // LIBERA A BUSCA AO SAIR DA PAGINA, PARA LIBERAR MEMORIA.
    this.list.unsubscribe();
  }

  initializeItens(): void{
    this.listCategorias = this.filterCategorias;
  }

  filterList(evt){
    this.initializeItens();

    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return
    }

    this.listCategorias = this.listCategorias.filter(categoriaNome => {
      if(categoriaNome.nome && searchTerm){
        if(categoriaNome.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

}
