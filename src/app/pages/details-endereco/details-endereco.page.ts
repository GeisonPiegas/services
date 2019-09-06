import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { EnderecoService } from 'src/app/services/Endereco/endereco.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Endereco } from 'src/app/services/Endereco/endereco';
import { Cidade } from 'src/app/services/Cidades/cidade';
import { CidadesService } from 'src/app/services/Cidades/cidades.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-endereco',
  templateUrl: './details-endereco.page.html',
  styleUrls: ['./details-endereco.page.scss'],
})
export class DetailsEnderecoPage implements OnInit, OnDestroy{

  private uidUsuario: string;
  public todoEndereco: Endereco = {
    lougradouro: '',
    bairro: '',
    numero: null,
    cidade: ''
  };
  public todasCidades: Cidade[];
  private subscription: Subscription;

  constructor(private loadingController: LoadingController, 
              private enderecoService: EnderecoService,
              private navCtrl: NavController,
              private auth: AngularFireAuth,
              private cidadesServices: CidadesService){
    }

  ngOnInit() {
    this.uidUsuario = this.auth.auth.currentUser.uid;
    this.carregaCidades();
    this.loadTodo();
  }

  async carregaCidades(){
    this.subscription = this.cidadesServices.getTodos().subscribe( res => {
      this.todasCidades = res;
    });
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando seu Endereço...'
    });
    await loading.present();
 
    this.enderecoService.getTodo(this.uidUsuario).subscribe(res => {
      loading.dismiss();
      this.todoEndereco = res;
    });
  }
 
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Salvando...'
    });
    await loading.present();

    this.enderecoService.updateTodo(this.todoEndereco, this.uidUsuario).then(() => {
      loading.dismiss();
      this.navCtrl.navigateBack('menu/home');
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
