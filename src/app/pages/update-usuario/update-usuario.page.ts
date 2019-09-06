import { Core } from 'src/app/core/core.module';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../services/Usuarios/usuario.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/services/Usuarios/usuario';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.page.html',
  styleUrls: ['./update-usuario.page.scss'],
})
export class UpdateUsuarioPage implements OnInit {

  private uidUsuario: string;
  public photo: string = '';

  @ViewChild('form') form: NgForm;

  constructor(private authService: AuthService,
              private usuarioService: UsuarioService,
              private loadingController: LoadingController,
              private navCtrl: NavController,
              private camera: Camera,
              private core: Core){

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

  editaEndereco(){
    this.navCtrl.navigateBack('menu/details-endereco');
  }

  async abrirGaleria(){
    const opcao: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true
    };

    try {
      this.camera.getPicture(opcao).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64Image;
       }, (err) => {
        // Handle error
       });

    } catch (error) {
      this.core.presentAlert('Ops, algo acontece!',error);
    }
  }


  //SALVA OS DADOS ALTERADOS NO DATABASE
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Savando os dados...'
    });
    await loading.present();
      // TESTA PARA VER SE A PESSOA CARREGOU NOVA FOTO
      if (this.photo != '') {
        this.todoUser.foto = this.photo;
      }
      console.log(this.photo);

      this.usuarioService.updateUsuarioTodo(this.todoUser, this.authService.getAuth().currentUser.uid).then(() => {

        loading.dismiss();
        this.navCtrl.navigateBack('/menu/home');
      });
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
