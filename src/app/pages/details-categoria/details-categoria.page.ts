import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-details-categoria',
  templateUrl: './details-categoria.page.html',
  styleUrls: ['./details-categoria.page.scss'],
})
export class DetailsCategoriaPage implements OnInit {

  private blob: Blob;
  todas: Categorias = {
    nome: '',
    descricao: '',
    foto: ''
  };
 
  todoNome = null;
  @ViewChild('form') form: NgForm;

  constructor(private route: ActivatedRoute, 
    private loadingController: LoadingController, 
    private CService: CategoriaService,
    private nav: NavController,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    private storageService: StorageService){

    }

  ngOnInit() {
    this.todoNome = this.route.snapshot.params['nome'];
    if (this.todoNome)  {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando Categoria...'
    });
    await loading.present();
 
    this.CService.getTodo(this.todoNome).subscribe(res => {
      loading.dismiss();
      this.todas = res;
    });
  }
 
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Salvando Categoria...'
    });
    await loading.present();
 
    if (this.todoNome) {
      this.CService.updateTodo(this.todas, this.todoNome).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/menu/categorias');
      });
    } else {
      this.CService.addTodo(this.todas).then(() => {
        loading.dismiss();
        this.nav.navigateBack('/menu/categorias');
      });
    }
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
      this.storageService.uploadImagemCategoria(this.todas.nome,this.blob).subscribe( res => {
        this.todas.foto = res;
      });
    } catch (error) {
    }
  }

}
