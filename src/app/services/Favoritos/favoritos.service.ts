import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Favoritos } from './favoritos';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private todosCollection: AngularFirestoreCollection<Favoritos>;

  constructor(private db: AngularFirestore,
) {
    this.todosCollection = db.collection('Favoritos');
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
    return this.todosCollection.doc<Favoritos>(id).valueChanges();
  }
 
  updateTodo(toda: Favoritos, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(toda: Favoritos) {
    return this.todosCollection.add(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  procuraTodo(uidUsuario: String, uidProfissinal: String){
    return this.db.collection<Favoritos>('Favoritos', ref => ref.where('uidUsuario','==',uidUsuario).where('uidProfissional', '==',uidProfissinal)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  procuraTodos(uidUsuario: String){
    return this.db.collection<Favoritos>('Favoritos', ref => ref.where('uidUsuario','==',uidUsuario)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }
}