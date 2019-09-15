import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Core } from 'src/app/core/core.module';

@Component({
  selector: 'app-details-categoria',
  templateUrl: './details-categoria.page.html',
  styleUrls: ['./details-categoria.page.scss'],
})
export class DetailsCategoriaPage implements OnInit {
  
  @ViewChild('form') form: NgForm;
  public todas: Categorias = {
    nome: '',
    descricao: '',
    foto: ''
  };
  public photo: string = '';
  private idCategoria: string;
  

  constructor(private route: ActivatedRoute, 
              private loadingController: LoadingController, 
              private categoriaService: CategoriaService,
              private navCtrl: NavController,
              private camera: Camera,
              private core: Core){ }

  ngOnInit() {
    this.idCategoria = this.route.snapshot.params['id'];
    if (this.idCategoria)  {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando Categoria...'
    });
    await loading.present();
 
    this.categoriaService.getTodo(this.idCategoria).subscribe(res => {
      loading.dismiss();
      this.todas = res;
    });
  }
 
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Salvando Categoria...'
    });
    await loading.present();
 
    if (this.idCategoria) {
      if (this.photo != '') {
        this.todas.foto = this.photo;
      }
      console.log(this.photo);
      this.categoriaService.updateTodo(this.todas, this.idCategoria).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('/menu/categorias');
      });
    } else {
      if (this.photo != '') {
        this.todas.foto = this.photo;
      }
      this.categoriaService.addTodo(this.todas).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('/menu/categorias');
      });
    }
  }

  async abrirGaleria(){
    const opcao: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
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
      this.core.presentAlert('Ops, algo aconteceu!',error);
    }
  }

}
