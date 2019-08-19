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

  public categoria: String;
  public uidUsuario: string;
  public todoServicos: AtuacaoProfissional[];
  private servicos: AtuacaoProfissional[];
  private filtroServicos: AtuacaoProfissional[];
  private subscriptionServicos: Subscription;

  constructor(private atuacaoProfissionalService: AtuacaoProfissionalService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private auth: AngularFireAuth) { }

  ngOnInit() {
    // PEGA O UID DO USUARIO NO MOMENTO.
    this.uidUsuario = this.auth.auth.currentUser.uid;
    
    // PEGA A CATEGORIA PASSADA ATRAVEZ DA ROTA
    this.categoria = this.route.snapshot.params['categoria'];

    // FAZ A BUSCA DA CATEGORIA RECEBIDA.
    this.loadDados(this.categoria);
  }

  // FUNÇÃO QUE BUSCA OS SERVIÇOS DO BANCO REFERENTE A CATEGORIA PASSADA
  async loadDados(categ: String) {
    const loading = await this.loadingController.create({
      message: 'Buscando Serviços...'
    });
    await loading.present();
    
    // PEGA A SERVICOS DO SERVIÇO A SER BUSCADO.
    this.subscriptionServicos = this.atuacaoProfissionalService.getPorCategoria(categ).subscribe( res => {
      this.servicos = res;

      // FILTRO QUE OMITE OS SERVIÇOS OFERECIDOS PELO PROPRIO USUARIO
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

  // FUNÇÃO DO FILTRO
  initializeItens(): void{
    this.todoServicos = this.filtroServicos;
  }

  // FUNÇÃO DO FILTRO
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

  // LIBERA A BUSCA AO SAIR DA PAGINA, PARA LIBERAR MEMORIA.
  ngOnDestroy() {
    this.subscriptionServicos.unsubscribe();
  }
}
