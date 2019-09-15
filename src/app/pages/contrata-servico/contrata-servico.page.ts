import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdemServico } from 'src/app/services/OrdemServico/ordem-servico';
import { OrdemServicoService } from 'src/app/services/OrdemServico/ordem-servico.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Core } from 'src/app/core/core.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-contrata-servico',
  templateUrl: './contrata-servico.page.html',
  styleUrls: ['./contrata-servico.page.scss'],
})
export class ContrataServicoPage implements OnInit {
  public contrato: OrdemServico = {
    foto: '',
    descricao: '',
    dataHora: null,
    dataHoraFinal: null,
    uidUsuario: '',
    idProfissao: '',
    situacao: null
  }

  public photo: string = '';
  public idProfissao: string;
  private opcaoCamera: CameraOptions;
  public dataFinal: any;

  constructor(private ordemServico: OrdemServicoService,
              private router: ActivatedRoute,
              private route: Router,
              private auth: AngularFireAuth,
              private camera: Camera,
              private core: Core,
              private datePicker: DatePicker) { }

  ngOnInit() {
    this.idProfissao = this.router.snapshot.params['idProfissao'];
  }

  async concluiContrato(){
    this.contrato.idProfissao = this.idProfissao;
    this.contrato.dataHora = new Date().getTime();
    this.contrato.foto = this.photo;
    this.contrato.dataHoraFinal = this.dataFinal;
    this.contrato.uidUsuario = this.auth.auth.currentUser.uid;
    this.contrato.situacao = 1;

    this.ordemServico.addTodo(this.contrato).then(() => {
      this.core.presentAlert('Pronto!', 'Seu pedido foi encaminhado, por favor aguarde!')
      this.route.navigateByUrl('/menu/home');
    });
  }

  async abrirGaleria(tipo: string){
    if(tipo == 'camera'){
      this.opcaoCamera = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true
      };
    }else{
      this.opcaoCamera = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true
      };
    }

    try {
      this.camera.getPicture(this.opcaoCamera).then((imageData) => {
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

  datePiker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: 16974373
    }).then(
      date => this.dataFinal = date.getTime(),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
