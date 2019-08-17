import { AngularFireAuth } from 'angularfire2/auth';
import { FavoritosService } from 'src/app/services/Favoritos/favoritos.service';
import { ActivatedRoute } from '@angular/router';
import { AtuacaoProfissional } from 'src/app/services/AtuacaoProfissional/atuacaoProfissional';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnderecoService } from 'src/app/services/Endereco/endereco.service';
import { Usuario } from 'src/app/services/Usuarios/usuario';
import { Endereco } from 'src/app/services/Endereco/endereco';
import { Subscription } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-profissional',
  templateUrl: './perfil-profissional.page.html',
  styleUrls: ['./perfil-profissional.page.scss'],
})
export class PerfilProfissionalPage implements OnInit, OnDestroy{

  public idProfissao: String;
  private idUsuario: String;
  private idFavorito: String;
  private nome: String;
  private foto: string;
  public isFavorito: Boolean = false;
  private user: String;
  private listsubscription: Subscription;



  constructor(private atuacaoProfissioalService: AtuacaoProfissionalService,
              private usuarioService: UsuarioService,
              private enderecoService: EnderecoService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private favoritos: FavoritosService,
              private auth: AngularFireAuth,
              private toastController: ToastController) { }


  ngOnInit() {
    this.idProfissao = this.route.snapshot.params['id'];
    this.idUsuario = this.auth.auth.currentUser.uid;
    this.loadDados(this.idProfissao);
  }
  
  async loadDados(prof: String) {
    const loading = await this.loadingController.create({
      message: 'Carregando Dados...'
    });
    await loading.present();
    
    // PEGA A CATEGORIA DO SERVIÇO A SER BUSCADO.
    this.listsubscription = this.atuacaoProfissioalService.getTodo(prof).subscribe( res => {
      loading.dismiss();
      this.todaAtuacao = res;
      this.user = res.uidUsuario;
      this.verificaFavorito(res.uidUsuario);
        //Busca os dados referentes ao profissional a ser listado.
        this.usuarioService.getUsuario(this.user).subscribe( res => {
          this.todoUsuario = res;
          this.nome = res.nome;
          this.foto = res.foto;
        });
        //Busca o endereco referente ao profissional a ser listado
        this.enderecoService.getTodo(this.user).subscribe( res => {
          this.todoEndereco = res;
        })
    });
  }

  //Função que verifica se o profissional visitado já é
  //favorito da pessoa, para escolher a situação se é "true" ou "false".
  //Se for true o coração que representa os favoritos ira ser vermelho,
  //se for false ele ira ficar sem cor. 
  async verificaFavorito(uid){
      this.listsubscription = this.favoritos.procuraTodo(this.idUsuario,uid).subscribe( res => {
        res.forEach( res => {
            this.idFavorito = res.id;
            console.log(this.idFavorito);
            if(!this.idFavorito){
              this.isFavorito = false;
            }else{
              this.isFavorito = true;
            }
        })
      })
  }

  //Apresenta mensagem
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  //Função que testa se o profissional é favorito,
  //se ele for ja favoritado da pessoa ao clickar ela ira tirar
  //o profissial dos favoritos dela, se ele não for, a função
  //ira adicionar aos favoritos.
addfavorito(){
    if(this.isFavorito){
      this.favoritos.removeTodo(this.idFavorito);
      this.isFavorito = false;
      this.presentToast("Desfavoritado com Sucesso");
    }else{
      const todoFavorito = {
        uidUsuario: this.idUsuario,
        uidProfissional: this.user,
        date: new Date(),
        nome: this.nome,
        foto: this.foto
      }
      this.favoritos.addTodo(todoFavorito)
      this.presentToast("Favoritado com Sucesso")
    } 
  }

 
  

  todoEndereco: Endereco = {
    lougradouro: '',
    numero: null,
    bairro: '',
    cidade: ''
  };

  todoUsuario: Usuario = {
    uid: '',
    nome: '',
    CPF: null,
    dataNasc: '',
    foto: '',
    isAdmin: null,
    email: '',
    senha: '',
    celular: null,
    isAtivo: null
  }

  todaAtuacao: AtuacaoProfissional = {
    profissao: '',
    descricao: '',
    uidUsuario: '',
    idCategoria: '',
    isVerificado: null,
    isAtivo: null
  }
  

 ngOnDestroy(){
  this.listsubscription.unsubscribe();
}
}
