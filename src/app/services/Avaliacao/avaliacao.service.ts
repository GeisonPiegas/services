import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Avaliacao } from './avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private todosCollection: AngularFirestoreCollection<Avaliacao>;
 
  constructor(private db: AngularFirestore) {
    
  }
  
  getTodos(idAtacao) {
    return this.db.collection<Avaliacao>('AtuacaoProfissional/'+idAtacao+'/Avaliacao').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getTodo(uidProfissional, ordem) {
    return this.db.collection('AtuacaoProfissional/'+uidProfissional+'/Avaliacao').doc<Avaliacao>(ordem).valueChanges();
  }
 
  updateTodo(toda: Avaliacao, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(atuacao, uidUsuario, toda: Avaliacao) {
    return this.db.collection('AtuacaoProfissional/'+atuacao+'/Avaliacao').doc(uidUsuario).set(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
