import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../services/Usuarios/usuario.service';
import { LoadingController, NavController, Platform, AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/services/Usuarios/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.page.html',
  styleUrls: ['./update-usuario.page.scss'],
})
export class UpdateUsuarioPage implements OnInit {

  public uploadPorcent: Observable<number>;
  public dowloadUrl: Observable<string>;
  private uidUsuario: string;
  private blob: Blob;
  @ViewChild('form') form: NgForm;

  constructor(private authService: AuthService,
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private storageService: StorageService
    ) { 
    this.uidUsuario = this.authService.getAuth().currentUser.uid
    //CHAMA A FUNÇÃO PARA BUSCAR OS DADOS
    this.loadTodo(this.uidUsuario);
  }

  //FUNÇÃO QUE CARREGA TODO OS DADOS DO USUARIO PARA ELE FAZER UPDATE
  async loadTodo(uidUser: string) {
    const loading = await this.loadingController.create({
      message: 'Carregando os dados...'
    });
    await loading.present();
 
    this.usuarioService.getUsuario(uidUser).subscribe(res => {
      loading.dismiss();
      this.todoUser = res;
    });
  }

  async abrirGaleria(){
    const opcao: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      const fileUrl: string = await this.camera.getPicture(opcao);

      let file: string;

      if (this.platform.is('ios')) {
        //IOS RETORNA IMG_23456789.jpg
        file = fileUrl.split('/').pop();
      } else {
        //ANDROID RETORNA IMG_23456.jpg?23456789 SENDO ASSIM O TRATAMENTO É DIFERENTE
        file = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.indexOf('?'));
      }

      const path: string = fileUrl.substring(0, fileUrl.lastIndexOf('/'));

      //LE A IMAGEM COMO UM ARQUIVO BINÁRIO
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      this.blob = new Blob([buffer], { type: 'image/jpg' });
      this.storageService.uploadImagemUsuario(this.uidUsuario,this.blob).subscribe( res => {
        this.todoUser.foto = res;
      });
    } catch (error) {
      this.presentAlert(error);
    }
  }


  //SALVA OS DADOS ALTERADOS NO DATABASE
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Savando os dados...'
    });
    await loading.present();
      this.usuarioService.updateUsuarioTodo(this.todoUser, this.authService.getAuth().currentUser.uid).then(() => {

        loading.dismiss();
        this.navCtrl.navigateBack('/menu/home');
      });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  //REFERÊNCIA A CLASS USUARIO, SEM ELA OS VALORES FICAM INDEFINIDOS
  todoUser: Usuario = {
    nome: '',
    CPF: null,
    dataNasc: '',
    foto: '',
    isAtivo: null,
    email: '',
    senha: '',
    celular: null,
    isAdmin: null
  }
}
