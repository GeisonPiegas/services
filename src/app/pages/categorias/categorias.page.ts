import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Categorias } from 'src/app/services/Categorias/categorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit, OnDestroy{
  todas: Categorias[];
  filtroCategoria: Categorias[];
  categoriaSubscription: Subscription;

  constructor(private categoriaService: CategoriaService,
              private toastController: ToastController,
              private loadingController: LoadingController) { }
 
  ngOnInit() {
    this.loadTodo();
  }

  ngOnDestroy(){
    this.categoriaSubscription.unsubscribe();
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Carregando Categorias...'
    });
    await loading.present();
    
     this.categoriaSubscription = this.categoriaService.getTodos().subscribe(res => {
      loading.dismiss();
      this.todas = res;
      this.filtroCategoria = res;
    });
  }
 
  remove(id) {
    console.log(id);
    this.categoriaService.removeTodo(id).then(() => {
      this.presentToast("Removida com Sucesso");
    }).catch(err => {
      this.presentToast("Ops! Acoteceu algo" +err);
    })
  }

  initializeItens(): void{
    this.todas = this.filtroCategoria;
  }

  filterList(evt){
    this.initializeItens();

    const searchTerm = evt.srcElement.value;

    if(!searchTerm){
      return
    }

    this.todas = this.todas.filter( categoria => {
      if(categoria.nome && searchTerm){
        if(categoria.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
