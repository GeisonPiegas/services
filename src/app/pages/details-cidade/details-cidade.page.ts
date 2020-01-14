import { NgForm } from '@angular/forms';
import { CidadesService } from './../../services/Cidades/cidades.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cidade } from 'src/app/services/Cidades/cidade';

@Component({
  selector: 'app-details-cidade',
  templateUrl: './details-cidade.page.html',
  styleUrls: ['./details-cidade.page.scss'],
})
export class DetailsCidadePage implements OnInit {
    uid: String;
    @ViewChild('form') form: NgForm;
    todos: Cidade = {
      nome: '',
      cep: null,
      estado: ''
    };
   
    todoNome = null;
  
    estados = [
      {
        nome: "RS"
      },
      {
        nome: "RJ"
      },
      {
        nome: "BA"
      }
    ]
    constructor(private route: ActivatedRoute, 
      private loadingController: LoadingController, 
      private CidadeService: CidadesService,
      private nav: NavController,
      afAuth: AngularFireAuth){
  
        const authObserve = afAuth.user.subscribe(user => {
          this.uid = user.uid;
          console.log(this.uid);
          authObserve.unsubscribe();
        })
  
      }
  
    ngOnInit() {
      this.todoNome = this.route.snapshot.params['id'];
      if (this.todoNome)  {
        this.loadTodo();
      }
    }
  
    async loadTodo() {
      const loading = await this.loadingController.create({
        message: 'Carregando Cidades...'
      });
      await loading.present();
   
      this.CidadeService.getTodo(this.todoNome).subscribe(res => {
        loading.dismiss();
        this.todos = res;
      });
    }
   
    async saveTodo() {
      const loading = await this.loadingController.create({
        message: 'Salvando...'
      });
      await loading.present();
   
      if (this.todoNome) {
        this.CidadeService.updateTodo(this.todos, this.todoNome).then(() => {
          loading.dismiss();
          this.nav.navigateBack('menu/cidades');
        });
      } else {
        this.CidadeService.addTodo(this.todos).then(() => {
          loading.dismiss();
          this.nav.navigateBack('menu/cidades');
        });
      }
    }
  
  }
  