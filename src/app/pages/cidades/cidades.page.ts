import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CidadesService } from 'src/app/services/Cidades/cidades.service';
import { Cidade } from 'src/app/services/Cidades/cidade';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.page.html',
  styleUrls: ['./cidades.page.scss'],
})
export class CidadesPage implements OnInit, OnDestroy {
    todos: Cidade[];
    cidadeSubscription: Subscription;
    
    constructor(private cidadeService: CidadesService) { }
   
    ngOnInit() {
    this.cidadeSubscription = this.cidadeService.getTodos().subscribe(res => {
        this.todos = res;
        console.log(res);
      });
    } 
    
    ngOnDestroy(){
      this.cidadeSubscription.unsubscribe();
    }
  }
  