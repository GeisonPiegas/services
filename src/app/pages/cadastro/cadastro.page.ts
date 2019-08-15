import { Subscription } from 'rxjs';
import { Cidade } from './../../services/Cidades/cidade';
import { LoadingController, NavController } from '@ionic/angular';
import { Usuario } from './../../services/Usuarios/usuario';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { Endereco } from 'src/app/services/Endereco/endereco';
import { CidadesService } from 'src/app/services/Cidades/cidades.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy{
  uidUser: any;
  public cidades = Array<Cidade>();
  private subscriptionCidades: Subscription;
  private foto: any;

  constructor(private afAuth: AngularFireAuth, 
    private userService: UsuarioService, 
    private loadingController: LoadingController,
    private cidService: CidadesService,
    private nav: NavController) {
  }

  ngOnInit(){
     //CHAMA A FUNÇÃO QUE BUSCA AS CIDADES DO BANCO
     this.coletaCidade();
  }

  //FUNÇÃO QUE CARREGA TODAS AS CIDADES PREVIAMENTE CADASTRADAS NA APLICAÇÃO
  coletaCidade(){
    this.subscriptionCidades = this.cidService.getTodos().subscribe(res => {
      this.cidades = res;
      console.log(res);
    });
  }

  ngOnDestroy(){
    this.subscriptionCidades.unsubscribe();
  }

  //FUNÇÃO QUE CARREGA A IMAGEM
  uploadImagem(event) {
    this.foto = event.target.files[0];
  }


  //FUNÇÃO PARA CADASTRAR NOVO USUARIO
  async concluiCadastro(){
    const loading = await this.loadingController.create({
      message: 'Salvando dados...'
    })

      //PASSA OS DADOS PARA CADASTRAR O USUARIO E SEU ENDEREÇO ENQUANTO ISSO EXIBE UM LOADING
      this.uidUser = this.userService.addTodo(this.todoUser, this.todoEnd, this.foto).then(() => {
        loading.dismiss();
      });

      //APÓS DADOS CADASTRADOS, ENVIA O USUARIO PARA O INICIO DA APLICAÇÃO
      this.nav.navigateBack('/menu/home');
     
  }




  //REFERÊNCIA A CLASS USUARIO
  todoUser: Usuario = {
    nome: '',
    CPF: null,
    dataNasc: '',
    foto: '',
    isAtivo: true,
    email: '',
    senha: '',
    celular: null,
    isAdmin: false
  }

  //REFERÊNCIA A CLASS ENDERECO
  todoEnd: Endereco = {
    lougradouro: '',
    numero: null,
    bairro: '',
    cidade: '',
  }
}
