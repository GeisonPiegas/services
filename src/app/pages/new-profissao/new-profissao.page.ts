import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-profissao',
  templateUrl: './new-profissao.page.html',
  styleUrls: ['./new-profissao.page.scss'],
})

export class NewProfissaoPage implements OnInit, OnDestroy{
  public categoria = new Array<Categorias>();
  private subscriptionCategoria: Subscription;
  private uidUsuario: string;
  private idServico: string;
    //REFERÊNCIA A CLASS USUARIO

  constructor(private afAuth: AngularFireAuth, 
    private categorias: CategoriaService, 
    private loadingController: LoadingController,
    private AtuacaoService: AtuacaoProfissionalService,
    private router: Router,
    private route: ActivatedRoute) {

  }
  
    ngOnInit(){
      this.idServico = this.route.snapshot.params['id'];
        if (this.idServico)  {
      this.loadTodo();
    }
      this.uidUsuario = this.afAuth.auth.currentUser.uid;

      this.subscriptionCategoria = this.categorias.getTodos().subscribe(res => {
        this.categoria = res;
        console.log(res);
      });
    }
  
    ngOnDestroy(){
      this.subscriptionCategoria.unsubscribe();
    }

    async loadTodo() {
      const loading = await this.loadingController.create({
        message: 'Carregando Categoria...'
      });
      await loading.present();
   
      this.AtuacaoService.getTodo(this.idServico).subscribe(res => {
        loading.dismiss();
        this.toda = res;
      });
    }
   
    async concluiCadastro() {
      const loading = await this.loadingController.create({
        message: 'Salvando dados...'
      });
      await loading.present();
   
      if (this.idServico) {
        this.toda.obs = null;
        this.AtuacaoService.updateTodo(this.toda, this.idServico).then(() => {
          loading.dismiss();
          this.router.navigateByUrl('/menu/home');
        });
      } else {
        this.AtuacaoService.addTodo(this.toda).then(() => {
          loading.dismiss();
          this.router.navigateByUrl('/menu/home');
        });
      }
    }
  
    //FUNÇÃO QUE CARREGA TODAS AS CIDADES PREVIAMENTE CADASTRADAS NA APLICAÇÃO
    coletaCategorias(){
      this.categorias.getTodos().subscribe(res => {
        this.categoria = res;
        console.log(res);
      });
    }
    
    toda: AtuacaoProfissional = {
      profissao: '',
      descricao: '',
      uidUsuario: this.afAuth.auth.currentUser.uid,
      idCategoria: '',
      isVerificado: false,
      isAtivo: true
    }
  }
  