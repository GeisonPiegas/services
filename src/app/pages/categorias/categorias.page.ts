import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriaService } from 'src/app/services/Categorias/categorias.service';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { Categorias } from 'src/app/services/Categorias/categorias';
import { Router } from '@angular/router';
import { Core } from 'src/app/core/core.module';
import { AtuacaoProfissionalService } from 'src/app/services/AtuacaoProfissional/atuacao-profissional.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit, OnDestroy{
  todas: Categorias[];
  filtroCategoria: Categorias[];
  categoriaSubscription: Subscription;
  private cont: number;

  constructor(private categoriaService: CategoriaService,
              private loadingController: LoadingController,
              private actionSheetController: ActionSheetController,
              private router: Router,
              private core: Core,
              private atuacaoProfissional: AtuacaoProfissionalService){ }
 
  ngOnInit() {
    this.loadTodo();
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

  async presentActionSheet(nome: string, id: string) {
    const actionSheet = await this.actionSheetController.create({
      header: nome,
      cssClass: '',
      mode: 'ios',
      buttons: [{
        text: 'Apagar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.cont = 0;
          this.atuacaoProfissional.getDeletCategoria(nome).subscribe( res => {
            res.forEach( x => {
              this.cont += 1;
            }) 
          })
          setTimeout(() => {
            if(this.cont > 0){
              this.core.presentAlert("Ops","Não é possivel apagar pois há serviços cadastrados nesta categoria.");
            }else{
              this.remove(id);
            }
          }, 1500); 
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.router.navigateByUrl('menu/details-categoria/'+id); 
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  
 
  remove(id) {
    console.log(id);
    this.categoriaService.removeTodo(id).then(() => {
      this.core.presentToast("Removida com Sucesso");
    }).catch(err => {
      this.core.presentToast("Ops! Acoteceu algo" +err);
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
  
  ngOnDestroy(){
    this.categoriaSubscription.unsubscribe();
  }
}
