import { Injectable } from '@angular/core';
import { Categorias } from './categorias';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { StorageService } from '../Storage/storage.service';
import { Core } from 'src/app/core/core.module';


@Injectable({
  providedIn: 'root'
})


export class CategoriaService {
  private todosCollection: AngularFirestoreCollection<Categorias>;
 
  constructor(private db: AngularFirestore,
              private storageService: StorageService,
              private core: Core) {
    this.todosCollection = db.collection<Categorias>('Categorias');
  }
  
  getTodos() {
    return this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Categorias>(id).valueChanges();
  }
 
  updateTodo(toda: Categorias, id: string) {
    this.storageService.uploadImagemCategoria(toda.nome, toda.foto).subscribe( res => {
      toda.foto = res;
    });
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(toda: Categorias) {
    this.storageService.uploadImagemCategoria(toda.nome, toda.foto).subscribe( res => {
      toda.foto = res;
    });
    return this.todosCollection.add(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}