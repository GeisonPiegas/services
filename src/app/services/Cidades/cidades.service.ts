import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Cidade } from './cidade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CidadesService {
  private todosCollection: AngularFirestoreCollection<Cidade>;

  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Cidade>('Cidades');
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
    return this.todosCollection.doc<Cidade>(id).valueChanges();
  }
 
  updateTodo(dataCidade: Cidade, id: string) {
    return this.todosCollection.doc(id).update(dataCidade);
  }
 
  addTodo(dataCidade: Cidade) {
    return this.todosCollection.add(dataCidade);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}