import { map } from 'rxjs/operators';
import { Profissoes } from './profissoes';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ProfissoesService {
  private todosCollection: AngularFirestoreCollection<Profissoes>;
  private obsCidade: Observable<Profissoes[]>;

  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Profissoes>('Profissoes');
    this.obsCidade = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  
  getTodos() {
    return this.obsCidade;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Profissoes>(id).valueChanges();
  }
 
  updateTodo(dataCidade: Profissoes, id: string) {
    return this.todosCollection.doc(id).update(dataCidade);
  }
 
  addTodo(dataCidade: Profissoes) {
    return this.todosCollection.add(dataCidade);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}