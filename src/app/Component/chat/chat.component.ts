import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController, NavParams, IonContent } from '@ionic/angular';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/Chat/chat.service';
import { Chat } from 'src/app/services/Chat/chat';
import { UsuarioService } from 'src/app/services/Usuarios/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy{
  public usuarioAtual;
  public nomeUsuarioChat;
  public fotoUsuarioChat;
  public mensagem = '';
  public menssagens: Chat[];
  private usuarioChat;
  private idChat: string;
  private subscription: Subscription;
  @ViewChild(IonContent) content: IonContent;

  constructor(private modalCtrl: ModalController,
              private auth: AngularFireAuth,
              private chatService: ChatService,
              private navParams: NavParams,
              private usuarioService: UsuarioService
              ){}

  ngOnInit() {
    this.idChat = this.navParams.get('idChat');
    this.usuarioChat = this.navParams.get('uidUsuario');
    this.usuarioAtual = this.auth.auth.currentUser.uid;
    
    this.usuarioService.getUsuario(this.usuarioChat).subscribe( res => {
      this.nomeUsuarioChat = res.nome;
      this.fotoUsuarioChat = res.foto;
    })

    this.subscription = this.chatService.getChat(this.idChat).subscribe( res => {
      this.menssagens = res;
    })
  }

  enviarMensagem(){
    const todoChat: Chat = {
      mensagem: this.mensagem,
      createdAt: new Date().getTime(),
      visualizado: false,
      uidUser: this.usuarioAtual
    }
    this.chatService.addChat(this.idChat, todoChat);
    this.mensagem = '';
    setTimeout(() => {
      this.content.scrollToBottom(300);
    });
  }

  fechar(){
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
