import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { OrdemServico } from './ordem-servico';
import { ChatService } from '../Chat/chat.service';
import { StorageService } from '../Storage/storage.service';
import { Core } from 'src/app/core/core.module';


@Injectable({
  providedIn: 'root'
})


export class OrdemServicoService {
  private todosCollection: AngularFirestoreCollection<OrdemServico>;
 
  private todas: Observable<OrdemServico[]>;
 
  constructor(private db: AngularFirestore,
              private chat: ChatService,
              private storageService: StorageService,
              private core: Core) {

    this.todosCollection = db.collection<OrdemServico>('OrdemServico');
    this.todas = this.todosCollection.snapshotChanges().pipe(
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
    return this.todas;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<OrdemServico>(id).valueChanges();
  }
 
  updateTodo(toda: OrdemServico, id: string) {
    return this.todosCollection.doc(id).update(toda);
  }
 
  addTodo(toda: OrdemServico) {
    this.storageService.uploadImagemOrdemServico(toda.id, toda.foto).subscribe( res => {
      toda.foto = res;
    });
    return this.todosCollection.add(toda);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  updateValor(id: string, valor: number){
    return this.todosCollection.doc<OrdemServico>(id).update({valor: valor, situacao: 2})
  }

  updateSituacaoAceita(id: string){
    this.chat.newChat(id);
    return this.todosCollection.doc<OrdemServico>(id).update({situacao: 3})
  }

  updateSituacaoConcluida(id: string){
    return this.todosCollection.doc<OrdemServico>(id).update({situacao: 4, dataHoraTermino: new Date().getTime()})
  }

  updateSituacaoCancelar(id: string){
    return this.todosCollection.doc<OrdemServico>(id).update({situacao: 5})
  }

  //BUSCA AS ORDENS POR SITUAÇÃO SOLICITADA
  getOrdemProfissional(idProfissao: String, situacao: number){
    return this.db.collection<OrdemServico>('OrdemServico', ref => ref.where('idProfissao','==',idProfissao).where('situacao','==',situacao)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
  )}
    
  //BUSCA AS ORDENS POR SITUAÇÃO SOLICITADA
  getOrdemUsuario(uidUsuario: String, situacao: number){
    return this.db.collection<OrdemServico>('OrdemServico', ref => ref.where('uidUsuario','==',uidUsuario).where('situacao','==', situacao)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
  )}

  getSituacao(idProfissao: String, situacao: number){
    return this.db.collection<OrdemServico>('OrdemServico', ref => ref.where('idProfissao','==',idProfissao).where('situacao','==',situacao)).valueChanges();
  }
}