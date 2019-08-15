import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Favoritos } from 'src/app/services/Favoritos/favoritos';
import { Subscription } from 'rxjs';
import { FavoritosService } from 'src/app/services/Favoritos/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit, OnDestroy {
  idUsuario: string;
  favoritos = new Array<Favoritos>();
  favoritoSubescription: Subscription;
  subsList: Subscription;

  constructor(private favoritoService: FavoritosService,
              private auth: AngularFireAuth) { 

  }

  ngOnInit() {
    this.idUsuario = this.auth.auth.currentUser.uid;
    this.favoritoSubescription = this.favoritoService.procuraTodos(this.idUsuario).subscribe( res => {
      this.favoritos = res;
    });
  }

  desfavoritar(id: string){
    this.favoritoService.removeTodo(id);
  }

  ngOnDestroy() { 
    this.favoritoSubescription.unsubscribe();
  }
}
