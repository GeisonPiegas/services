import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Core } from 'src/app/core/core.module';
import { File } from '@ionic-native/file/ngx';

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
              private platform: Platform,
              private file: File,
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
        // Mudar aqui!
      }
      this.categoriaService.addTodo(this.todas).then(() => {
        loading.dismiss();
        this.navCtrl.navigateBack('/menu/categorias');
      });
    }
  }

  async abrirGaleria(){
      const opcaoCamera = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300,
        correctOrientation: true
      };

    try {
      this.camera.getPicture(opcaoCamera).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64Image;
       }, (err) => {
       
       });

    } catch (error) {
      this.core.presentAlert('Ops, algo acontece!',error);
    }
  }


}              
