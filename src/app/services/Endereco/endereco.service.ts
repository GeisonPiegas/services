import { Endereco } from './endereco';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class EnderecoService {
  private todosCollection: AngularFirestoreCollection<Endereco>;
  private umaCollection: AngularFirestoreCollection<Endereco>;
 
  private todos: Observable<Endereco[]>;
 
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<Endereco>('Endereco');
    this.todos = this.todosCollection.snapshotChanges().pipe(
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
    return this.todos;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Endereco>(id).valueChanges();
  }

  getEndre(referencia){
    this.umaCollection = this.db.collection('Endereco', ref => {return ref.where('uid', '==', referencia)})
    return this.umaCollection.valueChanges();
  }

 
  updateTodo(toda: Endereco, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(documento: string, dados: any) {
    return this.todosCollection.doc(documento).set(dados);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

}