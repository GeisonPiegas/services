import { AtuacaoProfissional } from './atuacaoProfissional';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtuacaoProfissionalService {
  private todosCollection: AngularFirestoreCollection<AtuacaoProfissional>;
 
  constructor(private db: AngularFirestore) {
    this.todosCollection = db.collection<AtuacaoProfissional>('AtuacaoProfissional');
    
  }
  
  getTodos() {
    return this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getTodo(id) {
    return this.todosCollection.doc<AtuacaoProfissional>(id).valueChanges();
  }
 
  updateTodo(toda: AtuacaoProfissional, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(toda: AtuacaoProfissional) {
    return this.todosCollection.add(toda);
  }

  updateVerificacao(id: string, valor: boolean){
    return this.todosCollection.doc<AtuacaoProfissional>(id).update({isVerificado: valor})
  }

  updateObs(id: string, msg: string){
    return this.todosCollection.doc<AtuacaoProfissional>(id).update({obs: msg})
  }

  updateAtivo(id: string, valor: boolean){
    return this.todosCollection.doc<AtuacaoProfissional>(id).update({isAtivo: valor})
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  getPorCategoria(categoria: String){
    return this.db.collection<AtuacaoProfissional>('AtuacaoProfissional', ref => ref.where('idCategoria','==',categoria).where('isVerificado','==', true).where('isAtivo','==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getDeletCategoria(categoria: String){
    return this.db.collection<AtuacaoProfissional>('AtuacaoProfissional', ref => ref.where('idCategoria','==',categoria)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getServicosProfissional(idProfissional: String){
    return this.db.collection<AtuacaoProfissional>('AtuacaoProfissional', ref => ref.where('uidUsuario','==',idProfissional).where('isAtivo','==', true)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getServicosNaoAtivos(){
    return this.db.collection<AtuacaoProfissional>('AtuacaoProfissional', ref => ref.where('isVerificado','==',false)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  getServicosDesativados(idProfissional: string){
    return this.db.collection<AtuacaoProfissional>('AtuacaoProfissional', ref => ref.where('uidUsuario','==',idProfissional).where('isAtivo','==', false)).snapshotChanges().pipe(
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
