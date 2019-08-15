import { Injectable } from '@angular/core';
import { Categorias } from './categorias';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class CategoriaService {
  private todosCollection: AngularFirestoreCollection<Categorias>;
 
  constructor(db: AngularFirestore) {
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
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(toda: Categorias) {
    return this.todosCollection.add(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}