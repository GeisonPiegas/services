import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
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

  getTodo(uidProfissional, uidUsuario) {
    return this.db.collection('AtuacaoProfissional/'+uidProfissional+'/Avaliacao').doc<Avaliacao>(uidUsuario).valueChanges();
  }
 
  updateTodo(toda: Avaliacao, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(id, toda: Avaliacao) {
    return this.db.collection('AtuacaoProfissional/'+id+'/Avaliacao').add(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
