import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.page.html',
  styleUrls: ['./lista-servicos.page.scss'],
})
export class ListaServicosPage implements OnInit, OnDestroy{

  private servicos = Array<AtuacaoProfissional>();
  public todoServicos = Array<AtuacaoProfissional>();
  private filtroServicos = Array<AtuacaoProfissional>();
  private subscriptionServicos: Subscription;
  public categoria: String;
  public uidUsuario: string;

  constructor(private ServicosA: AtuacaoProfissionalService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private auth: AngularFireAuth) { }

  ngOnInit() {
    this.uidUsuario = this.auth.auth.currentUser.uid;
    // PEGA A CATEGORIA DO SERVIÇO A SER BUSCADO.
    this.categoria = this.route.snapshot.params['categoria'];
    // FAZ A BUSCA DA CATEGORIA RECEBIDA.
    this.loadDados(this.categoria);
  }

  async loadDados(categ: String) {
    const loading = await this.loadingController.create({
      message: 'Buscando Serviços...'
    });
    await loading.present();
    
    // PEGA A SERVICOS DO SERVIÇO A SER BUSCADO.
    this.subscriptionServicos = this.ServicosA.getPorCategoria(categ).subscribe( res => {
      this.servicos = res;
      this.todoServicos = this.servicos.filter( filtro => {
        if(filtro.uidUsuario != this.uidUsuario){
          return true;
        }
          return false;
      })
      this.filtroServicos = this.todoServicos;
      loading.dismiss();
    });
  }

  initializeItens(): void{
    this.todoServicos = this.filtroServicos;
  }

  filterList(evt){
    this.initializeItens();

    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return
    }

    this.todoServicos = this.todoServicos.filter( ser => {
      if(ser.profissao && searchTerm){
        if(ser.profissao.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

  ngOnDestroy() {
    // LIBERA A BUSCA AO SAIR DA PAGINA, PARA LIBERAR MEMORIA.
    this.subscriptionServicos.unsubscribe();
  }
}
