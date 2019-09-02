import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cidade } from './../../services/Cidades/cidade';
import { LoadingController, NavController } from '@ionic/angular';
import { Usuario } from './../../services/Usuarios/usuario';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { Endereco } from 'src/app/services/Endereco/endereco';
import { CidadesService } from 'src/app/services/Cidades/cidades.service';
import { Core } from 'src/app/core/core.module';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy{
  
  public cidades = Array<Cidade>();
  private subscriptionCidades: Subscription;
  @ViewChild('form') form: NgForm;

  constructor(private usuarioService: UsuarioService, 
              private loadingController: LoadingController,
              private cidadeService: CidadesService,
              private navCtrl: NavController,
              private core: Core) {
  }

  ngOnInit(){
     //CHAMA A FUNÇÃO QUE BUSCA AS CIDADES DO BANCO
     this.coletaCidade();
  }

  //FUNÇÃO QUE CARREGA TODAS AS CIDADES PREVIAMENTE CADASTRADAS NA APLICAÇÃO
  coletaCidade(){
    this.subscriptionCidades = this.cidadeService.getTodos().subscribe(res => {
      this.cidades = res;
    });
  }

  ngOnDestroy(){
    this.subscriptionCidades.unsubscribe();
  }


  //FUNÇÃO PARA CADASTRAR NOVO USUARIO
  async concluiCadastro(){

      const loading = await this.loadingController.create({
        message: 'Salvando dados...'
      })

        //PASSA OS DADOS PARA CADASTRAR O USUARIO E SEU ENDEREÇO ENQUANTO ISSO EXIBE UM LOADING
        this.usuarioService.addUsuarioTodo(this.todoUser, this.todoEnd).then(() => {
          
          //APÓS DADOS CADASTRADOS, ENVIA O USUARIO PARA O INICIO DA APLICAÇÃO
          this.navCtrl.navigateRoot('/menu/home');
          

        }).catch((error: any) => {
          
          this.navCtrl.pop();
          this.core.presentAlert('Atenção','Comportamento Inesperado!');

        })
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
